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


// May contain unused imports in some cases
// @ts-ignore
import { V1TicketingMedia } from './v1-ticketing-media';
// May contain unused imports in some cases
// @ts-ignore
import { V1UpdateShowSalesType } from './v1-update-show-sales-type';

/**
 * 
 * @export
 * @interface ShowServiceUpdateShowRequestShow
 */
export interface ShowServiceUpdateShowRequestShow {
    /**
     * 
     * @type {string}
     * @memberof ShowServiceUpdateShowRequestShow
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof ShowServiceUpdateShowRequestShow
     */
    'startTime'?: string;
    /**
     * 
     * @type {string}
     * @memberof ShowServiceUpdateShowRequestShow
     */
    'endTime'?: string;
    /**
     * 
     * @type {Array<V1UpdateShowSalesType>}
     * @memberof ShowServiceUpdateShowRequestShow
     */
    'salesTypes'?: Array<V1UpdateShowSalesType>;
    /**
     * 
     * @type {V1TicketingMedia}
     * @memberof ShowServiceUpdateShowRequestShow
     */
    'mainPic'?: V1TicketingMedia;
}

