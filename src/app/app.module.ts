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
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { LoginGuard } from './guards/login.guard';


const appRoutes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'addErp',
    component: HomeErpComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'erp',
    component: ErpComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'losses-purchasses',
    component: LossesPurchasesComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'delivery',
    component: DeliveryComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  }, 
];

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    HomeComponent,
    ErpComponent,
    ShowErpComponent,
    AddInfoComponent,
    AddLossesComponent,
    AddPurchasesComponent,
    LossesPurchasesComponent,
    ShowLossesComponent,
    ShowPurchasesComponent,
    HomeErpComponent,
    DeliveryComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CheckboxModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
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
  providers: [
    ConfirmationService, 
    MessageService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
