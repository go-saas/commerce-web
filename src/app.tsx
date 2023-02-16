import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { getRequestInstance } from '@@/plugin-request/request';
import { setDefaultAxiosFactory } from '@gosaas/commerce-api';
import defaultSettings from '../config/defaultSettings';
import type { AxiosResponse } from '@umijs/max';
import {
  authRequestInterceptor,
  csrfRequestInterceptor,
  csrfRespInterceptor,
  saasRequestInterceptor,
  authRespInterceptor,
  bizErrorInterceptor,
  tenantErrorInterceptor,
  ErrorShowType,
  FriendlyError,
} from '@gosaas/core';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';
import { ProBreadcrumb } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import {
  setDefaultAxiosFactory as apiSetDefaultAxiosFactory,
  LocaleServiceApi,
  V1LocaleLanguage,
} from '@gosaas/api';
import { addLocale } from '@@/plugin-locale/localeExports';

import enUS0 from 'antd/es/locale/en_US';
import zhCN0 from 'antd/es/locale/zh_CN';

const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  loading?: boolean;
}> {
  setDefaultAxiosFactory(getRequestInstance);
  apiSetDefaultAxiosFactory(getRequestInstance);

  try {
    const locales = await new LocaleServiceApi().localeServiceListMessages();
    ((locales.data?.items as V1LocaleLanguage[] | undefined) ?? []).forEach((p) => {
      const msg: Record<string, string> = {};
      (p.msg ?? []).forEach((m: any) => {
        msg[m.id!] = m.other!;
      });
      let name = p.name!;
      if (name.startsWith('zh')) {
        name = 'zh-CN';
        addLocale(name, msg, { momentLocale: name, antd: zhCN0 as any });
      } else if (name.startsWith('en')) {
        name = 'en-US';
        addLocale(name, msg, { momentLocale: name, antd: enUS0 as any });
      } else {
        addLocale(name, msg, { momentLocale: name, antd: enUS0 as any });
      }
    });
  } catch (e) {}

  return {
    settings: defaultSettings,
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    headerContentRender: () => {
      return <ProBreadcrumb />;
    },
  };
};

function errorInterceptor() {
  return [
    (resp: AxiosResponse) => {
      return resp;
    },
    (error: any) => {
      console.log(error.wrap || error);
      const { config, code, response, request } = error.wrap || error || {};
      let showType = ErrorShowType.ERROR_MESSAGE;
      let errorMessage = '';
      let errorCode = code;

      if ('showType' in config) {
        showType = config.showType;
      }

      if (error instanceof FriendlyError) {
        errorCode = error.reason;
        errorMessage = error.message || errorCode;
      }
      if (response) {
        if (!errorMessage) {
          const status = response.status;
          errorMessage = status.toString();
        }
        if (!errorCode) {
          errorCode = errorMessage;
        }
      } else if (request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        errorMessage = 'None response! Please retry.';
        showType = ErrorShowType.ERROR_MESSAGE;
      } else {
        // 发送请求时出了点问题
        errorMessage = 'Request error, please retry.';
        showType = ErrorShowType.ERROR_MESSAGE;
      }
      switch (showType) {
        case ErrorShowType.SILENT:
          // do nothing
          break;
        case ErrorShowType.WARN_MESSAGE:
          message.warning(errorMessage);
          break;
        case ErrorShowType.ERROR_MESSAGE:
          message.error(errorMessage);
          break;
        case ErrorShowType.NOTIFICATION:
          notification.open({
            description: errorMessage,
            message: errorCode,
          });
          break;
        case ErrorShowType.REDIRECT:
          // TODO: redirect
          break;
        default:
          message.error(errorMessage);
      }
      return Promise.reject(new FriendlyError(code, errorCode, errorMessage));
    },
  ];
}

export const request: RequestConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
  requestInterceptors: [
    authRequestInterceptor(),
    csrfRequestInterceptor(),
    saasRequestInterceptor(),
  ],
  responseInterceptors: [
    csrfRespInterceptor(),
    bizErrorInterceptor(),
    errorInterceptor() as any,
    authRespInterceptor(() => {
      //redirect to login
      history.push(loginPath);
    }),
    tenantErrorInterceptor(),
  ],
};
