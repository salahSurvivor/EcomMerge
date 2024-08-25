import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';



import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ErpComponent } from './components/erp/erp.component';
import { ShowErpComponent } from './components/show-erp/show-erp.component';
import { AddInfoComponent } from './components/add-info/add-info.component';
import { AddLossesComponent } from './components/add-losses/add-losses.component';
import { AddPurchasesComponent } from './components/add-purchases/add-purchases.component';
import { LossesPurchasesComponent } from './components/losses-purchases/losses-purchases.component';
import { ShowLossesComponent } from './components/show-losses/show-losses.component';
import { ShowPurchasesComponent } from './components/show-purchases/show-purchases.component';
import { HomeErpComponent } from './components/home-erp/home-erp.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { DeliveryComponent } from './components/delivery/delivery.component';


const appRoutes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
  },
  {
    path: 'addErp',
    component: HomeErpComponent
  },
  {
    path: 'erp',
    component: ErpComponent
  },
  {
    path: 'losses-purchasses',
    component: LossesPurchasesComponent
  },
  {
    path: 'delivery',
    component: DeliveryComponent
  },
];

@NgModule({
  declarations: [
    AppComponent, 
    ErpComponent,
    AddInfoComponent,
    AddLossesComponent,
    AddPurchasesComponent,
    HeaderComponent,
    LossesPurchasesComponent,
    ShowLossesComponent,
    ShowPurchasesComponent,
    HomeComponent,
    ShowErpComponent,
    HomeErpComponent,
    DeliveryComponent
  ],
  imports: [
    CheckboxModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    InputMaskModule,
    CalendarModule,
    TableModule,
    ButtonModule,
    TagModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
