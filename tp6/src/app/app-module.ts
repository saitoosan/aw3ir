import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';

import { App } from './app';
import { MeteoComponent } from './meteo/meteo.component';
import { MeteoDetailComponent } from './meteo-detail/meteo-detail';
import { AppRoutingModule } from './app-routing-module';

@NgModule({
  declarations: [
    App,
    MeteoComponent,
    MeteoDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,          // nécessaire pour {{ cityList | json }}
  ],
  providers: [DatePipe],
  bootstrap: [App],
})
export class AppModule {}






