import { ProFormInstance, ProFormTreeSelect, ProFormSwitch } from '@ant-design/pro-components';
import {
  ProFormText,
  ProFormTextArea,
  DrawerForm,
  ProFormUploadButton,
  ProFormDigit,
  ProFormGroup,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useEffect, useRef } from 'react';
import type { V1CreateActivityRequest, V1UpdateActivity } from '@gosaas/commerce-api';
import { ActivityServiceApi, Ticketingapicategoryv1Category } from '@gosaas/commerce-api';
import { uploadApi } from '@/utils/upload';
import { getAllData, transformAsTreeSelect } from '../../Category/data';
import { parsePbDurationAsSeconds } from '@gosaas/core';
import { uploadConvertValue, uploadTransform, uploadTransformSingle } from '@gosaas/core';
const service = new ActivityServiceApi();

export type FormValueType = V1CreateActivityRequest &
  V1UpdateActivity & {
    categoryKeys?: string[];
    categories?: Ticketingapicategoryv1Category[];
    durationHour?: number;
    durationMinute?: number;
  };

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: FormValueType;
};

function formatData(d: FormValueType) {
  d.categoryKeys = d.categories?.map((p) => p.key!) ?? [];
  const s = parsePbDurationAsSeconds(d.duration ?? '0s');
  d.durationHour = ~~(s / 60 / 60);
  d.durationMinute = (s - 60 * 60 * d.durationHour) / 60;
  return d;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (props.values?.id && props.updateModalVisible) {
      service.activityServiceGetActivity({ id: props.values?.id }).then((resp) => {
        formRef?.current?.setFieldsValue(formatData(resp.data));
      });
    }
  }, [props]);

  return (
    <DrawerForm
      formRef={formRef}
      initialValues={formatData(props.values)}
      open={props.updateModalVisible}
      onFinish={async (formData) => {
        const { durationHour, durationMinute, ...data } = formData;
        const ret = {
          id: props.values?.id,
          ...data,
          duration: `${durationHour * 60 * 60 + durationMinute * 60}s`,
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
          id: 'ticketing.activity.name',
          defaultMessage: 'Activity Name',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText
        name="shortDesc"
        label={intl.formatMessage({
          id: 'ticketing.activity.shortDesc',
          defaultMessage: 'Short Description',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormUploadButton
        name="medias"
        label={intl.formatMessage({
          id: 'ticketing.activity.medias',
          defaultMessage: 'Medias',
        })}
        transform={uploadTransform}
        convertValue={uploadConvertValue}
        fieldProps={{
          customRequest: (opt) => {
            const { onProgress, onError, onSuccess, file, filename } = opt;
            uploadApi(
              '/v1/ticketing/activity/media',
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
      <ProFormTreeSelect
        name="categoryKeys"
        allowClear
        fieldProps={{ multiple: true }}
        label={intl.formatMessage({
          id: 'ticketing.activity.categories',
          defaultMessage: 'Categories',
        })}
        request={async () => {
          const data = await getAllData();
          return transformAsTreeSelect(data);
        }}
      />
      <ProFormTextArea
        name="desc"
        label={intl.formatMessage({
          id: 'ticketing.activity.desc',
          defaultMessage: 'Description',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormSwitch
        name="seatSelectable"
        label={intl.formatMessage({
          id: 'ticketing.activity.seatSelectable',
          defaultMessage: 'Seat Selectable',
        })}
      />

      <ProFormGroup
        title={intl.formatMessage({
          id: 'ticketing.activity.duration',
          defaultMessage: 'Duration',
        })}
      >
        <ProFormDigit
          name="durationHour"
          initialValue={0}
          label={intl.formatMessage({
            id: 'ticketing.activity.durationHour',
            defaultMessage: 'Hour',
          })}
        ></ProFormDigit>
        <ProFormDigit
          name="durationMinute"
          initialValue={0}
          label={intl.formatMessage({
            id: 'ticketing.activity.durationMin',
            defaultMessage: 'Minute',
          })}
        ></ProFormDigit>
      </ProFormGroup>
    </DrawerForm>
  );
};

export default UpdateForm;
