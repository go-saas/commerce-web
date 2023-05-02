import {
  ProFormTextArea,
  DrawerForm,
  ProFormSelect,
  ProFormDateTimeRangePicker,
  ProFormInstance,
  EditableProTable,
  ProForm,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useEffect, useRef, useState } from 'react';
import type { V1CreateShowRequest, V1SeatGroup, V1UpdateShow } from '@gosaas/commerce-api';
import {
  ShowServiceApi,
  LocationServiceApi,
  ActivityServiceApi,
  V1UpdateShowSalesType,
} from '@gosaas/commerce-api';
import { dateUtil } from '@gosaas/core';
import { v4 as uuidv4 } from 'uuid';
import type { ProColumnType } from '@ant-design/pro-components';
import { Form } from 'antd';
import { uploadApi } from '@/utils/upload';
import { uploadConvertValue, uploadTransformSingle } from '@gosaas/core';

const service = new ShowServiceApi();

const locationSrv = new LocationServiceApi();
const activitySrv = new ActivityServiceApi();

export type FormValueType = V1CreateShowRequest &
  V1UpdateShow & {
    timeRange?: string[];
  };

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: FormValueType;
};

function formatData(d: FormValueType) {
  d.salesTypes = d.salesTypes?.map((p) => {
    if (p.price?.default?.amount) {
      p.price.default.amount = (
        BigInt(p.price.default.amount) / BigInt(Math.pow(10, p.price!.default!.digits || 0))
      ).toString();
    }
    if (p.price?.discounted?.amount) {
      p.price.discounted.amount = (
        BigInt(p.price.discounted.amount) / BigInt(Math.pow(10, p.price!.discounted!.digits || 0))
      ).toString();
    }
    return p;
  });
  return d;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();

  const [isUpdate, setIsUpdate] = useState(!!props.values?.id);

  useEffect(() => {
    const update = !!props.values?.id;
    setIsUpdate(update);
    if (update && props.updateModalVisible) {
      service.showServiceGetShow({ id: props.values?.id }).then((resp) => {
        const formatted = formatData(resp.data as any);
        formRef?.current?.setFieldsValue(formatted);
      });
    }
  }, [props]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(
    props.values?.salesTypes?.map((p) => p.id!) ?? [],
  );

  const [allSeatGroups, setAllSeatGroups] = useState<V1SeatGroup[]>([]);

  const [restSeatGroups, setRestSeatGroups] = useState<V1SeatGroup[]>([]);

  const [form] = Form.useForm();
  const hallId = Form.useWatch('hallId', form);
  const locationId = Form.useWatch('locationId', form);

  const reloadSeatGroups = async (hallId: string) => {
    if (!hallId) {
      setAllSeatGroups([]);
      setRestSeatGroups([]);
      return;
    }
    const respHalls = await locationSrv.locationServiceGetLocationHallDetail({
      locationId: locationId,
      hallId: hallId,
    });
    setAllSeatGroups(respHalls.data.hall?.seatGroups ?? []);
    setRestSeatGroups(respHalls.data.hall?.seatGroups ?? []);
  };
  useEffect(() => {
    reloadSeatGroups(hallId);
    //clear
  }, [hallId]);

  let dict: any = {};
  restSeatGroups.forEach((p) => (dict[p.id!] = { text: p.name }));

  const columns: ProColumnType<V1UpdateShowSalesType>[] = [
    {
      title: <FormattedMessage id="ticketing.show.saleType.name" defaultMessage="Sale Type" />,
      dataIndex: 'name',
    },
    {
      title: (
        <FormattedMessage id="ticketing.show.saleType.saleableFrom" defaultMessage="Sale From" />
      ),
      dataIndex: 'saleableFrom',
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="ticketing.show.saleType.saleableTo" defaultMessage="Sale To" />,
      dataIndex: 'saleableTo',
      valueType: 'dateTime',
    },

    {
      title: <FormattedMessage id="common.price.default" defaultMessage="Default Price" />,
      dataIndex: ['price', 'default', 'amount'],
      valueType: 'money',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: <FormattedMessage id="common.price.discounted" defaultMessage="Discounted Price" />,
      dataIndex: ['price', 'discounted', 'amount'],
      valueType: 'money',
    },
    {
      title: <FormattedMessage id="common.price.discountText" defaultMessage="Discount Text" />,
      dataIndex: ['price', 'discountText'],
      valueType: 'text',
    },
    {
      title: (
        <FormattedMessage
          id="common.price.denyMoreDiscounts"
          defaultMessage="Deny More Discounts"
        />
      ),
      dataIndex: ['price', 'denyMoreDiscounts'],
      valueType: 'switch',
    },
    // {
    //   title: (
    //     <FormattedMessage id="ticketing.show.saleType.seatGroupId" defaultMessage="Seat Group" />
    //   ),
    //   dataIndex: 'seatGroupId',
    //   valueType: 'select',
    //   valueEnum: dict,
    // },
    {
      title: <FormattedMessage id="common.operate" defaultMessage="Operate" />,
      valueType: 'option',
    },
  ];

  const salesType = Form.useWatch<V1UpdateShowSalesType[]>('salesTypes', form);
  useEffect(() => {
    setEditableRowKeys(salesType?.map((p) => p.id!));
  }, [salesType]);

  //location change. change halls
  return (
    <DrawerForm
      formRef={formRef}
      form={form}
      initialValues={formatData(props.values)}
      open={props.updateModalVisible}
      onFinish={async (formData) => {
        const { timeRange, salesTypes, ...data } = formData;
        const ret = {
          id: props.values?.id,
          ...data,
          startTime: dateUtil(timeRange[0]).toISOString(),
          endTime: dateUtil(timeRange[1]).toISOString(),
          salesTypes: salesTypes?.map((p: any) => {
            const { saleableFrom, saleableTo, price, ...rest } = p;
            const { default: defaultPrice, discounted: discountedPrice } = price || {};
            //TODO cuccrency
            if (defaultPrice) {
              price.default = { amount: defaultPrice.amount * 100, currencyCode: 'CNY' };
            }
            if (discountedPrice) {
              price.discounted = { amount: discountedPrice.amount * 100, currencyCode: 'CNY' };
            }
            return {
              ...rest,
              saleableFrom: saleableFrom ? dateUtil(saleableFrom).toISOString() : saleableFrom,
              saleableTo: saleableTo ? dateUtil(saleableTo).toISOString() : saleableTo,
              price,
            };
          }),
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
      {!isUpdate && (
        <ProFormSelect
          name="activityId"
          label={intl.formatMessage({
            id: 'ticketing.activity',
            defaultMessage: 'Activity',
          })}
          rules={[
            {
              required: true,
            },
          ]}
          request={async () => {
            const resp = await activitySrv.activityServiceListActivity2({ body: { pageSize: -1 } });
            return (resp.data.items ?? []).map((p) => {
              return {
                label: p.name,
                value: p.id!,
              };
            });
          }}
        />
      )}
      {!isUpdate && (
        <ProFormSelect
          name="locationId"
          label={intl.formatMessage({
            id: 'ticketing.location',
            defaultMessage: 'Location',
          })}
          rules={[
            {
              required: true,
            },
          ]}
          request={async () => {
            const resp = await locationSrv.locationServiceListLocation2({ body: { pageSize: -1 } });
            return (resp.data.items ?? []).map((p) => {
              return {
                label: p.name,
                value: p.id!,
              };
            });
          }}
        />
      )}
      {!isUpdate && (
        <ProFormSelect
          name="hallId"
          label={intl.formatMessage({
            id: 'ticketing.hall.name',
            defaultMessage: 'Hall',
          })}
          rules={[
            {
              required: true,
            },
          ]}
          dependencies={['locationId']}
          request={async (params: { locationId: string }) => {
            const { locationId } = params;
            if (!locationId) {
              return [];
            }
            const resp = await locationSrv.locationServiceGetLocationHalls2({
              id: locationId,
              body: {},
            });
            return (resp.data.halls ?? []).map((p) => {
              return {
                label: p.name,
                value: p.id!,
              };
            });
          }}
        />
      )}
      <ProFormDateTimeRangePicker
        name="timeRange"
        label={intl.formatMessage({
          id: 'ticketing.show.timeRange',
          defaultMessage: 'Show Time',
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
          id: 'ticketing.activity.mainPic',
          defaultMessage: 'MainPic',
        })}
        transform={uploadTransformSingle}
        convertValue={uploadConvertValue}
        fieldProps={{
          customRequest: (opt) => {
            const { onProgress, onError, onSuccess, file, filename } = opt;
            uploadApi(
              '/v1/ticketing/show/media',
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
      <ProFormTextArea
        name="notice"
        label={intl.formatMessage({
          id: 'ticketing.show.notice',
          defaultMessage: 'Notice',
        })}
      />
      <ProForm.Item
        label={intl.formatMessage({
          id: 'ticketing.show.saleType.name',
          defaultMessage: 'Sale Type',
        })}
        name="salesTypes"
        trigger="onValuesChange"
      >
        <EditableProTable<V1UpdateShowSalesType>
          rowKey="id"
          toolBarRender={false}
          columns={columns}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            position: 'bottom',
            record: () => ({ id: uuidv4() }),
          }}
          editable={{
            type: 'multiple',
            editableKeys,
            // onChange: (p, rows) => {
            //   console.log(p);
            //   console.log(rows);
            //   setEditableRowKeys(p);
            // },
            actionRender: (row, _, dom) => {
              return [dom.delete];
            },
          }}
        />
      </ProForm.Item>
    </DrawerForm>
  );
};

export default UpdateForm;
