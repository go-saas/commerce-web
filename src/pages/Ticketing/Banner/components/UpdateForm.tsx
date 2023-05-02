import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProFormText,
  DrawerForm,
  ProFormSelect,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useRef } from 'react';
import type { V1CreateBannerRequest, V1UpdateBanner } from '@gosaas/commerce-api';
import { uploadConvertValue, uploadTransformSingle } from '@gosaas/core';
import { uploadApi } from '@/utils/upload';

export type FormValueType = V1CreateBannerRequest & V1UpdateBanner;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: FormValueType;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();

  const isUpdate = !!props.values.id;

  return (
    <DrawerForm
      formRef={formRef}
      initialValues={props.values}
      open={props.updateModalVisible}
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
      <ProFormSelect
        name="refType"
        label={intl.formatMessage({
          id: 'ticketing.banner.refType',
          defaultMessage: 'RefType',
        })}
        options={[
          { label: 'URL', value: 'URL' },
          { label: 'SHOW', value: 'SHOW' },
          { label: 'CATEGORY', value: 'CATEGORY' },
        ]}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText
        name="refId"
        label={intl.formatMessage({
          id: 'ticketing.banner.refId',
          defaultMessage: 'RefId',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormUploadButton
        name="mainPic"
        max={1}
        label={intl.formatMessage({
          id: 'ticketing.banner.mainPic',
          defaultMessage: 'MainPic',
        })}
        transform={uploadTransformSingle}
        convertValue={uploadConvertValue}
        fieldProps={{
          customRequest: (opt) => {
            const { onProgress, onError, onSuccess, file, filename } = opt;
            uploadApi(
              '/v1/ticketing/banner/media',
              {
                file: file as any,
                filename: filename,
              },
              onProgress,
            )
              .then((e) => {
                onSuccess?.(e.data);
              })
              .catch((e: any) => {
                onError?.(e);
              });
          },
        }}
        rules={[
          {
            required: true,
          },
        ]}
      />
      {isUpdate && (
        <ProFormSelect
          name="status"
          label={intl.formatMessage({
            id: 'ticketing.banner.status',
            defaultMessage: 'Status',
          })}
          options={[
            { label: 'UNPUBLISHED', value: 'UNPUBLISHED' },
            { label: 'PUBLISHED', value: 'PUBLISHED' },
          ]}
          rules={[
            {
              required: true,
            },
          ]}
        ></ProFormSelect>
      )}
    </DrawerForm>
  );
};

export default UpdateForm;
