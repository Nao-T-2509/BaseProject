import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { DatePipe } from '@angular/common';
import { SecretInterceptor } from './core/interceptor/secret.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [
    DatePipe, 
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, 
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: SecretInterceptor, multi: true },
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
