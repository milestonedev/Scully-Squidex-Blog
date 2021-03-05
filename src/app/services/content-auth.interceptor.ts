import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { SquidexConfig } from './squidex.config';

@Injectable()
export class ContentAuthInterceptor implements HttpInterceptor {

  constructor( private readonly config: SquidexConfig) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.includes('squidex')){
      return this.invokeInternal(request, next, true);
    }else{
      return next.handle(request);
    }
  }

  private invokeInternal(req: HttpRequest<any>, next: HttpHandler, retry: boolean): Observable<HttpEvent<any>> {
    return this.getToken(next).pipe(
        switchMap(token => {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });

            return next.handle(req).pipe(
                catchError((error: HttpErrorResponse) => {
                    if ((error.status === 403 || error.status === 401) && retry) {
                        clearBearerToken();

                        return this.invokeInternal(req, next, false);
                    } else {
                        return throwError(error);
                    }
                })
            );
        })
    );
  }
    private getToken(next: HttpHandler) {
      // Check if we have already a bearer token in local store.
      const cachedToken = getBearerToken();

      if (cachedToken) {
          return of(cachedToken);
      }

      // tslint:disable-next-line: max-line-length
      const body = `grant_type=client_credentials&scope=squidex-api&client_id=${this.config.clientId}&client_secret=${this.config.clientSecret}`;

      const tokenRequest = new HttpRequest('POST', this.config.buildUrl('identity-server/connect/token'), body, {
          responseType: 'json',
          headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded'
          })
      });

      return next.handle(tokenRequest).pipe(
          filter(x => x instanceof HttpResponse),
          map((response: HttpResponse<any>) => {
              const token = response.body.access_token;

              // Cache the bearer token in the local store.
              setBearerToken(token);

              return token;
          }));
  }
}

function getBearerToken() {
  return localStorage.getItem('token');
}

function setBearerToken(token: string) {
  localStorage.setItem('token', token);
}

function clearBearerToken() {
  localStorage.removeItem('token');
}
