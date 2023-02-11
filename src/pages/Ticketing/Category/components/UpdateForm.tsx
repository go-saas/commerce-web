import type { ProFormInstance } from '@ant-design/pro-components';
import { ProFormText, DrawerForm, ProFormTreeSelect } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useEffect, useRef } from 'react';
import type {
  Ticketingapicategoryv1CreateCategoryRequest,
  Ticketingapicategoryv1UpdateCategory,
} from '@gosaas/commerce-api';
import { TicketingCategoryServiceApi } from '@gosaas/commerce-api';
import { CategoryWithChildren, getTreeData } from '../data';

const service = new TicketingCategoryServiceApi();

export type FormValueType = Ticketingapicategoryv1CreateCategoryRequest &
  Ticketingapicategoryv1UpdateCategory;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: FormValueType;
};

export async function getTreeSelectData() {
  const tree = await getTreeData();
  const transform = (menus: CategoryWithChildren[]) => {
    return menus.map((p): any => {
      return {
        title: p.name + '(' + p.key + ')',
        value: p.key!,
        children: p.children ? transform(p.children) : undefined,
      };
    });
  };
  return transform(tree);
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    if (props.values?.key && props.updateModalVisible) {
      service.ticketingCategoryServiceGetCategory({ key: props.values?.key }).then((resp) => {
        formRef?.current?.setFieldsValue(resp.data);
      });
    }
  }, [props]);

  return (
    <DrawerForm
      formRef={formRef}
      initialValues={props.values}
      open={props.updateModalVisible}
      onFinish={async (formData) => {
        const ret = {
          key: props.values?.key,
          ...formData,
        };
        await props.onSubmit(ret);
      }}
      drawerProps={{
        onClose: () => {
          props.onCancel();
        },
        destroyOnClose: true,
      }}
    >
      {!props.values?.key && (
        <ProFormText
          name="key"
          label={intl.formatMessage({
            id: 'ticketing.category.key',
            defaultMessage: 'Category Key',
          })}
          rules={[
            {
              required: true,
            },
          ]}
        />
      )}
      <ProFormTreeSelect
        name="parent"
        allowClear
        label={intl.formatMessage({
          id: 'ticketing.category.parent',
          defaultMessage: 'Parent Category',
        })}
        request={getTreeSelectData}
      />
      <ProFormText
        name="name"
        label={intl.formatMessage({
          id: 'ticketing.category.name',
          defaultMessage: 'Category Name',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
    </DrawerForm>
  );
};

export default UpdateForm;
