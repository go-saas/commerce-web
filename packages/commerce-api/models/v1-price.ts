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
 * @interface V1Price
 */
export interface V1Price {
    /**
     * 
     * @type {string}
     * @memberof V1Price
     */
    'currencyCode'?: string;
    /**
     * 
     * @type {number}
     * @memberof V1Price
     */
    'defaultAmount'?: number;
    /**
     * 
     * @type {number}
     * @memberof V1Price
     */
    'discountedAmount'?: number;
    /**
     * 
     * @type {string}
     * @memberof V1Price
     */
    'discountText'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof V1Price
     */
    'denyMoreDiscounts'?: boolean;
}

