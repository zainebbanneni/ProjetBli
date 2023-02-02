import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
const a   = 'Content-Type';
const b = 'Content-Length';
const c = 'Host';
const e = 'Accept';
const f ='Accept-Encoding';
const g = 'Connection';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
        authReq = req.clone({ headers: req.headers.set(a, 'application/json' ) });
        authReq = req.clone({ headers: req.headers.set(b, '<calculated when request is sent>' ) });
        authReq = req.clone({ headers: req.headers.set(c, '<calculated when request is sent>' ) });
        authReq = req.clone({ headers: req.headers.set(e, '*/*' ) });
        authReq = req.clone({ headers: req.headers.set(f, 'gzip, deflate, br' ) });
        authReq = req.clone({ headers: req.headers.set(g, 'keep-alive' ) });
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];