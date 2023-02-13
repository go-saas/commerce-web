import { ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const AddressEditor = () => {
  const intl = useIntl();
  return (
    <>
      <ProFormText
        name={['address', 'country']}
        label={intl.formatMessage({
          id: 'common.address.contryOrRegion',
          defaultMessage: 'Contry Or Region',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      ></ProFormText>
      <ProFormText
        name={['address', 'state']}
        label={intl.formatMessage({
          id: 'common.address.state',
          defaultMessage: 'State',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      ></ProFormText>
      <ProFormText
        name={['address', 'city']}
        label={intl.formatMessage({
          id: 'common.address.city',
          defaultMessage: 'City',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      ></ProFormText>
      <ProFormTextArea
        name={['address', 'line1']}
        label={intl.formatMessage({
          id: 'common.address.line1',
          defaultMessage: 'Line 1',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      />
      <ProFormText
        name={['address', 'zipCode']}
        label={intl.formatMessage({
          id: 'common.address.zipcode',
          defaultMessage: 'Zipcode',
        })}
        rules={[
          {
            required: true,
          },
        ]}
      ></ProFormText>
    </>
  );
};
export default AddressEditor;
