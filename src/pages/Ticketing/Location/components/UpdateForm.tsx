import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProFormText,
  ProFormTextArea,
  DrawerForm,
  ProFormUploadButton,
  ProForm,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useEffect, useRef } from 'react';
import type { V1CreateLocationRequest, V1UpdateLocation } from '@gosaas/commerce-api';
import { LocationServiceApi } from '@gosaas/commerce-api';
import {
  uploadApi,
  uploadConvertValue,
  uploadTransform,
  uploadTransformSingle,
} from '@/utils/upload';
import Addresseditor from '@/components/Addresseditor';

const service = new LocationServiceApi();

export type FormValueType = V1CreateLocationRequest &
  V1UpdateLocation & {
    categoryIds?: string[];
  };

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
      service.locationServiceGetLocation({ id: props.values?.id }).then((resp) => {
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
        const { ...data } = formData;
        const ret = {
          id: props.values?.id,
          ...data,
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
          id: 'ticketing.location.name',
          defaultMessage: 'Location Name',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormUploadButton
        name="logo"
        max={1}
        label={intl.formatMessage({
          id: 'ticketing.location.logo',
          defaultMessage: 'Logo',
        })}
        transform={uploadTransformSingle}
        convertValue={uploadConvertValue}
        fieldProps={{
          customRequest: (opt) => {
            const { onProgress, onError, onSuccess, file, filename } = opt;
            uploadApi(
              '/v1/ticketing/location/logo',
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
      />
      <ProFormUploadButton
        name="medias"
        label={intl.formatMessage({
          id: 'ticketing.location.medias',
          defaultMessage: 'Medias',
        })}
        transform={uploadTransform}
        convertValue={uploadConvertValue}
        fieldProps={{
          customRequest: (opt) => {
            const { onProgress, onError, onSuccess, file, filename } = opt;
            uploadApi(
              '/v1/ticketing/location/media',
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
      />
      <ProForm.Item name="address">
        <Addresseditor></Addresseditor>
      </ProForm.Item>
      <ProFormText
        name="shortDesc"
        label={intl.formatMessage({
          id: 'ticketing.location.shortDesc',
          defaultMessage: 'Short Description',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormTextArea
        name="desc"
        label={intl.formatMessage({
          id: 'ticketing.location.desc',
          defaultMessage: 'Description',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProForm.Group>
        <ProFormText
          name={['publicContact', 'phone']}
          label={intl.formatMessage({
            id: 'ticketing.location.publicPhone',
            defaultMessage: 'Public Contact Phone',
          })}
        />
        <ProFormText
          name={['publicContact', 'email']}
          label={intl.formatMessage({
            id: 'ticketing.location.publicEmail',
            defaultMessage: 'Public Contact Email',
          })}
          rules={[
            {
              type: 'email',
            },
          ]}
        />
      </ProForm.Group>
      <ProFormUploadButton
        name="legalDocs"
        label={intl.formatMessage({
          id: 'ticketing.location.legalDocs',
          defaultMessage: 'Legal Document',
        })}
        transform={uploadTransform}
        convertValue={uploadConvertValue}
        fieldProps={{
          customRequest: (opt) => {
            const { onProgress, onError, onSuccess, file, filename } = opt;
            uploadApi(
              '/v1/ticketing/location/legal-docs',
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
      />
    </DrawerForm>
  );
};

export default UpdateForm;
