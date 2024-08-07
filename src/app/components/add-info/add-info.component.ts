import { Component, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { Pcinfo } from 'src/app/pcinfo';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent {
  currentDate = new Date();
  @Output() addInfo = new EventEmitter();

  name: string;
  date = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
  city: string;
  phone: string;
  purchase: number;
  sale: number;
  showError: boolean = false;

  infoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('0[567][0-9]{8}')
    ]),
    purchase: new FormControl('', [
      Validators.required,
      Validators.pattern('[1-9]([0-9]?)+(\.[0-9]?)?')
    ]),
    sale: new FormControl('', [
      Validators.required,
      Validators.pattern('[1-9]([0-9]?)+(\.[0-9]?)?')
    ]),
  })

  onSubmit(): void{
    if(Number(this.sale) > Number(this.purchase)){
      this.showError = true;
      return;
    }  



    const data: Pcinfo = {
      name: this.name,
      date: this.date,
      city: this.city,
      phone: this.phone,
      purchase: this.purchase,
      sale: this.sale,
      societeCode: 'admin'
    }

    this.addInfo.emit(data);

    this.name = '';
    this.city = '';
    this.phone = '';
    this.purchase = null;
    this.sale = null;

    this.infoForm.reset();
  }

  get Name():  FormControl{
    return this.infoForm.get('name') as FormControl
  }

  get City():  FormControl{
    return this.infoForm.get('city') as FormControl
  }

  get Phone():  FormControl{
    return this.infoForm.get('phone') as FormControl
  }

  get Purchase():  FormControl{
    return this.infoForm.get('purchase') as FormControl
  }

  get Sale():  FormControl{
    return this.infoForm.get('sale') as FormControl
  }

}
