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
 * @interface OperationStringFilterOperation
 */
export interface OperationStringFilterOperation {
    /**
     * 
     * @type {string}
     * @memberof OperationStringFilterOperation
     */
    '$eq'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof OperationStringFilterOperation
     */
    '$neq'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof OperationStringFilterOperation
     */
    '$contains'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof OperationStringFilterOperation
     */
    '$starts_with'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof OperationStringFilterOperation
     */
    '$nstarts_with'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof OperationStringFilterOperation
     */
    '$ends_with'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof OperationStringFilterOperation
     */
    '$nends_with'?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof OperationStringFilterOperation
     */
    '$in'?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof OperationStringFilterOperation
     */
    '$nin'?: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof OperationStringFilterOperation
     */
    '$null'?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof OperationStringFilterOperation
     */
    '$nnull'?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof OperationStringFilterOperation
     */
    '$empty'?: boolean | null;
    /**
     * 
     * @type {boolean}
     * @memberof OperationStringFilterOperation
     */
    '$nempty'?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof OperationStringFilterOperation
     */
    '$like'?: string | null;
}

