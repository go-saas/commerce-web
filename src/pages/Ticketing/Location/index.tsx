import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumnType } from '@ant-design/pro-components';
import {
  PageContainer,
  ProDescriptions,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import { requestTransform } from '@gosaas/core';
import type {
  V1CreateLocationRequest,
  V1UpdateLocationRequest,
  V1UpdateLocation,
  Locationv1Location,
  V1LocationFilter,
} from '@gosaas/commerce-api';
import { LocationServiceApi } from '@gosaas/commerce-api';
import { qiankunJump } from '@/utils/qiankunJump';

const service = new LocationServiceApi();

const TableList: React.FC = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Locationv1Location | undefined | null>(undefined);

  const intl = useIntl();
  const handleAdd = async (fields: V1CreateLocationRequest) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.creating', defaultMessage: 'Creating...' }),
    );
    try {
      await service.locationServiceCreateLocation({ body: fields });
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

  const handleUpdate = async (fields: V1UpdateLocationRequest) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.updating', defaultMessage: 'Updating...' }),
    );
    try {
      await service.locationServiceUpdateLocation2({
        body: fields,
        locationId: fields.location!.id!,
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

  const handleRemove = async (selectedRow: Locationv1Location) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.deleting', defaultMessage: 'Deleting...' }),
    );
    try {
      await service.locationServiceDeleteLocation({ id: selectedRow.id! });
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

  const columns: ProColumnType<Locationv1Location>[] = [
    {
      title: <FormattedMessage id="ticketing.location.logo" defaultMessage="Logo" />,
      dataIndex: ['logo', 'url'],
      valueType: 'image',
    },
    {
      title: <FormattedMessage id="ticketing.location.name" defaultMessage="Location Name" />,
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
      title: <FormattedMessage id="common.address.city" defaultMessage="City" />,
      render: (dom, entity) => {
        return `${entity.address?.city}(${entity.address?.country || entity.address?.region})`;
      },
    },
    {
      title: (
        <FormattedMessage id="ticketing.location.shortDesc" defaultMessage="Short Description" />
      ),
      dataIndex: 'shortDesc',
      valueType: 'text',
    },
    {
      title: (
        <FormattedMessage
          id="ticketing.location.publicPhone"
          defaultMessage="Public Contact Phone"
        />
      ),
      dataIndex: 'publicContact.phone',
      valueType: 'text',
    },
    {
      title: (
        <FormattedMessage
          id="ticketing.location.publicEmail"
          defaultMessage="Public Contact Email"
        />
      ),
      dataIndex: 'publicContact.email',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="ticketing.location.rating" defaultMessage="Rating" />,
      dataIndex: 'rating',
      valueType: 'rate',
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
        <a
          key="detail"
          onClick={() => {
            qiankunJump(`/location/${record.id}`);
          }}
        >
          <FormattedMessage id="common.detail" defaultMessage="Detail" />
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

  const getData = requestTransform<Locationv1Location, V1LocationFilter>(async (req) => {
    const resp = await service.locationServiceListLocation2({ body: req });
    return resp.data;
  });

  return (
    <PageContainer>
      <ProTable<Locationv1Location>
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
          <ProDescriptions<Locationv1Location>
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
      <UpdateForm
        onSubmit={async (value) => {
          const { id } = value;
          let success = false;
          if (id) {
            success = await handleUpdate({ location: value as V1UpdateLocation });
          } else {
            success = await handleAdd(value as V1CreateLocationRequest);
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
