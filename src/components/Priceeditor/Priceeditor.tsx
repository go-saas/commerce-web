import React from 'react';
import { ProFormMoney, ProFormText, ProFormSwitch } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';

const PriceEditor = () => {
  const intl = useIntl();
  return (
    <>
      <ProFormMoney
        name="default"
        label={intl.formatMessage({
          id: 'common.price.default',
          defaultMessage: 'Default Price',
        })}
      ></ProFormMoney>
      <ProFormMoney
        name="discounted"
        label={intl.formatMessage({
          id: 'common.price.discounted',
          defaultMessage: 'Discounted Price',
        })}
      ></ProFormMoney>
      <ProFormText
        name="discountText"
        label={intl.formatMessage({
          id: 'common.price.discountText',
          defaultMessage: 'Discount Text',
        })}
      ></ProFormText>
      <ProFormSwitch
        name="denyMoreDiscounts"
        label={intl.formatMessage({
          id: 'common.price.denyMoreDiscounts',
          defaultMessage: 'Deny More Discounts',
        })}
      ></ProFormSwitch>
    </>
  );
};

export default PriceEditor;
