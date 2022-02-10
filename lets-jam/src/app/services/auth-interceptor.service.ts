import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authToken: AuthTokenService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authToken.getAuthToken();

    if(token) {

      req = req.clone({
        setHeaders: {Authorization: `Authorization token ${token}`}
      });

    }

    return next.handle(req).pipe(
      catchError( (err) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            //do something
          }
        }
        return throwError(err);
      })
    )
  }
}
