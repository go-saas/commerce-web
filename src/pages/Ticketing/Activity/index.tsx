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
import UpdateForm from './components/UpdateForm';
import { requestTransform } from '@gosaas/core';
import type {
  V1CreateActivityRequest,
  V1UpdateActivityRequest,
  V1UpdateActivity,
  V1Activity,
  V1ActivityFilter,
} from '@gosaas/commerce-api';
import { ActivityServiceApi } from '@gosaas/commerce-api';

import { formatPbDuration } from '@gosaas/core';

const TableList: React.FC = () => {
  const service = new ActivityServiceApi();

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<V1Activity | undefined | null>(undefined);

  const intl = useIntl();
  const handleAdd = async (fields: V1CreateActivityRequest) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.creating', defaultMessage: 'Creating...' }),
    );
    try {
      await service.activityServiceCreateActivity({ body: fields });
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

  const handleUpdate = async (fields: V1UpdateActivityRequest) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.updating', defaultMessage: 'Updating...' }),
    );
    try {
      await service.activityServiceUpdateActivity2({
        body: fields,
        activityId: fields.activity!.id!,
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

  const handleRemove = async (selectedRow: V1Activity) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.deleting', defaultMessage: 'Deleting...' }),
    );
    try {
      await service.activityServiceDeleteActivity({ id: selectedRow.id! });
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

  const columns: ProColumnType<V1Activity>[] = [
    {
      title: <FormattedMessage id="ticketing.activity.name" defaultMessage="Activity Name" />,
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
      title: (
        <FormattedMessage id="ticketing.activity.shortDesc" defaultMessage="Short Description" />
      ),
      dataIndex: 'shortDesc',
      valueType: 'text',
    },
    {
      title: (
        <FormattedMessage id="ticketing.activity.seatSelectable" defaultMessage="Seat Selectable" />
      ),
      dataIndex: 'seatSelectable',
      valueType: 'switch',
    },
    {
      title: <FormattedMessage id="ticketing.activity.categories" defaultMessage="Categories" />,
      dataIndex: 'categories',
      render: (dom, entity) => {
        return (
          <>
            {(entity.categories ?? []).map((p) => (
              <Tag key={p.key!} color={'green'}>
                {`${p.name}(${p.path})`}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: <FormattedMessage id="ticketing.activity.duration" defaultMessage="Duration" />,
      dataIndex: 'duration',
      render: (dom, entity) => {
        return <>{formatPbDuration(entity.duration || '0s')}</>;
      },
    },
    {
      title: <FormattedMessage id="common.createdAt" defaultMessage="CreatedAt" />,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="common.updatedAt" defaultMessage="UpdatedAt" />,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
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

  const getData = requestTransform<V1Activity, V1ActivityFilter>(async (req) => {
    const resp = await service.activityServiceListActivity2({ body: req });
    return resp.data;
  });

  return (
    <PageContainer>
      <ProTable<V1Activity>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        pagination={{
          defaultPageSize: 10,
        }}
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
          <ProDescriptions<V1Activity>
            title={currentRow?.name}
            request={async () => {
              const resp = await service.activityServiceGetActivity({ id: currentRow.id! });
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
      <UpdateForm
        onSubmit={async (value) => {
          const { id } = value;
          let success = false;
          if (id) {
            success = await handleUpdate({ activity: value as V1UpdateActivity });
          } else {
            success = await handleAdd(value as V1CreateActivityRequest);
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
