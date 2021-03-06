import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { DarkModeService } from './common/services/dark-mode.service';
import { AuthService } from './common/services/auth.service';
import { UnknownRouteComponent } from './unknown-route/unknown-route.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProductsComponent } from './products/products.component';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrdersComponent } from './orders/orders.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { UsersComponent } from './users/users.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderSearchComponent } from './order-search/order-search.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { AppInterceptor } from './common/app.interceptor';
import { UserTableComponent } from './user-table/user-table.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { AppPaginatorIntl } from './common/app-paginator-intl';
import { SessionExpiredDialogComponent } from './session-expired-dialog/session-expired-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UnknownRouteComponent,
    ProductsComponent,
    ConfirmDialogComponent,
    ProductDialogComponent,
    OrdersComponent,
    OrderDialogComponent,
    UsersComponent,
    UserDialogComponent,
    LoadingSpinnerComponent,
    OrderSearchComponent,
    OrderTableComponent,
    ProductSearchComponent,
    ProductTableComponent,
    UserTableComponent,
    UserSearchComponent,
    SessionExpiredDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (darkModeService: DarkModeService) => () => darkModeService.enableIfSaved(),
      deps: [DarkModeService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.autoLogin(),
      deps: [AuthService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: MatPaginatorIntl, useValue: AppPaginatorIntl()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
