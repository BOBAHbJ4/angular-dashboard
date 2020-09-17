import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {MarkerService} from './_services/marker.service';
import {PopUpService} from './_services/pop-up.service';
import {HttpClientModule} from '@angular/common/http';
import {ShapeService} from './_services/shape.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [MarkerService,
    PopUpService,
    ShapeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
