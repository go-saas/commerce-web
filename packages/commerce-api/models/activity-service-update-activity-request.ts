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
import { ActivityServiceUpdateActivityRequestActivity } from './activity-service-update-activity-request-activity';

/**
 * 
 * @export
 * @interface ActivityServiceUpdateActivityRequest
 */
export interface ActivityServiceUpdateActivityRequest {
    /**
     * 
     * @type {ActivityServiceUpdateActivityRequestActivity}
     * @memberof ActivityServiceUpdateActivityRequest
     */
    'activity'?: ActivityServiceUpdateActivityRequestActivity;
    /**
     * 
     * @type {string}
     * @memberof ActivityServiceUpdateActivityRequest
     */
    'updateMask'?: string;
}

