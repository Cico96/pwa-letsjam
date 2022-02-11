import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authToken: AuthTokenService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authToken.getAuthToken();

    if(token) {

      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });

    }

    return next.handle(req);
  }
}
