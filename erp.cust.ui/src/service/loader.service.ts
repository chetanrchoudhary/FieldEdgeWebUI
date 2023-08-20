import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  constructor(
    private ngxService: NgxUiLoaderService
  ) { }

  show() {
    this.ngxService.start();
  }

  hide() {
    this.ngxService.stop();
  }
}