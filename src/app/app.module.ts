import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErpComponent } from './components/erp/erp.component';
import { AddInfoComponent } from './components/add-info/add-info.component';
import { AddLossesComponent } from './components/add-losses/add-losses.component';
import { AddPurchasesComponent } from './components/add-purchases/add-purchases.component';
import { HeaderComponent } from './components/header/header.component';
import { LossesPurchasesComponent } from './components/losses-purchases/losses-purchases.component';
import { ShowLossesComponent } from './components/show-losses/show-losses.component';
import { ShowPurchasesComponent } from './components/show-purchases/show-purchases.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
  },
  {
    path: 'erp',
    component: ErpComponent
  },
  {
    path: 'losses-purchasses',
    component: LossesPurchasesComponent
  }
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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
