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
import { V1Brand } from './v1-brand';

/**
 * 
 * @export
 * @interface V1ListBrandReply
 */
export interface V1ListBrandReply {
    /**
     * 
     * @type {number}
     * @memberof V1ListBrandReply
     */
    'totalSize'?: number;
    /**
     * 
     * @type {number}
     * @memberof V1ListBrandReply
     */
    'filterSize'?: number;
    /**
     * 
     * @type {Array<V1Brand>}
     * @memberof V1ListBrandReply
     */
    'items'?: Array<V1Brand>;
}

