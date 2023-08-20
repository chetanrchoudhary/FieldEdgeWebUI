import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoaderService } from 'src/service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  constructor() {
  }
}