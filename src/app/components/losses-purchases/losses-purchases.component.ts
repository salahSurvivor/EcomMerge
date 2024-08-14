import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-losses-purchases',
  templateUrl: './losses-purchases.component.html',
  styleUrls: ['./losses-purchases.component.css']
})
export class LossesPurchasesComponent {
  losses: string;
  purchases: string;
  ls: string;
  pr: string;
  successShow: boolean = false;
  storageLosses: number = Number(localStorage.getItem('losses'));

  filter(): void{
    this.ls = this.losses;
    this.pr = this.purchases;
  }

  clear(): void{
    this.losses = null;
    this.purchases = null;
    this.ls = 'clear';
    this.pr = 'clear';
    console.log(this.ls, this.pr);
  }

  toggleSuccess(): void{
    this.successShow = !this.successShow;
  }

  deletePurchase(){
    this.successShow = true;
  }

  deleteLosses(){
    this.successShow = true;
  }

}
