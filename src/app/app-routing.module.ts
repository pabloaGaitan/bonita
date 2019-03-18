import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { HomeComponent } from './home/home.component';
import { ReviewClaimComponent } from './review-claim/review-claim.component';

import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'new-claim/:taskId', component: CrearSolicitudComponent, canActivate: [AuthGuard] },
  { path: 'review-claim/:taskId/:caseId', component: ReviewClaimComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
