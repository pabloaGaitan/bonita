import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { HomeComponent } from './home/home.component';
import { ReviewClaimComponent } from './review-claim/review-claim.component';

import { AuthGuard } from './guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearSolicitudComponent,
    HomeComponent,
    ReviewClaimComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
