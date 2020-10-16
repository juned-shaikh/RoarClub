
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available

    if (sessionStorage.getItem("tokenObject")) {
      let currentUser = sessionStorage.getItem("jwtoken");
      if (currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: currentUser
          }
        });
      }
    }
    return next.handle(request);
  }
}