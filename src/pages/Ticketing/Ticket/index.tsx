import type { ActionType, ProColumnType } from '@ant-design/pro-components';
import {
  PageContainer,
  ProDescriptions,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';

import { requestTransform } from '@gosaas/core';
import type { V1Ticket, V1TicketFilter } from '@gosaas/commerce-api';
import { TicketServiceApi } from '@gosaas/commerce-api';
import copy from 'copy-to-clipboard';

const TableList: React.FC = () => {
  const service = new TicketServiceApi();

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<V1Ticket | undefined | null>(undefined);

  const intl = useIntl();

  const columns: ProColumnType<V1Ticket>[] = [
    {
      title: <FormattedMessage id="ticketing.ticket.id" defaultMessage="Ticket Id" />,
      dataIndex: 'id',
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
      title: <FormattedMessage id="ticketing.ticket.userId" defaultMessage="User" />,
      dataIndex: 'userId',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="ticketing.ticket.status" defaultMessage="Status" />,
      dataIndex: 'status',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="ticketing.ticket.orderId" defaultMessage="OrderId" />,
      dataIndex: 'orderId',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="ticketing.ticket.activity" defaultMessage="Activity" />,
      dataIndex: ['activity', 'name'],
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="ticketing.ticket.show" defaultMessage="Show" />,
      dataIndex: ['show', 'name'],
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="ticketing.ticket.showSalesType" defaultMessage="SalesType" />,
      dataIndex: ['showSalesType', 'name'],
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="common.createdAt" defaultMessage="CreatedAt" />,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="common.operate" defaultMessage="Operate" />,
      key: 'option',
      valueType: 'option',
      render: (_, record) => [
        <TableDropdown
          key="actionGroup"
          onSelect={async (key) => {
            if (key === 'copyId') {
              copy(record.id ?? '');
              message.success(
                intl.formatMessage({ id: 'common.copied', defaultMessage: 'Copied!' }),
              );
            }
          }}
          menus={[
            {
              key: 'copyId',
              name: <FormattedMessage id="common.copyId" defaultMessage="Copy Id" />,
            },
          ]}
        />,
      ],
    },
  ];

  const getData = requestTransform<V1Ticket, V1TicketFilter>(async (req) => {
    const resp = await service.ticketServiceListTicket2({ body: req });
    return resp.data;
  });

  return (
    <PageContainer>
      <ProTable<V1Ticket>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        pagination={{
          defaultPageSize: 10,
        }}
        toolBarRender={() => []}
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
          <ProDescriptions<V1Ticket>
            title={currentRow?.id}
            request={async () => {
              const resp = await service.ticketServiceGetTicket({ id: currentRow.id! });
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
    </PageContainer>
  );
};

export default TableList;
