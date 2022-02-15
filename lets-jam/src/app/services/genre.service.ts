/**
 * LetsJamApi
 * RESTful Api for LetsJam Website. MWT 2020/2021 - Jacopo Cicoria, Antonio Angelini, Mattia Lenza
 *
 * OpenAPI spec version: 1.0
 * Contact: mattia.lenza@student.univaq.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Genre} from '../model/genre';
import {UserIdGenresBody} from '../model/requests-model/userIdGenresBody';

import {BASE_PATH} from './configuration-api/variables';
import {Configuration} from './configuration-api/configuration';


@Injectable()
export class GenreService {

  protected basePath = 'https://letsjam.ccml.it/rest';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }


  /**
   * Adds specified genre from specified user&#x27;s preferred genres
   *
   * @param userId
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public addPreferredGenre(userId: number, body?: UserIdGenresBody, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public addPreferredGenre(userId: number, body?: UserIdGenresBody, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public addPreferredGenre(userId: number, body?: UserIdGenresBody, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public addPreferredGenre(userId: number, body?: UserIdGenresBody, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling addPreferredGenre.');
    }


    let headers = this.defaultHeaders;

    // authentication (bearerAuth) required
    if (this.configuration.accessToken) {
      const accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'text/plain'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>('post', `${this.basePath}/user/${encodeURIComponent(String(userId))}/genres`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Gets all the song gernes
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllGenres(observe?: 'body', reportProgress?: boolean): Observable<Array<Genre>>;
  public getAllGenres(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Genre>>>;
  public getAllGenres(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Genre>>>;
  public getAllGenres(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let headers = this.defaultHeaders;

    // authentication (bearerAuth) required
    if (this.configuration.accessToken) {
      const accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'application/json',
      'text/plain'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<Array<Genre>>('get', `${this.basePath}/genres`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Gets user&#x27;s preferred genres
   *
   * @param userId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getUserPreferredGenres(userId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Genre>>;
  public getUserPreferredGenres(userId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Genre>>>;
  public getUserPreferredGenres(userId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Genre>>>;
  public getUserPreferredGenres(userId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling getUserPreferredGenres.');
    }

    let headers = this.defaultHeaders;

    // authentication (bearerAuth) required
    if (this.configuration.accessToken) {
      const accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'application/json',
      'text/plain'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<Array<Genre>>('get', `${this.basePath}/user/${encodeURIComponent(String(userId))}/genres`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Removes specified genre from specified user&#x27;s preferred genres
   *
   * @param userId
   * @param genreId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public removePreferredGenre(userId: number, genreId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public removePreferredGenre(userId: number, genreId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public removePreferredGenre(userId: number, genreId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public removePreferredGenre(userId: number, genreId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling removePreferredGenre.');
    }

    if (genreId === null || genreId === undefined) {
      throw new Error('Required parameter genreId was null or undefined when calling removePreferredGenre.');
    }

    let headers = this.defaultHeaders;

    // authentication (bearerAuth) required
    if (this.configuration.accessToken) {
      const accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'text/plain'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<any>('delete', `${this.basePath}/user/${encodeURIComponent(String(userId))}/genres/${encodeURIComponent(String(genreId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}
