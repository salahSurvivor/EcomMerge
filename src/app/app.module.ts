import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErpComponent } from './components/erp/erp.component';
import { AddInfoComponent } from './components/add-info/add-info.component';
import { AddLossesComponent } from './components/add-losses/add-losses.component';

const appRoutes: Routes = [
  { 
    path: '', 
    component: AppComponent,
  },
  {
    path: 'erp',
    component: ErpComponent
  },
];

@NgModule({
  declarations: [
    AppComponent, 
    ErpComponent,
    AddInfoComponent,
    AddLossesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
