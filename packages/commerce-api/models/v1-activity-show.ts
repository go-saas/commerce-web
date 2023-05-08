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
import { Locationv1Location } from './locationv1-location';
// May contain unused imports in some cases
// @ts-ignore
import { V1Activity } from './v1-activity';
// May contain unused imports in some cases
// @ts-ignore
import { V1ActivityShowSalesType } from './v1-activity-show-sales-type';
// May contain unused imports in some cases
// @ts-ignore
import { V1LocationHall } from './v1-location-hall';
// May contain unused imports in some cases
// @ts-ignore
import { V1TicketingMedia } from './v1-ticketing-media';

/**
 * 
 * @export
 * @interface V1ActivityShow
 */
export interface V1ActivityShow {
    /**
     * 
     * @type {string}
     * @memberof V1ActivityShow
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof V1ActivityShow
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof V1ActivityShow
     */
    'createdAt'?: string;
    /**
     * 
     * @type {string}
     * @memberof V1ActivityShow
     */
    'activityId'?: string;
    /**
     * 
     * @type {V1Activity}
     * @memberof V1ActivityShow
     */
    'activity'?: V1Activity;
    /**
     * 
     * @type {string}
     * @memberof V1ActivityShow
     */
    'startTime'?: string;
    /**
     * 
     * @type {string}
     * @memberof V1ActivityShow
     */
    'endTime'?: string;
    /**
     * 
     * @type {string}
     * @memberof V1ActivityShow
     */
    'locationId'?: string;
    /**
     * 
     * @type {Locationv1Location}
     * @memberof V1ActivityShow
     */
    'location'?: Locationv1Location;
    /**
     * 
     * @type {string}
     * @memberof V1ActivityShow
     */
    'hallId'?: string;
    /**
     * 
     * @type {V1LocationHall}
     * @memberof V1ActivityShow
     */
    'hall'?: V1LocationHall;
    /**
     * 
     * @type {Array<V1ActivityShowSalesType>}
     * @memberof V1ActivityShow
     */
    'salesTypes'?: Array<V1ActivityShowSalesType>;
    /**
     * 
     * @type {V1TicketingMedia}
     * @memberof V1ActivityShow
     */
    'mainPic'?: V1TicketingMedia;
}
