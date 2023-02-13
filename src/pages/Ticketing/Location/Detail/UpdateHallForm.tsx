import { ProFormInstance, ProFormSelect } from '@ant-design/pro-components';
import { ProFormText, ProFormDigit, DrawerForm } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React, { useRef } from 'react';
import type { V1LocationHall, V1UpdateLocationHall } from '@gosaas/commerce-api';

export type FormValueType = V1UpdateLocationHall &
  V1LocationHall & {
    locationId: string;
    seatGroupNames?: string[];
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

  props.values.seatGroupNames = props?.values?.seatGroups?.map((p) => p.name || '');
  return (
    <DrawerForm
      formRef={formRef}
      initialValues={props.values}
      open={props.updateModalVisible}
      onFinish={async (formData) => {
        const preGroups = props.values?.seatGroups ?? [];

        const { seatGroupNames, ...data } = formData;
        const newGroups = (seatGroupNames ?? []).map((p: string) => {
          const findPre = preGroups.find((l) => l.name === p);
          if (findPre) {
            return { name: p, id: findPre.id };
          }
          return { name: p };
        });
        const ret = {
          id: props.values?.id,
          seatGroups: newGroups,
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
          id: 'ticketing.hall.name',
          defaultMessage: 'Hall Name',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormDigit
        name="capacity"
        label={intl.formatMessage({
          id: 'ticketing.hall.capacity',
          defaultMessage: 'Capacity',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormSelect
        name="seatGroupNames"
        mode="tags"
        label={intl.formatMessage({
          id: 'ticketing.hall.seatGroups',
          defaultMessage: 'Seat Groups',
        })}
        // transform={(value: any) => {
        //   if (!value) {
        //     return value;
        //   }
        //   return value.map((p: any) => {
        //     return p.name ?? p;
        //   });
        // }}
        // convertValue={(value: any) => {
        //   if (!value) {
        //     return value;
        //   }
        //   return value.map((p: any) => {
        //     return p.name;
        //   });
        // }}
      />
    </DrawerForm>
  );
};

export default UpdateForm;
