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
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../services/configuration-api/encoder';

import {Observable} from 'rxjs';

import {Comment} from '../model/comment';
import {MusicSheet} from '../model/music-sheet';
import {MusicSheetData} from '../model/music-sheet-data';
import {MusicsheetIdCommentBody} from '../model/requests-model/musicsheetIdCommentBody';
import {MusicsheetMusicsheetIdBody} from '../model/requests-model/musicsheetMusicsheetIdBody';
import {NewMusicSheet} from '../model/requests-model/new-music-sheet';

import { BASE_PATH, COLLECTION_FORMATS } from '../services/configuration-api/variables';
import { Configuration } from '../services/configuration-api/configuration';


@Injectable({
  providedIn: 'root'
})
export class MusicsheetService {

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
   * Adds a new comment to specified musicSheet
   *
   * @param musicsheetId
   * @param body
   * @param parent Id of the parent comment. Required if the new comment is a reply to another comment
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public addComment(musicsheetId: number, body?: MusicsheetIdCommentBody, parent?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Comment>>;
  public addComment(musicsheetId: number, body?: MusicsheetIdCommentBody, parent?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Comment>>>;
  public addComment(musicsheetId: number, body?: MusicsheetIdCommentBody, parent?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Comment>>>;
  public addComment(musicsheetId: number, body?: MusicsheetIdCommentBody, parent?: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (musicsheetId === null || musicsheetId === undefined) {
      throw new Error('Required parameter musicsheetId was null or undefined when calling addComment.');
    }


    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (parent !== undefined && parent !== null) {
      queryParameters = queryParameters.set('parent', <any>parent);
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
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<Array<Comment>>('post', `${this.basePath}/musicsheet/${encodeURIComponent(String(musicsheetId))}/comment`,
      {
        body: body,
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Add like from specified user to specified musicsheet
   *
   * @param musicsheetId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public addLike(musicsheetId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public addLike(musicsheetId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public addLike(musicsheetId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public addLike(musicsheetId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (musicsheetId === null || musicsheetId === undefined) {
      throw new Error('Required parameter musicsheetId was null or undefined when calling addLike.');
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

    return this.httpClient.request<any>('post', `${this.basePath}/musicsheet/${encodeURIComponent(String(musicsheetId))}/like`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Adds a new musicSheet
   *
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public addMusicSheet(body: NewMusicSheet, observe?: 'body', reportProgress?: boolean): Observable<MusicSheet>;
  public addMusicSheet(body: NewMusicSheet, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MusicSheet>>;
  public addMusicSheet(body: NewMusicSheet, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MusicSheet>>;
  public addMusicSheet(body: NewMusicSheet, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling addMusicSheet.');
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
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<MusicSheet>('post', `${this.basePath}/musicsheet`,
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
   * Deletes musicsheet by id
   *
   * @param musicsheetId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteMusicSheetById(musicsheetId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteMusicSheetById(musicsheetId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteMusicSheetById(musicsheetId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteMusicSheetById(musicsheetId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (musicsheetId === null || musicsheetId === undefined) {
      throw new Error('Required parameter musicsheetId was null or undefined when calling deleteMusicSheetById.');
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

    return this.httpClient.request<any>('delete', `${this.basePath}/musicsheet/${encodeURIComponent(String(musicsheetId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Gets all musicsheets
   *
   * @param search
   * @param sortby Name of the column for sorting musicsheets
   * @param sortdirection Direction of sorting. ASC or DESC
   * @param genres List of genres to search musicsheet for
   * @param instruments List of instruments to search musicsheet for
   * @param verified Wheater to show only vierified musicsheets or not
   * @param rearranged Wheater to show only rearranged musicsheets or not
   * @param tablature Wheater to show only musicsheets that contain tablature or not
   * @param pagenumber The number of the page to skip before collect musicsheets
   * @param pagesize The number elements to return
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllMusicSheets(search?: string, sortby?: string, sortdirection?: string, genres?: Array<string>, instruments?: Array<string>, verified?: boolean, rearranged?: boolean, tablature?: boolean, pagenumber?: number, pagesize?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<MusicSheet>>;
  public getAllMusicSheets(search?: string, sortby?: string, sortdirection?: string, genres?: Array<string>, instruments?: Array<string>, verified?: boolean, rearranged?: boolean, tablature?: boolean, pagenumber?: number, pagesize?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<MusicSheet>>>;
  public getAllMusicSheets(search?: string, sortby?: string, sortdirection?: string, genres?: Array<string>, instruments?: Array<string>, verified?: boolean, rearranged?: boolean, tablature?: boolean, pagenumber?: number, pagesize?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<MusicSheet>>>;
  public getAllMusicSheets(search?: string, sortby?: string, sortdirection?: string, genres?: Array<string>, instruments?: Array<string>, verified?: boolean, rearranged?: boolean, tablature?: boolean, pagenumber?: number, pagesize?: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {


    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (search !== undefined && search !== null) {
      queryParameters = queryParameters.set('search', <any>search);
    }
    if (sortby !== undefined && sortby !== null) {
      queryParameters = queryParameters.set('sortby', <any>sortby);
    }
    if (sortdirection !== undefined && sortdirection !== null) {
      queryParameters = queryParameters.set('sortdirection', <any>sortdirection);
    }
    if (genres) {
      genres.forEach((element) => {
        queryParameters = queryParameters.append('genres', <any>element);
      })
    }
    if (instruments) {
      instruments.forEach((element) => {
        queryParameters = queryParameters.append('instruments', <any>element);
      })
    }
    if (verified !== undefined && verified !== null) {
      queryParameters = queryParameters.set('verified', <any>verified);
    }
    if (rearranged !== undefined && rearranged !== null) {
      queryParameters = queryParameters.set('rearranged', <any>rearranged);
    }
    if (tablature !== undefined && tablature !== null) {
      queryParameters = queryParameters.set('tablature', <any>tablature);
    }
    if (pagenumber !== undefined && pagenumber !== null) {
      queryParameters = queryParameters.set('pagenumber', <any>pagenumber);
    }
    if (pagesize !== undefined && pagesize !== null) {
      queryParameters = queryParameters.set('pagesize', <any>pagesize);
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

    return this.httpClient.request<Array<MusicSheet>>('get', `${this.basePath}/musicsheets`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Gets musicsheet by id
   *
   * @param musicsheetId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getMusicSheetById(musicsheetId: number, observe?: 'body', reportProgress?: boolean): Observable<MusicSheet>;
  public getMusicSheetById(musicsheetId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MusicSheet>>;
  public getMusicSheetById(musicsheetId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MusicSheet>>;
  public getMusicSheetById(musicsheetId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (musicsheetId === null || musicsheetId === undefined) {
      throw new Error('Required parameter musicsheetId was null or undefined when calling getMusicSheetById.');
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

    return this.httpClient.request<MusicSheet>('get', `${this.basePath}/musicsheet/${encodeURIComponent(String(musicsheetId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Gets all the comments for the specified musicsheet
   *
   * @param musicsheetId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getMusicSheetComments(musicsheetId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Comment>>;
  public getMusicSheetComments(musicsheetId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Comment>>>;
  public getMusicSheetComments(musicsheetId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Comment>>>;
  public getMusicSheetComments(musicsheetId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (musicsheetId === null || musicsheetId === undefined) {
      throw new Error('Required parameter musicsheetId was null or undefined when calling getMusicSheetComments.');
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

    return this.httpClient.request<Array<Comment>>('get', `${this.basePath}/musicsheet/${encodeURIComponent(String(musicsheetId))}/comments`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Gets the specified musicsheet data
   *
   * @param musicsheetId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getMusicSheetData(musicsheetId: number, observe?: 'body', reportProgress?: boolean): Observable<MusicSheetData>;
  public getMusicSheetData(musicsheetId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MusicSheetData>>;
  public getMusicSheetData(musicsheetId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MusicSheetData>>;
  public getMusicSheetData(musicsheetId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (musicsheetId === null || musicsheetId === undefined) {
      throw new Error('Required parameter musicsheetId was null or undefined when calling getMusicSheetData.');
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

    return this.httpClient.request<MusicSheetData>('get', `${this.basePath}/musicsheet/${encodeURIComponent(String(musicsheetId))}/data`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Removes like from specified user to specified musicsheet
   *
   * @param musicsheetId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public removeLike(musicsheetId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public removeLike(musicsheetId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public removeLike(musicsheetId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public removeLike(musicsheetId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (musicsheetId === null || musicsheetId === undefined) {
      throw new Error('Required parameter musicsheetId was null or undefined when calling removeLike.');
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

    return this.httpClient.request<any>('delete', `${this.basePath}/musicsheet/${encodeURIComponent(String(musicsheetId))}/like`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Updates a musicsheet by id
   *
   * @param body
   * @param musicsheetId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateMusicSheet(body: MusicsheetMusicsheetIdBody, musicsheetId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public updateMusicSheet(body: MusicsheetMusicsheetIdBody, musicsheetId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public updateMusicSheet(body: MusicsheetMusicsheetIdBody, musicsheetId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public updateMusicSheet(body: MusicsheetMusicsheetIdBody, musicsheetId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling updateMusicSheet.');
    }

    if (musicsheetId === null || musicsheetId === undefined) {
      throw new Error('Required parameter musicsheetId was null or undefined when calling updateMusicSheet.');
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

    return this.httpClient.request<any>('put', `${this.basePath}/musicsheet/${encodeURIComponent(String(musicsheetId))}`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}
