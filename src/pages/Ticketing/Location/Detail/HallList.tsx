import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumnType } from '@ant-design/pro-components';
import {
  PageContainer,
  ProDescriptions,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateHallForm from './UpdateHallForm';

import type {
  LocationServiceCreateLocationHallRequest,
  V1UpdateLocationHall,
  V1LocationHall,
} from '@gosaas/commerce-api';
import { LocationServiceApi } from '@gosaas/commerce-api';

const service = new LocationServiceApi();

interface TableListProps {
  id: string;
}

const TableList: React.FC<TableListProps> = (props: TableListProps) => {
  const id = props.id;
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<V1LocationHall | undefined | null>(undefined);

  const intl = useIntl();
  const handleAdd = async (fields: V1UpdateLocationHall) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.creating', defaultMessage: 'Creating...' }),
    );
    try {
      await service.locationServiceCreateLocationHall({
        body: {
          hall: fields,
        },
        id: id,
      });
      hide();
      message.success(
        intl.formatMessage({ id: 'common.created', defaultMessage: 'Created Successfully' }),
      );
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

  const handleUpdate = async (fields: V1UpdateLocationHall) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.updating', defaultMessage: 'Updating...' }),
    );
    try {
      await service.locationServiceUpdateLocationHall2({
        id: id,
        hallId: currentRow!.id!,
        body: {
          hall: fields,
        },
      });
      hide();
      message.success(
        intl.formatMessage({ id: 'common.updated', defaultMessage: 'Update Successfully' }),
      );
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

  const handleRemove = async (selectedRow: V1LocationHall) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.deleting', defaultMessage: 'Deleting...' }),
    );
    try {
      await service.locationServiceDeleteLocationHall({ id: id, hallId: selectedRow.id! });
      message.success(
        intl.formatMessage({ id: 'common.deleted', defaultMessage: 'Delete Successfully' }),
      );
      hide();
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };

  const columns: ProColumnType<V1LocationHall>[] = [
    {
      title: <FormattedMessage id="ticketing.hall.name" defaultMessage="Hall Name" />,
      dataIndex: 'name',
      valueType: 'text',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="ticketing.hall.capacity" defaultMessage="Capacity" />,
      dataIndex: 'capacity',
      valueType: 'digit',
    },
    {
      title: <FormattedMessage id="ticketing.hall.seatGroups" defaultMessage="Seat Groups" />,
      render: (dom, entity) => {
        return (
          <div>
            {(entity.seatGroups ?? []).map((p) => (
              <Tag key={p.id} color="blue">
                {p.name}
              </Tag>
            ))}
          </div>
        );
      },
    },

    {
      title: <FormattedMessage id="common.operate" defaultMessage="Operate" />,
      key: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="editable"
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(false);
            handleUpdateModalVisible(true);
          }}
        >
          <FormattedMessage id="common.edit" defaultMessage="Edit" />
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={async (key) => {
            if (key === 'delete') {
              const ok = await handleRemove(record);
              if (ok && actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          menus={[
            {
              key: 'delete',
              name: <FormattedMessage id="common.delete" defaultMessage="Delete" />,
            },
          ]}
        />,
      ],
    },
  ];

  const getData = async () => {
    const resp = await service.locationServiceGetLocationHalls2({ id: props.id, body: {} });
    return { data: resp.data?.halls };
  };

  return (
    <PageContainer>
      <ProTable<V1LocationHall>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        pagination={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCurrentRow(undefined);
              handleUpdateModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        type="table"
        request={getData}
        columns={columns}
      />
      <Drawer
        width={800}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        destroyOnClose
      >
        {currentRow?.id && (
          <ProDescriptions<V1LocationHall>
            title={currentRow?.name}
            request={async () => {
              const resp = await service.locationServiceGetLocation({ id: currentRow.id! });
              return {
                data: resp.data,
              };
            }}
            params={{
              id: currentRow?.id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
      <UpdateHallForm
        onSubmit={async (value) => {
          let success = false;
          if (currentRow) {
            success = await handleUpdate(value as V1UpdateLocationHall);
          } else {
            success = await handleAdd(value as V1UpdateLocationHall);
          }

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={
          {
            ...(currentRow || {}),
          } as any
        }
      />
    </PageContainer>
  );
};

export default TableList;
