import { Injectable } from '@angular/core';
import { Pcinfo } from '../pcinfo';
import { Losses } from '../losses';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchases } from '../purchases';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
  ) {}

   //#region Orders
  getUsername(){
    const token = this.jwt.decodeToken(localStorage.getItem('token'));
    return token?.name || '';
  }

   getOrders2(){
    let params = { sCode: this.getUsername() };
    return this.http.get<Pcinfo[]>(this.apiUrl, { params });
  }

  getOrders(): Observable<Pcinfo[]>{
    let params = { sCode: this.getUsername() };
    return this.http.get<Pcinfo[]>(this.apiUrl, { params });
  }

  addOrder(data: Pcinfo): Observable<Pcinfo>{
    return this.http.post<Pcinfo>(this.apiUrl, data);
  }

  getOrdersProfits(): Observable<any>{
    let params = { sCode: this.getUsername() };
    return this.http.get<any>('http://localhost:3000/ordersProfits', { params });
  }

  updatePurchase(pcinfo: Pcinfo, nb): Observable<Pcinfo>{
    return this.http.put<Pcinfo>(this.apiUrl+ nb, pcinfo, httpOptions);
  }

  getDataForDelivery(): Observable<Pcinfo[]>{
    let params = { sCode: this.getUsername() };
    return this.http.get<Pcinfo[]>('http://localhost:3000/getDataForDelivery', { params });
  }
  //#endregion Orders

  //#region Losses
  getLosses(): Observable<Losses[]>{
    let params = { sCode: this.getUsername() };
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
    let params = { sCode: this.getUsername() };
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
