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



/**
 * 
 * @export
 * @interface V1Stock
 */
export interface V1Stock {
    /**
     * 
     * @type {string}
     * @memberof V1Stock
     */
    'id'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof V1Stock
     */
    'inStock'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof V1Stock
     */
    'level'?: string;
    /**
     * 
     * @type {number}
     * @memberof V1Stock
     */
    'amount'?: number;
    /**
     * 
     * @type {string}
     * @memberof V1Stock
     */
    'deliveryCode'?: string;
}

