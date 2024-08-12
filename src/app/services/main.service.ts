import { Injectable } from '@angular/core';
import { Pcinfo } from '../pcinfo';
import { Losses } from '../losses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchases } from '../purchases';

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
  private apiUrlLosses = ' http://localhost:3000/losses/';
  private Url = 'http://localhost:3000/purchases/';

  constructor(private http: HttpClient) { }

  //#region Orders
  addOrder(data: Pcinfo): Observable<Pcinfo> {
    return this.http.post<Pcinfo>(this.apiUrl, data);
  }
  //#endregion Orders

  //#region Losses
  addLosses(data: Losses): Observable<Losses> {
    return this.http.post<Losses>(this.apiUrlLosses, data);
  }
  //#endregion Losses

  //#region Purchases
  addPurchases(data: Purchases): Observable<Purchases> {
    return this.http.post<Purchases>(this.Url, data);
  }
  //#endregion Purchases

}
