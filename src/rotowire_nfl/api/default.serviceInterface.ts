/**
 * Rotowire NFL API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Observable }                                        from 'rxjs';



import { Configuration }                                     from '../configuration';


export interface DefaultRotowireNflApiServiceInterface {
    defaultHeaders: {};
    configuration: Configuration;

    /**
    * Daily Projections
    * 
    * @param format Output Format - json or yaml (default)
    * @param date Date \&quot;YYYY-MM-DD\&quot;
    */
    dailyProjections(format: string, date?: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
    * Injuries
    * 
    * @param format Output Format - json or yaml (default)
    */
    injuries(format: string, extraHttpRequestParams?: any): Observable<{}>;

    /**
    * News Injuries
    * 
    * @param format Output Format - json or yaml (default)
    * @param date Date \&quot;YYYY-MM-DD\&quot;
    * @param hours Optional hours ahead of date (up to 2 weeks ahead)
    */
    newsInjuries(format: string, date?: string, hours?: number, extraHttpRequestParams?: any): Observable<{}>;

    /**
    * Weekly Projections
    * 
    * @param format Output Format - json or yaml (default)
    * @param position Position
    * @param season Season year (number); default &#x3D; current
    * @param team Team Code, either a 2 or 3 character abbreviation. \&quot;LA\&quot; is the Rams, \&quot;LAC\&quot; are the Chargers.
    * @param week Week (number); default &#x3D; current
    */
    weeklyProjections(format: string, position?: string, season?: number, team?: string, week?: number, extraHttpRequestParams?: any): Observable<{}>;

}
