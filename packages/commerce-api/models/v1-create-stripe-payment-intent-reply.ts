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
 * @interface V1CreateStripePaymentIntentReply
 */
export interface V1CreateStripePaymentIntentReply {
    /**
     * 
     * @type {string}
     * @memberof V1CreateStripePaymentIntentReply
     */
    'paymentIntent'?: string;
    /**
     * 
     * @type {string}
     * @memberof V1CreateStripePaymentIntentReply
     */
    'ephemeralKey'?: string;
    /**
     * 
     * @type {string}
     * @memberof V1CreateStripePaymentIntentReply
     */
    'customerId'?: string;
}

