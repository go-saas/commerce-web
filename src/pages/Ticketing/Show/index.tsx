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
  V1CreateShowRequest,
  V1UpdateShowRequest,
  V1UpdateShow,
  V1Show,
  V1ShowFilter,
} from '@gosaas/commerce-api';
import { ShowServiceApi } from '@gosaas/commerce-api';
import copy from 'copy-to-clipboard';

const TableList: React.FC = () => {
  const service = new ShowServiceApi();

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<V1Show | undefined | null>(undefined);

  const intl = useIntl();
  const handleAdd = async (fields: V1CreateShowRequest) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.creating', defaultMessage: 'Creating...' }),
    );
    try {
      await service.showServiceCreateShow({ body: fields });
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

  const handleUpdate = async (fields: V1UpdateShowRequest) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.updating', defaultMessage: 'Updating...' }),
    );
    try {
      await service.showServiceUpdateShow2({
        body: fields,
        showId: fields.show!.id!,
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

  const handleRecommend = async (record: V1Show) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.updating', defaultMessage: 'Updating...' }),
    );
    try {
      await service.showServiceRecommendShow({
        id: record.id!,
        body: { isRecommend: !record.isRecommend },
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

  const handleRemove = async (selectedRow: V1Show) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.deleting', defaultMessage: 'Deleting...' }),
    );
    try {
      await service.showServiceDeleteShow({ id: selectedRow.id! });
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

  const columns: ProColumnType<V1Show>[] = [
    {
      title: <FormattedMessage id="ticketing.activity.name" defaultMessage="Activity Name" />,
      dataIndex: ['activity', 'name'],
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="ticketing.location.name" defaultMessage="Location Name" />,
      dataIndex: ['location', 'name'],
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="ticketing.hall.name" defaultMessage="Hall Name" />,
      dataIndex: ['hall', 'name'],
      valueType: 'text',
    },
    {
      title: (
        <FormattedMessage id="ticketing.activity.seatSelectable" defaultMessage="Seat Selectable" />
      ),
      dataIndex: ['activity', 'seatSelectable'],
      valueType: 'switch',
    },
    {
      title: <FormattedMessage id="ticketing.show.timeRange" defaultMessage="Show Time" />,
      dataIndex: ['timeRange'],
      valueType: 'dateTimeRange',
    },
    {
      title: <FormattedMessage id="ticketing.show.isRecommended" defaultMessage="Recommended" />,
      dataIndex: ['isRecommended'],
      valueType: 'switch',
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
            if (key === 'copyId') {
              copy(record.id ?? '');
              message.success(
                intl.formatMessage({ id: 'common.copied', defaultMessage: 'Copied!' }),
              );
            }
            if (key === 'recommend') {
              const ok = await handleRecommend(record);
              if (ok && actionRef.current) {
                actionRef.current.reload();
              }
            }
            if (key === 'delete') {
              const ok = await handleRemove(record);
              if (ok && actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          menus={[
            {
              key: 'copyId',
              name: <FormattedMessage id="common.copyId" defaultMessage="Copy Id" />,
            },
            {
              key: 'recommend',
              name: record.isRecommend ? (
                <FormattedMessage
                  id="ticketing.show.cancelRecommend"
                  defaultMessage="Cancel Recommend"
                />
              ) : (
                <FormattedMessage id="ticketing.show.setRecommend" defaultMessage="Set Recommend" />
              ),
            },
            {
              key: 'delete',
              name: <FormattedMessage id="common.delete" defaultMessage="Delete" />,
            },
          ]}
        />,
      ],
    },
  ];

  const getData = requestTransform<V1Show, V1ShowFilter>(async (req) => {
    const resp = await service.showServiceListShow2({ body: req });
    const { items, ...data } = resp.data;
    return {
      ...data,
      items: (items ?? []).map((p) => {
        return {
          ...p,
          timeRange: [p.startTime, p.endTime],
        };
      }),
    };
  });

  return (
    <PageContainer>
      <ProTable<V1Show>
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
          <ProDescriptions<V1Show>
            title={currentRow?.activity?.name}
            request={async () => {
              const resp = await service.showServiceGetShow({ id: currentRow.id! });
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
            success = await handleUpdate({ show: value as V1UpdateShow });
          } else {
            success = await handleAdd(value as V1CreateShowRequest);
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
