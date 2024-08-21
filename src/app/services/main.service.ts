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

  getOrdersProfits(): Observable<any>{
    let params = { sCode: 'admin' };
    return this.http.get<any>('http://localhost:3000/ordersProfits', { params });
  }
  //#endregion Orders

  //#region Losses
  getLosses(): Observable<Losses[]>{
    let params = { sCode: 'admin' };
    return this.http.get<Losses[]>(this.apiUrlLosses, { params });
  }

  addLosses(data: Losses): Observable<Losses>{
    return this.http.post<Losses>(this.apiUrlLosses, data);
  }  

  deleteLosses(nb: number): Observable<Losses>{
    return this.http.delete<Losses>(this.apiUrlLosses+ nb);
  }
  //#endregion Losses

  //#region Purchases
  getPurchases(): Observable<Purchases[]>{
    let params = { sCode: 'admin' };
    return this.http.get<Purchases[]>(this.Url, { params });
  }

  addPurchases(data: Purchases): Observable<Purchases>{
    return this.http.post<Purchases>(this.Url, data);
  }   

  deletePurchase(nb: number): Observable<Purchases>{
    return this.http.delete<Purchases>(this.Url+ nb);
  }
  //#endregion Purchases

}
