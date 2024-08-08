import { Component, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-losses',
  templateUrl: './add-losses.component.html',
  styleUrls: ['./add-losses.component.css']
})
export class AddLossesComponent {
  @Input() lossesShow;
  currentDate = new Date();
  @Output() addLosses = new EventEmitter();

  name: string;
  price: number;
  date =  formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');

  lossesForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', [ 
      Validators.required,
      Validators.pattern("[1-9]([0-9]?)+(\.[0-9]?)?")
    ])
  })

  OnSubmit(): void{
    const data = {
      name: this.name,
      price: this.price,
      date: this.date,
      societeCode: 'admin'
    }

    this.addLosses.emit(data);

    this.name = '';
    this.price = null;

    this.lossesForm.reset();
  }

  get Name(): FormControl{
    return this.lossesForm.get('name') as FormControl;
  }

  get Price(): FormControl{
    return this.lossesForm.get('price') as FormControl;
  }
}
