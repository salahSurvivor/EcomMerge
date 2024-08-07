import { Injectable } from '@angular/core';
import { Pcinfo } from '../pcinfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class MainService {
  private apiUrl = 'http://localhost:3000/orders/';

  constructor(private http: HttpClient) { }

  //#region Orders
  addOrder(data: Pcinfo): Observable<Pcinfo>{
    return this.http.post<Pcinfo>(this.apiUrl, data);
  }
  //#endregion Orders

 
}
