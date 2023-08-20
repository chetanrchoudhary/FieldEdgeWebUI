import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, finalize } from 'rxjs';
import { LoaderService } from 'src/service/loader.service';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

     return next.handle(req).pipe(
           finalize(() => this.loaderService.hide()),
     );
  }
}