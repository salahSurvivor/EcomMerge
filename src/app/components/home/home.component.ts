import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor(private mainService: MainService){}

  totalProfits = 0;
  totalMoney = 0;
  monthProfits = 0;
  dayProfits = 0;
  username;

  ngOnInit(): void{
    this.mainService.getOrdersProfits().subscribe((dt) => {
      this.totalProfits = dt.totalProfits;
      this.totalMoney = dt.totalMoney;
      this.monthProfits = dt.monthProfits;
      this.dayProfits = dt.dayProfits;
    });
  }


}
