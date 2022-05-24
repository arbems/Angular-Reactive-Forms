import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    const params = new HttpParams();

    const url = `${this.baseUrl}`;

    return this.http.get<any[]>(url, { params })
      .pipe<any[]>(map((data: any) => data));
  }

}
