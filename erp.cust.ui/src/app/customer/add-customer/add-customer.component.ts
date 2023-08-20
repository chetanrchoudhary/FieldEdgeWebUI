import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { CustomerService } from 'src/service/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
  providers: [CustomerService]
})
export class AddCustomerComponent {

  customerForm: FormGroup;
  id: number = 0;
  isAddMode: boolean = false;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) {


    this.customerForm = this.formBuilder.group({
      id: ['0', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', { validators: [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')], updateOn: 'change'}],
      balance: ['', Validators.required],
      phone_Number: ['', Validators.required],
      gender: ['',],
      country_Code: [''],
      salutation: [''],
      initials: [''],
      firstname_Ascii: [''],
      firstname_Country_Rank: [''],
      firstname_Country_Frequency: [''],
      lastname_Ascii: [''],
      lastname_Country_Rank: [''],
      lastname_Country_Frequency: [''],
      password: [''],
      country_Code_Alpha: [''],
      country_Name: [''],
      primary_Language_Code: [''],
      primary_Language: [''],
      currency: [''],
      partitionKey: [''],
      rowKey: [''],
      timestamp: [new Date().toISOString()],
      eTag: [{}]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    if (!this.isAddMode) {
      this.customerService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.customerForm.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.customerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.customerForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.addCustomer();
    } else {
      this.updateCustomer();
    }
  }

  private addCustomer() {
    this.customerService.add(this.customerForm.value)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.toastrService.success('Customer added Successfully!');
        },
        error: error => {
          console.log(error);
          this.toastrService.error('Error occured!');
          this.loading = false;
        }
      });
  }

  private updateCustomer() {
    this.customerService.update(this.customerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastrService.success('Customer updated Successfully!');
          this.loading = false;
        },
        error: error => {
          this.toastrService.error('Error occured!');
          this.loading = false;
        }
      });
  }
}
