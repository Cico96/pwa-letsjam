import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {AuthTokenService} from './auth-token.service';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authToken: AuthTokenService, private router: Router, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authToken.getAuthToken();

    if (token) {

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        }
      });

    }
    return next.handle(req).pipe(catchError(x => this.handleAuthError(x)))
    //   .pipe(catchError((err: HttpErrorResponse, caught:Observable<any>) => {
    //     if (err.status == 401) {
    //       this.router.navigate(['login']);
    //     }
    //     return caught;
    //   }
    // ));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) { 
        //navigate /delete cookies or whatever
        this.router.navigate(['login']);
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
}
}
