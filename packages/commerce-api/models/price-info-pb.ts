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
import { PricePricePb } from './price-price-pb';

/**
 * 
 * @export
 * @interface PriceInfoPb
 */
export interface PriceInfoPb {
    /**
     * 
     * @type {PricePricePb}
     * @memberof PriceInfoPb
     */
    'default'?: PricePricePb;
    /**
     * 
     * @type {PricePricePb}
     * @memberof PriceInfoPb
     */
    'discounted'?: PricePricePb;
    /**
     * 
     * @type {string}
     * @memberof PriceInfoPb
     */
    'discountText'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PriceInfoPb
     */
    'denyMoreDiscounts'?: boolean;
}

