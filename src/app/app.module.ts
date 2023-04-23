import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { RequestInterceptor } from './core/auth/request.interceptor';
import { HomeModule } from './home/home.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { StopTimeModule } from './stop-time/stop-time.module';
import { RouteModule } from './route/route.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    AuthModule,
    NavbarModule,
    HomeModule,
    RouteModule,
    StopTimeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
