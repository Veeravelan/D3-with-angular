import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataModel } from './data/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'd3framework';
  data: Observable<DataModel>;
  constructor(private http: HttpClient) {
    this.data = this.http.get<DataModel>('assets/data.json');
  }
}
