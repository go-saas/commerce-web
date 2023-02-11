import type { ProFormInstance } from '@ant-design/pro-components';
import { ProFormText, DrawerForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useEffect, useRef } from 'react';
import type { Apicategoryv1UpdateCategoryRequest, V1UpdateCategory } from '@kit/platform-api';
import { CategoryServiceApi } from '@kit/platform-api';

const service = new CategoryServiceApi();

export type FormValueType = Apicategoryv1UpdateCategoryRequest & V1UpdateCategory;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: FormValueType;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    //fetch role detail
    if (props.values?.id && props.updateModalVisible) {
      service.categoryServiceGetCategory({ id: props.values?.id }).then((resp) => {
        formRef?.current?.setFieldsValue(resp.data);
      });
    }
  }, [props]);
  //transform logo into file list

  return (
    <DrawerForm
      formRef={formRef}
      initialValues={props.values}
      visible={props.updateModalVisible}
      onFinish={async (formData) => {
        const ret = {
          id: props.values?.id,
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
      <ProFormText
        name="name"
        label={intl.formatMessage({
          id: 'applatform.category.name',
          defaultMessage: 'Category Name',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText
        name="desc"
        label={intl.formatMessage({
          id: 'applatform.category.desc',
          defaultMessage: 'Description',
        })}
      />
    </DrawerForm>
  );
};

export default UpdateForm;
