import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service'; 

@Component({
  selector: 'app-erp',
  templateUrl: './erp.component.html',
  styleUrls: ['./erp.component.css']
})
export class ErpComponent{
  lossesShow: boolean = false;
  purchasesShow: boolean = false;
  successShow: boolean = false;
  successText: string;
  
  constructor(private mainService: MainService){}

  toggleLosses(): void{
    this.lossesShow = !this.lossesShow;
  }

  toggleSuccess(): void{
    this.successShow = false;
  }

  togglePurchases(): void{
    this.purchasesShow = !this.purchasesShow;
  }

  AddInfo(data): void{
    this.mainService.addOrder(data).subscribe((res) => {
      if (res) {
        this.successText = 'Order';
        this.successShow = true;
      }
    });
  }

}
