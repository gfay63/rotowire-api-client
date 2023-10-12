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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { DefaultRotowireNflApiServiceInterface } from './default.serviceInterface';


@Injectable()
export class DefaultRotowireNflApiService implements DefaultRotowireNflApiServiceInterface {

    protected basePath = 'https://api.rotowire.com/Football/NFL';
    public defaultHeaders: Record<string,string> = {};
    public configuration = new Configuration();

    constructor(protected httpClient: HttpService, @Optional() configuration: Configuration) {
        this.configuration = configuration || this.configuration;
        this.basePath = configuration?.basePath || this.basePath;
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        return consumes.includes(form);
    }

    /**
     * Daily Projections
     * 
     * @param format Output Format - json or yaml (default)
     * @param date Date \&quot;YYYY-MM-DD\&quot;
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public dailyProjections(format: string, date?: string, ): Observable<AxiosResponse<any>>;
    public dailyProjections(format: string, date?: string, ): Observable<any> {

        if (format === null || format === undefined) {
            throw new Error('Required parameter format was null or undefined when calling dailyProjections.');
        }


        let queryParameters = new URLSearchParams();
        if (date !== undefined && date !== null) {
            queryParameters.append('date', <any>date);
        }
        if (format !== undefined && format !== null) {
            queryParameters.append('format', <any>format);
        }

        let headers = {...this.defaultHeaders};

        // authentication (apikeyAuth) required
        if (this.configuration.apiKeys["key"]) {
            queryParameters.append('key', this.configuration.apiKeys["key"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers['Accept'] = httpHeaderAcceptSelected;
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        return this.httpClient.get<any>(`${this.basePath}/DailyProjections.php`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers
            }
        );
    }
    /**
     * Injuries
     * 
     * @param format Output Format - json or yaml (default)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public injuries(format: string, ): Observable<AxiosResponse<any>>;
    public injuries(format: string, ): Observable<any> {

        if (format === null || format === undefined) {
            throw new Error('Required parameter format was null or undefined when calling injuries.');
        }

        let queryParameters = new URLSearchParams();
        if (format !== undefined && format !== null) {
            queryParameters.append('format', <any>format);
        }

        let headers = {...this.defaultHeaders};

        // authentication (apikeyAuth) required
        if (this.configuration.apiKeys["key"]) {
            queryParameters.append('key', this.configuration.apiKeys["key"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers['Accept'] = httpHeaderAcceptSelected;
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        return this.httpClient.get<any>(`${this.basePath}/Injuries.php`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers
            }
        );
    }
    /**
     * News Injuries
     * 
     * @param format Output Format - json or yaml (default)
     * @param date Date \&quot;YYYY-MM-DD\&quot;
     * @param hours Optional hours ahead of date (up to 2 weeks ahead)
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public newsInjuries(format: string, date?: string, hours?: number, ): Observable<AxiosResponse<any>>;
    public newsInjuries(format: string, date?: string, hours?: number, ): Observable<any> {

        if (format === null || format === undefined) {
            throw new Error('Required parameter format was null or undefined when calling newsInjuries.');
        }



        let queryParameters = new URLSearchParams();
        if (date !== undefined && date !== null) {
            queryParameters.append('date', <any>date);
        }
        if (format !== undefined && format !== null) {
            queryParameters.append('format', <any>format);
        }
        if (hours !== undefined && hours !== null) {
            queryParameters.append('hours', <any>hours);
        }

        let headers = {...this.defaultHeaders};

        // authentication (apikeyAuth) required
        if (this.configuration.apiKeys["key"]) {
            queryParameters.append('key', this.configuration.apiKeys["key"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers['Accept'] = httpHeaderAcceptSelected;
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        return this.httpClient.get<any>(`${this.basePath}/News/Injuries.php`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers
            }
        );
    }
    /**
     * Weekly Projections
     * 
     * @param format Output Format - json or yaml (default)
     * @param position Position
     * @param season Season year (number); default &#x3D; current
     * @param team Team Code, either a 2 or 3 character abbreviation. \&quot;LA\&quot; is the Rams, \&quot;LAC\&quot; are the Chargers.
     * @param week Week (number); default &#x3D; current
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public weeklyProjections(format: string, position?: string, season?: number, team?: string, week?: number, ): Observable<AxiosResponse<any>>;
    public weeklyProjections(format: string, position?: string, season?: number, team?: string, week?: number, ): Observable<any> {

        if (format === null || format === undefined) {
            throw new Error('Required parameter format was null or undefined when calling weeklyProjections.');
        }





        let queryParameters = new URLSearchParams();
        if (format !== undefined && format !== null) {
            queryParameters.append('format', <any>format);
        }
        if (position !== undefined && position !== null) {
            queryParameters.append('position', <any>position);
        }
        if (season !== undefined && season !== null) {
            queryParameters.append('season', <any>season);
        }
        if (team !== undefined && team !== null) {
            queryParameters.append('team', <any>team);
        }
        if (week !== undefined && week !== null) {
            queryParameters.append('week', <any>week);
        }

        let headers = {...this.defaultHeaders};

        // authentication (apikeyAuth) required
        if (this.configuration.apiKeys["key"]) {
            queryParameters.append('key', this.configuration.apiKeys["key"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers['Accept'] = httpHeaderAcceptSelected;
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        return this.httpClient.get<any>(`${this.basePath}/WeeklyProjections.php`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers
            }
        );
    }
}
