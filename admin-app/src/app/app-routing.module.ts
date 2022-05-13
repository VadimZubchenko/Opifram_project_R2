import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OnlyLoggedOffUserGuardGuard } from './common/guards/only-logged-off-user-guard.guard';
import { OnlyLoggedInUserGuard } from './common/guards/only-logged-in-user.guard';
import { UnknownRouteGuardGuard } from './common/guards/unknown-route-guard.guard';
import { UnknownRouteComponent } from './unknown-route/unknown-route.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [OnlyLoggedOffUserGuardGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [OnlyLoggedInUserGuard] },
  { path: '**', component: UnknownRouteComponent, canActivate: [UnknownRouteGuardGuard] },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
