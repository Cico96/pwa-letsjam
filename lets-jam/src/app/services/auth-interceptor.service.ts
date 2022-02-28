import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthTokenService } from './auth-token.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authToken: AuthTokenService, private router: Router, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authToken.getAuthToken();

    if(token) {

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin":"*",
        }
      });

    }
    return next.handle(req);
  }
}
