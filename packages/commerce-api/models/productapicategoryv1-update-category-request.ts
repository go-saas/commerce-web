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


import { Productapicategoryv1UpdateCategory } from './productapicategoryv1-update-category';

/**
 * 
 * @export
 * @interface Productapicategoryv1UpdateCategoryRequest
 */
export interface Productapicategoryv1UpdateCategoryRequest {
    /**
     * 
     * @type {Productapicategoryv1UpdateCategory}
     * @memberof Productapicategoryv1UpdateCategoryRequest
     */
    'category'?: Productapicategoryv1UpdateCategory;
    /**
     * 
     * @type {string}
     * @memberof Productapicategoryv1UpdateCategoryRequest
     */
    'updateMask'?: string;
}

