import { Component, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-add-purchases',
  templateUrl: './add-purchases.component.html',
  styleUrls: ['./add-purchases.component.css']
})
export class AddPurchasesComponent {
  @Input() purchasesShow: boolean;
  @Output() addP = new EventEmitter();
  qurrentDate = new Date();

  nameP: string;
  priceP: number;
  quantityP: number;
  totalP: number;
  dateP = formatDate(this.qurrentDate, 'yyyy-MM-dd', 'en-US');
  username;

  purchasesForm = new FormGroup({
    nameP: new FormControl('', Validators.required),
    priceP: new FormControl('', [
      Validators.required,
      Validators.pattern('[1-9]([0-9]?)+(\.[0-9]?)?')
    ]),
    quantityP: new FormControl('', [
      Validators.required,
      Validators.pattern('[1-9]+([0-9]?)?')
    ])
  });
  
  constructor(
    private jwt: JwtHelperService,
  ){}

  ngOnInit() {
    const token = this.jwt.decodeToken(localStorage.getItem('token'));
    this.username = token.name;
  }
  
  onSubmit(): void{
    const data = {
      nameP: this.nameP,
      priceP: this.priceP,
      quantityP: this.quantityP,
      totalP: this.priceP * this.quantityP,
      dateP: this.dateP,
      societeCode: this.username
    } 

    this.addP.emit(data);

    this.nameP = "";
    this.priceP = null;
    this.quantityP = null;
    this.totalP = null;

    this.purchasesForm.reset();
  }

  get NameP(): FormControl {
    return this.purchasesForm.get('nameP') as FormControl;
  }

  get PriceP(): FormControl{
    return this.purchasesForm.get('priceP') as FormControl;
  }

  get QuantityP(): FormControl{
    return this.purchasesForm.get('quantityP') as FormControl;
  }


}
