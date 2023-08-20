import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/model/customer';
import { CustomerService } from 'src/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  customers: Customer[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  ngOnInit(): void {
    this.fetchCustomers();
  }

  addCustomer(): void {
    this.router.navigate(['/add-customer']);
  }

  editCustomer(id: string): void {
    this.router.navigate([`${'/edit-customer/' + id}`]);
  }

  fetchCustomers(): void {
    this.customerService.get().subscribe(res => {
      if (res) {
        this.customers = res;
        this.toastr.success('List successfully loaded');
      }
    });
  }

  removeCustomer(id: string): void {
    this.customerService.remove(id).subscribe(res => {
      this.toastr.success('Deleted Successfully');
      this.customers = this.customers.filter(item => item.id != id);
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fetchCustomers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchCustomers();
  }
}
