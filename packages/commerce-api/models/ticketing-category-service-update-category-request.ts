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
import { TicketingCategoryServiceUpdateCategoryRequestCategory } from './ticketing-category-service-update-category-request-category';

/**
 * 
 * @export
 * @interface TicketingCategoryServiceUpdateCategoryRequest
 */
export interface TicketingCategoryServiceUpdateCategoryRequest {
    /**
     * 
     * @type {TicketingCategoryServiceUpdateCategoryRequestCategory}
     * @memberof TicketingCategoryServiceUpdateCategoryRequest
     */
    'category'?: TicketingCategoryServiceUpdateCategoryRequestCategory;
    /**
     * 
     * @type {string}
     * @memberof TicketingCategoryServiceUpdateCategoryRequest
     */
    'updateMask'?: string;
}
