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

/**
 * 
 * @export
 * @interface V1Banner
 */
export interface V1Banner {
    /**
     * 
     * @type {string}
     * @memberof V1Banner
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof V1Banner
     */
    'refType'?: string;
    /**
     * 
     * @type {string}
     * @memberof V1Banner
     */
    'refId'?: string;
    /**
     * 
     * @type {V1TicketingMedia}
     * @memberof V1Banner
     */
    'mainPic'?: V1TicketingMedia;
    /**
     * 
     * @type {string}
     * @memberof V1Banner
     */
    'status'?: string;
}
