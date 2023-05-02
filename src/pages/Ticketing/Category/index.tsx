import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProDescriptions,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import { requestTransform } from '@gosaas/core';
import type {
  Ticketingapicategoryv1CreateCategoryRequest,
  Ticketingapicategoryv1UpdateCategory,
  Ticketingapicategoryv1UpdateCategoryRequest,
  Ticketingapicategoryv1Category,
  Ticketingapicategoryv1CategoryFilter,
} from '@gosaas/commerce-api';
import { TicketingCategoryServiceApi } from '@gosaas/commerce-api';
import copy from 'copy-to-clipboard';
import { useIntl } from '@umijs/max';
import { CategoryWithChildren, getTreeData } from './data';

const service = new TicketingCategoryServiceApi();

const TableList: React.FC = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [defaultExpanded, setDefaultExpanded] = useState<React.Key[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Ticketingapicategoryv1Category | undefined | null>(
    undefined,
  );

  const intl = useIntl();
  const handleAdd = async (fields: Ticketingapicategoryv1CreateCategoryRequest) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.creating', defaultMessage: 'Creating...' }),
    );
    try {
      await service.ticketingCategoryServiceCreateCategory({ body: fields });
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

  const handleUpdate = async (fields: Ticketingapicategoryv1UpdateCategoryRequest) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.updating', defaultMessage: 'Updating...' }),
    );
    try {
      await service.ticketingCategoryServiceUpdateCategory2({
        body: fields,
        categoryKey: fields.category!.key!,
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

  const handleRemove = async (selectedRow: Ticketingapicategoryv1Category) => {
    const hide = message.loading(
      intl.formatMessage({ id: 'common.deleting', defaultMessage: 'Deleting...' }),
    );
    try {
      await service.ticketingCategoryServiceDeleteCategory({ key: selectedRow.key! });
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

  const columns: ProColumns<Ticketingapicategoryv1Category>[] = [
    {
      title: <FormattedMessage id="ticketing.category.key" defaultMessage="Key" />,
      dataIndex: 'key',
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
      title: <FormattedMessage id="ticketing.category.name" defaultMessage="Category Name" />,
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="ticketing.category.path" defaultMessage="Category Path" />,
      dataIndex: 'path',
      valueType: 'text',
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
              copy(record.key);
              message.success(
                intl.formatMessage({ id: 'common.copied', defaultMessage: 'Copied!' }),
              );
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
              key: 'delete',
              name: <FormattedMessage id="common.delete" defaultMessage="Delete" />,
            },
          ]}
        />,
      ],
    },
  ];

  const getData = requestTransform<
    Ticketingapicategoryv1Category,
    Ticketingapicategoryv1CategoryFilter
  >(async (req) => {
    const newExpandedKeys: string[] = [];
    const render = (treeDatas: CategoryWithChildren[]) => {
      // 获取到所有可展开的父节点
      treeDatas.forEach((item) => {
        if (item.children) {
          newExpandedKeys.push(item.key!);
          render(item.children);
        }
      });
      return newExpandedKeys;
    };
    const tree = await getTreeData();
    setDefaultExpanded(render(tree));

    return {
      items: tree,
    };
  });

  return (
    <PageContainer>
      <ProTable<Ticketingapicategoryv1Category>
        actionRef={actionRef}
        rowKey="key"
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
        expandable={{
          expandedRowKeys: defaultExpanded,
          onExpandedRowsChange: (keys) => {
            setDefaultExpanded(keys.map((p) => p));
          },
        }}
        columns={columns}
      />
      <Drawer
        width={800}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
        destroyOnClose
      >
        {currentRow?.key && (
          <ProDescriptions<Ticketingapicategoryv1Category>
            column={1}
            title={currentRow?.name}
            request={async () => {
              const resp = await service.ticketingCategoryServiceGetCategory({
                key: currentRow.key!,
              });
              return {
                data: resp.data,
              };
            }}
            params={{
              key: currentRow?.key,
            }}
            columns={columns}
          />
        )}
      </Drawer>
      <UpdateForm
        onSubmit={async (value) => {
          let success = false;
          if (currentRow) {
            success = await handleUpdate({
              category: value as Ticketingapicategoryv1UpdateCategory,
            });
          } else {
            success = await handleAdd(value as Ticketingapicategoryv1CreateCategoryRequest);
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
        values={(currentRow as any) || {}}
      />
    </PageContainer>
  );
};

export default TableList;
