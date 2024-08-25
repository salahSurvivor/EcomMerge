import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pcinfo } from 'src/app/pcinfo';
import { MainService } from 'src/app/services/main.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
import * as ExcelJS from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnChanges{
  p: number = 1;
  count: number = 6;
  id: number;
  successShow: boolean = false;
  nameEdit: string;
  cityEdit: string;
  dateEdit: string;
  phoneEdit: string;
  purchaseEdit: number;
  saleEdit: number;
  items: Pcinfo[] = [];
  filters: Pcinfo[] = [];
  @Input() search: any;
  @Input() dt: string;  
  //checked: boolean;
  confirmedOrderDate;
  confirmedOrderLocation;
  timeStart;
  timeEnd;
  orderUpdate: Pcinfo = {
    name: '',
    city: '',
    date: '',
    phone: '',
    purchase: 0,
    sale: 0,
    status: '',
    isConfirmed: false,
    orderDetails: [],
    societeCode: ''
  };
  orderDetail = {
    location: null,
    date: '',
    timeStart: '',
    timeEnd: '',
    description: ''
  };
  visible: boolean = false;
  orderDetailVisible: boolean = false;
  date: Date;
  endDate: Date;
  itemsCopy;
  totalRecords = 0;

  constructor(private mainService: MainService,
    private confirmationService: ConfirmationService
  ){}

  confirmOrderDetails(data) {
    this.orderDetail = data?.orderDetails  || null;
    this.orderDetail.date = this.orderDetail.date ? formatDate(new Date(this.orderDetail.date), 'MM/dd/yyyy', 'en-US') : '';
    this.orderDetailVisible = true;
  }

  showDialog(item) {
    this.orderUpdate = null;
    this.orderUpdate = item;
    this.visible = true;
  }

  ngOnInit(): void{
    this.visible = false;
    this.mainService.getDataForDelivery().subscribe((items) => {
      this.items = items;
      this.itemsCopy = this.items;
      this.calculRecap(this.items);
      this.items.sort((a, b) => b._id - a._id);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const srch = changes['search'];
    const filter = changes['dt'];
    if(this.dt == 'clear'){
      this.ngOnInit();
      return;
    }
    else if(filter) {
      this.mainService.getOrders().subscribe((items) => {
        this.items = items.filter((i) => {
          if (!i.date || !this.dt) {
            return;
          }
          formatDate(i.date, 'dd/MM/yyyy', 'en-US') == formatDate(this.dt, 'dd/MM/yyyy', 'en-US');
        });
      })

    }
    else if(srch){
      this.mainService.getOrders().subscribe((items) => {
          this.items = items.filter((i) => i.phone.includes(this.search))
          this.items.sort((a, b) => b._id - a._id)
        }
      )
    }
  }

  updateInfo(): void{
    if (this.visible)
      this.orderUpdate.status = 'Canceled';

    this.visible = false;
    this.mainService.updatePurchase(this.orderUpdate, this.orderUpdate._id).subscribe(() => {
        this.ngOnInit();
    });

    this.successShow = true;
  }

  toggleSuccess(): void{
    this.successShow = !this.successShow;
  }

  getId(order): void{
    this.orderUpdate = order;
  }

  calculRecap(data){
    if (data && data.length > 0) {
      this.totalRecords = data.length;
    }
  }

  getSeverity(status) {
    switch (status.toLowerCase()) {
      case 'canceled':
        return 'danger';
      case 'confirmed':
        return 'info';
      case 'in progress':
        return 'warning';
      case 'delivered':
        return 'success';
      default: return null;
    }
  }

  confirm(event: Event, data) {
    this.confirmationService.confirm({
        target: event.target,
        message: 'Is this order successfully delevered?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.orderUpdate = data;
            this.orderUpdate.status = 'Delivered';
            this.updateInfo();
        },
    });
  }

  //#region filter
  clear(): void{
    this.date = null;
    this.endDate = null;
    this.search = null;
    this.items = this.itemsCopy;
  }

  filter(): void {
    this.items = this.itemsCopy;
    if (this.date || this.endDate) {
        this.items = this.items.filter((i) => {
    
          // Ensure dates are present
          if (!i.date || !this.date || !this.endDate) {
            return false;
          }
    
          // Convert dates to comparable format
          const orderDate = new Date(i.date);
          const startDate = new Date(this.date);
          const endDate = new Date(this.endDate);
    
          // Check if order date is within the range
          return orderDate >= startDate && orderDate <= endDate;
        });
    }
    if(this.search){
      this.items = this.items.filter((i) => i.phone.includes(this.search))
      this.items.sort((a, b) => b._id - a._id)
    }
  }
  //#endregion filter

  //#region excel
  downloadExel(): void {
    let time = formatDate(new Date(), 'shortTime', 'en-Us');
    let date = formatDate(new Date(), 'fullDate', 'en-Us');
    let fullDate = date + ' ' + time;
    let workbook = new Workbook();

    // Set cell styles
    const headerStyle: Partial<ExcelJS.Style> = {
      font: { bold: true },
      alignment: { horizontal: 'center' },
      border: {
        top: { style: 'thin' as ExcelJS.BorderStyle },
        left: { style: 'thin' as ExcelJS.BorderStyle },
        bottom: { style: 'thin' as ExcelJS.BorderStyle },
        right: { style: 'thin' as ExcelJS.BorderStyle }
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4ec3cf' } // Specify the hex color code here
      }
    };

    // Set column widths
    const cellStyle: Partial<ExcelJS.Style> = {
      border: {
        top: { style: 'thin' as ExcelJS.BorderStyle },
        left: { style: 'thin' as ExcelJS.BorderStyle },
        bottom: { style: 'thin' as ExcelJS.BorderStyle },
        right: { style: 'thin' as ExcelJS.BorderStyle }
      }
    };

    let worksheet = workbook.addWorksheet('Voyage');

    worksheet.getCell('A1').value = 'Delivery';
    worksheet.getCell('A1').font = { name: 'Open Sans Extrabold', family: 4, size: 24, underline: 'none', bold: true };
    worksheet.getCell('F1').value = 'Date : ' + fullDate;
    worksheet.mergeCells('A1:C1');
    worksheet.mergeCells('F1:H1');
    worksheet.addRow([]);
    //let titleRow = worksheet.addRow(['Voyages']);
    //titleRow.font = { family: 4, size: 19, bold: true };
    let header = ["Number", "Product Name", "Date", "City", "Phone number", "Price", "Status"];

    const head = worksheet.addRow(header);
    //style the Row header
    head.eachCell((cell) => {
      cell.font = headerStyle.font;
      cell.alignment = headerStyle.alignment;
      cell.border = headerStyle.border;
      cell.fill = headerStyle.fill
    })

    // Apply column widths
    header.forEach((width, columnIndex) => {
      const column = worksheet.getColumn(columnIndex + 1);
      column.width = 25;
    });

    for (let x1 of this.items) {
      if (x1.date) {
        x1.date = formatDate(x1.date, 'dd/MM/yyyy', 'en-US');
      }

      let data = {
        number: x1.number,
        name: x1.name,
        date: x1.date,
        city: x1.city,
        phone: x1.phone,
        purchase: x1.purchase,
        status: x1.status,
      }

      let x2 = Object.keys(data);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y]);
      }
      const vy = worksheet.addRow(temp);
      //style the Rows
      vy.eachCell((cell) => {
        cell.font = cellStyle.font;
        cell.alignment = cellStyle.alignment;
        cell.border = cellStyle.border;
      })
    }

    let fname = "Delivery";

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });

  }
  //#endregion excel



}
