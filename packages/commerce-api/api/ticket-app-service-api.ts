/* tslint:disable */
/* eslint-disable */
/**
 * order/api/order/v1/order.proto
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: version not set
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { GooglerpcStatus } from '../models';
// @ts-ignore
import { V1ListTicketReply } from '../models';
// @ts-ignore
import { V1ListTicketRequest } from '../models';
/**
 * TicketAppServiceApi - axios parameter creator
 * @export
 */
export const TicketAppServiceApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} [pageOffset] 
         * @param {number} [pageSize] 
         * @param {string} [search] 
         * @param {Array<string>} [sort] 
         * @param {string} [fields] 
         * @param {string} [filterId$eq] 
         * @param {string} [filterId$neq] 
         * @param {string} [filterId$contains] 
         * @param {string} [filterId$startsWith] 
         * @param {string} [filterId$nstartsWith] 
         * @param {string} [filterId$endsWith] 
         * @param {string} [filterId$nendsWith] 
         * @param {Array<string>} [filterId$in] 
         * @param {Array<string>} [filterId$nin] 
         * @param {boolean} [filterId$null] 
         * @param {boolean} [filterId$nnull] 
         * @param {boolean} [filterId$empty] 
         * @param {boolean} [filterId$nempty] 
         * @param {string} [filterId$like] 
         * @param {string} [filterName$eq] 
         * @param {string} [filterName$neq] 
         * @param {string} [filterName$contains] 
         * @param {string} [filterName$startsWith] 
         * @param {string} [filterName$nstartsWith] 
         * @param {string} [filterName$endsWith] 
         * @param {string} [filterName$nendsWith] 
         * @param {Array<string>} [filterName$in] 
         * @param {Array<string>} [filterName$nin] 
         * @param {boolean} [filterName$null] 
         * @param {boolean} [filterName$nnull] 
         * @param {boolean} [filterName$empty] 
         * @param {boolean} [filterName$nempty] 
         * @param {string} [filterName$like] 
         * @param {string} [afterPageToken] 
         * @param {string} [beforePageToken] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        ticketAppServiceListMyTicket: async (pageOffset?: number, pageSize?: number, search?: string, sort?: Array<string>, fields?: string, filterId$eq?: string, filterId$neq?: string, filterId$contains?: string, filterId$startsWith?: string, filterId$nstartsWith?: string, filterId$endsWith?: string, filterId$nendsWith?: string, filterId$in?: Array<string>, filterId$nin?: Array<string>, filterId$null?: boolean, filterId$nnull?: boolean, filterId$empty?: boolean, filterId$nempty?: boolean, filterId$like?: string, filterName$eq?: string, filterName$neq?: string, filterName$contains?: string, filterName$startsWith?: string, filterName$nstartsWith?: string, filterName$endsWith?: string, filterName$nendsWith?: string, filterName$in?: Array<string>, filterName$nin?: Array<string>, filterName$null?: boolean, filterName$nnull?: boolean, filterName$empty?: boolean, filterName$nempty?: boolean, filterName$like?: string, afterPageToken?: string, beforePageToken?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/ticketing/my-ticket`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)

            if (pageOffset !== undefined) {
                localVarQueryParameter['pageOffset'] = pageOffset;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['pageSize'] = pageSize;
            }

            if (search !== undefined) {
                localVarQueryParameter['search'] = search;
            }

            if (sort) {
                localVarQueryParameter['sort'] = sort;
            }

            if (fields !== undefined) {
                localVarQueryParameter['fields'] = fields;
            }

            if (filterId$eq !== undefined) {
                localVarQueryParameter['filter.id.$eq'] = filterId$eq;
            }

            if (filterId$neq !== undefined) {
                localVarQueryParameter['filter.id.$neq'] = filterId$neq;
            }

            if (filterId$contains !== undefined) {
                localVarQueryParameter['filter.id.$contains'] = filterId$contains;
            }

            if (filterId$startsWith !== undefined) {
                localVarQueryParameter['filter.id.$starts_with'] = filterId$startsWith;
            }

            if (filterId$nstartsWith !== undefined) {
                localVarQueryParameter['filter.id.$nstarts_with'] = filterId$nstartsWith;
            }

            if (filterId$endsWith !== undefined) {
                localVarQueryParameter['filter.id.$ends_with'] = filterId$endsWith;
            }

            if (filterId$nendsWith !== undefined) {
                localVarQueryParameter['filter.id.$nends_with'] = filterId$nendsWith;
            }

            if (filterId$in) {
                localVarQueryParameter['filter.id.$in'] = filterId$in;
            }

            if (filterId$nin) {
                localVarQueryParameter['filter.id.$nin'] = filterId$nin;
            }

            if (filterId$null !== undefined) {
                localVarQueryParameter['filter.id.$null'] = filterId$null;
            }

            if (filterId$nnull !== undefined) {
                localVarQueryParameter['filter.id.$nnull'] = filterId$nnull;
            }

            if (filterId$empty !== undefined) {
                localVarQueryParameter['filter.id.$empty'] = filterId$empty;
            }

            if (filterId$nempty !== undefined) {
                localVarQueryParameter['filter.id.$nempty'] = filterId$nempty;
            }

            if (filterId$like !== undefined) {
                localVarQueryParameter['filter.id.$like'] = filterId$like;
            }

            if (filterName$eq !== undefined) {
                localVarQueryParameter['filter.name.$eq'] = filterName$eq;
            }

            if (filterName$neq !== undefined) {
                localVarQueryParameter['filter.name.$neq'] = filterName$neq;
            }

            if (filterName$contains !== undefined) {
                localVarQueryParameter['filter.name.$contains'] = filterName$contains;
            }

            if (filterName$startsWith !== undefined) {
                localVarQueryParameter['filter.name.$starts_with'] = filterName$startsWith;
            }

            if (filterName$nstartsWith !== undefined) {
                localVarQueryParameter['filter.name.$nstarts_with'] = filterName$nstartsWith;
            }

            if (filterName$endsWith !== undefined) {
                localVarQueryParameter['filter.name.$ends_with'] = filterName$endsWith;
            }

            if (filterName$nendsWith !== undefined) {
                localVarQueryParameter['filter.name.$nends_with'] = filterName$nendsWith;
            }

            if (filterName$in) {
                localVarQueryParameter['filter.name.$in'] = filterName$in;
            }

            if (filterName$nin) {
                localVarQueryParameter['filter.name.$nin'] = filterName$nin;
            }

            if (filterName$null !== undefined) {
                localVarQueryParameter['filter.name.$null'] = filterName$null;
            }

            if (filterName$nnull !== undefined) {
                localVarQueryParameter['filter.name.$nnull'] = filterName$nnull;
            }

            if (filterName$empty !== undefined) {
                localVarQueryParameter['filter.name.$empty'] = filterName$empty;
            }

            if (filterName$nempty !== undefined) {
                localVarQueryParameter['filter.name.$nempty'] = filterName$nempty;
            }

            if (filterName$like !== undefined) {
                localVarQueryParameter['filter.name.$like'] = filterName$like;
            }

            if (afterPageToken !== undefined) {
                localVarQueryParameter['afterPageToken'] = afterPageToken;
            }

            if (beforePageToken !== undefined) {
                localVarQueryParameter['beforePageToken'] = beforePageToken;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {V1ListTicketRequest} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        ticketAppServiceListMyTicket2: async (body: V1ListTicketRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('ticketAppServiceListMyTicket2', 'body', body)
            const localVarPath = `/v1/ticket/my-ticket/list`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            await setApiKeyToObject(localVarHeaderParameter, "Authorization", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TicketAppServiceApi - functional programming interface
 * @export
 */
export const TicketAppServiceApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TicketAppServiceApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {number} [pageOffset] 
         * @param {number} [pageSize] 
         * @param {string} [search] 
         * @param {Array<string>} [sort] 
         * @param {string} [fields] 
         * @param {string} [filterId$eq] 
         * @param {string} [filterId$neq] 
         * @param {string} [filterId$contains] 
         * @param {string} [filterId$startsWith] 
         * @param {string} [filterId$nstartsWith] 
         * @param {string} [filterId$endsWith] 
         * @param {string} [filterId$nendsWith] 
         * @param {Array<string>} [filterId$in] 
         * @param {Array<string>} [filterId$nin] 
         * @param {boolean} [filterId$null] 
         * @param {boolean} [filterId$nnull] 
         * @param {boolean} [filterId$empty] 
         * @param {boolean} [filterId$nempty] 
         * @param {string} [filterId$like] 
         * @param {string} [filterName$eq] 
         * @param {string} [filterName$neq] 
         * @param {string} [filterName$contains] 
         * @param {string} [filterName$startsWith] 
         * @param {string} [filterName$nstartsWith] 
         * @param {string} [filterName$endsWith] 
         * @param {string} [filterName$nendsWith] 
         * @param {Array<string>} [filterName$in] 
         * @param {Array<string>} [filterName$nin] 
         * @param {boolean} [filterName$null] 
         * @param {boolean} [filterName$nnull] 
         * @param {boolean} [filterName$empty] 
         * @param {boolean} [filterName$nempty] 
         * @param {string} [filterName$like] 
         * @param {string} [afterPageToken] 
         * @param {string} [beforePageToken] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async ticketAppServiceListMyTicket(pageOffset?: number, pageSize?: number, search?: string, sort?: Array<string>, fields?: string, filterId$eq?: string, filterId$neq?: string, filterId$contains?: string, filterId$startsWith?: string, filterId$nstartsWith?: string, filterId$endsWith?: string, filterId$nendsWith?: string, filterId$in?: Array<string>, filterId$nin?: Array<string>, filterId$null?: boolean, filterId$nnull?: boolean, filterId$empty?: boolean, filterId$nempty?: boolean, filterId$like?: string, filterName$eq?: string, filterName$neq?: string, filterName$contains?: string, filterName$startsWith?: string, filterName$nstartsWith?: string, filterName$endsWith?: string, filterName$nendsWith?: string, filterName$in?: Array<string>, filterName$nin?: Array<string>, filterName$null?: boolean, filterName$nnull?: boolean, filterName$empty?: boolean, filterName$nempty?: boolean, filterName$like?: string, afterPageToken?: string, beforePageToken?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<V1ListTicketReply>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.ticketAppServiceListMyTicket(pageOffset, pageSize, search, sort, fields, filterId$eq, filterId$neq, filterId$contains, filterId$startsWith, filterId$nstartsWith, filterId$endsWith, filterId$nendsWith, filterId$in, filterId$nin, filterId$null, filterId$nnull, filterId$empty, filterId$nempty, filterId$like, filterName$eq, filterName$neq, filterName$contains, filterName$startsWith, filterName$nstartsWith, filterName$endsWith, filterName$nendsWith, filterName$in, filterName$nin, filterName$null, filterName$nnull, filterName$empty, filterName$nempty, filterName$like, afterPageToken, beforePageToken, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {V1ListTicketRequest} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async ticketAppServiceListMyTicket2(body: V1ListTicketRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<V1ListTicketReply>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.ticketAppServiceListMyTicket2(body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TicketAppServiceApi - factory interface
 * @export
 */
export const TicketAppServiceApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TicketAppServiceApiFp(configuration)
    return {
        /**
         * 
         * @param {TicketAppServiceApiTicketAppServiceListMyTicketRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        ticketAppServiceListMyTicket(requestParameters: TicketAppServiceApiTicketAppServiceListMyTicketRequest = {}, options?: AxiosRequestConfig): AxiosPromise<V1ListTicketReply> {
            return localVarFp.ticketAppServiceListMyTicket(requestParameters.pageOffset, requestParameters.pageSize, requestParameters.search, requestParameters.sort, requestParameters.fields, requestParameters.filterId$eq, requestParameters.filterId$neq, requestParameters.filterId$contains, requestParameters.filterId$startsWith, requestParameters.filterId$nstartsWith, requestParameters.filterId$endsWith, requestParameters.filterId$nendsWith, requestParameters.filterId$in, requestParameters.filterId$nin, requestParameters.filterId$null, requestParameters.filterId$nnull, requestParameters.filterId$empty, requestParameters.filterId$nempty, requestParameters.filterId$like, requestParameters.filterName$eq, requestParameters.filterName$neq, requestParameters.filterName$contains, requestParameters.filterName$startsWith, requestParameters.filterName$nstartsWith, requestParameters.filterName$endsWith, requestParameters.filterName$nendsWith, requestParameters.filterName$in, requestParameters.filterName$nin, requestParameters.filterName$null, requestParameters.filterName$nnull, requestParameters.filterName$empty, requestParameters.filterName$nempty, requestParameters.filterName$like, requestParameters.afterPageToken, requestParameters.beforePageToken, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {TicketAppServiceApiTicketAppServiceListMyTicket2Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        ticketAppServiceListMyTicket2(requestParameters: TicketAppServiceApiTicketAppServiceListMyTicket2Request, options?: AxiosRequestConfig): AxiosPromise<V1ListTicketReply> {
            return localVarFp.ticketAppServiceListMyTicket2(requestParameters.body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for ticketAppServiceListMyTicket operation in TicketAppServiceApi.
 * @export
 * @interface TicketAppServiceApiTicketAppServiceListMyTicketRequest
 */
export interface TicketAppServiceApiTicketAppServiceListMyTicketRequest {
    /**
     * 
     * @type {number}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly pageOffset?: number

    /**
     * 
     * @type {number}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly search?: string

    /**
     * 
     * @type {Array<string>}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly sort?: Array<string>

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly fields?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$eq?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$neq?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$contains?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$startsWith?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$nstartsWith?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$endsWith?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$nendsWith?: string

    /**
     * 
     * @type {Array<string>}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$in?: Array<string>

    /**
     * 
     * @type {Array<string>}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$nin?: Array<string>

    /**
     * 
     * @type {boolean}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$null?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$nnull?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$empty?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$nempty?: boolean

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterId$like?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$eq?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$neq?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$contains?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$startsWith?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$nstartsWith?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$endsWith?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$nendsWith?: string

    /**
     * 
     * @type {Array<string>}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$in?: Array<string>

    /**
     * 
     * @type {Array<string>}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$nin?: Array<string>

    /**
     * 
     * @type {boolean}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$null?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$nnull?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$empty?: boolean

    /**
     * 
     * @type {boolean}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$nempty?: boolean

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly filterName$like?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly afterPageToken?: string

    /**
     * 
     * @type {string}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket
     */
    readonly beforePageToken?: string
}

/**
 * Request parameters for ticketAppServiceListMyTicket2 operation in TicketAppServiceApi.
 * @export
 * @interface TicketAppServiceApiTicketAppServiceListMyTicket2Request
 */
export interface TicketAppServiceApiTicketAppServiceListMyTicket2Request {
    /**
     * 
     * @type {V1ListTicketRequest}
     * @memberof TicketAppServiceApiTicketAppServiceListMyTicket2
     */
    readonly body: V1ListTicketRequest
}

/**
 * TicketAppServiceApi - object-oriented interface
 * @export
 * @class TicketAppServiceApi
 * @extends {BaseAPI}
 */
export class TicketAppServiceApi extends BaseAPI {
    /**
     * 
     * @param {TicketAppServiceApiTicketAppServiceListMyTicketRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TicketAppServiceApi
     */
    public ticketAppServiceListMyTicket(requestParameters: TicketAppServiceApiTicketAppServiceListMyTicketRequest = {}, options?: AxiosRequestConfig) {
        return TicketAppServiceApiFp(this.configuration).ticketAppServiceListMyTicket(requestParameters.pageOffset, requestParameters.pageSize, requestParameters.search, requestParameters.sort, requestParameters.fields, requestParameters.filterId$eq, requestParameters.filterId$neq, requestParameters.filterId$contains, requestParameters.filterId$startsWith, requestParameters.filterId$nstartsWith, requestParameters.filterId$endsWith, requestParameters.filterId$nendsWith, requestParameters.filterId$in, requestParameters.filterId$nin, requestParameters.filterId$null, requestParameters.filterId$nnull, requestParameters.filterId$empty, requestParameters.filterId$nempty, requestParameters.filterId$like, requestParameters.filterName$eq, requestParameters.filterName$neq, requestParameters.filterName$contains, requestParameters.filterName$startsWith, requestParameters.filterName$nstartsWith, requestParameters.filterName$endsWith, requestParameters.filterName$nendsWith, requestParameters.filterName$in, requestParameters.filterName$nin, requestParameters.filterName$null, requestParameters.filterName$nnull, requestParameters.filterName$empty, requestParameters.filterName$nempty, requestParameters.filterName$like, requestParameters.afterPageToken, requestParameters.beforePageToken, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {TicketAppServiceApiTicketAppServiceListMyTicket2Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TicketAppServiceApi
     */
    public ticketAppServiceListMyTicket2(requestParameters: TicketAppServiceApiTicketAppServiceListMyTicket2Request, options?: AxiosRequestConfig) {
        return TicketAppServiceApiFp(this.configuration).ticketAppServiceListMyTicket2(requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }
}
