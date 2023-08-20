import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';

const routes: Routes = [
  {path: '', redirectTo: 'customers', pathMatch: 'full' },
  {path: 'customers', component: CustomerListComponent },
  {path: 'add-customer', component: AddCustomerComponent },
  { path: 'edit-customer/:id', component: AddCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
