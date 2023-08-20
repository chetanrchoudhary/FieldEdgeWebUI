import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "src/model/customer";
import { environment } from "src/environment";
import { ApiPaths } from "src/api-paths";

@Injectable()
export class CustomerService {

    constructor(private httpClient: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    get(): Observable<Customer[]> {
        let url = `${environment.apiBaseUrl + ApiPaths.customers}`;
        return this.httpClient.get<Customer[]>(url, this.httpOptions);
    }

    getById(id: number): Observable<Customer> {
        let url = `${environment.apiBaseUrl + ApiPaths.getCustomerById + id}`;
        return this.httpClient.get<Customer>(url, this.httpOptions);
    }

    add(customer: Customer): Observable<any> {
        let url = `${environment.apiBaseUrl + ApiPaths.addCustomer}`;
        var data = JSON.stringify(customer);
        return this.httpClient
          .post<Customer>(url,
            data,
            this.httpOptions
          );
      }

      update(customer: Customer): Observable<any> {
        let url = `${environment.apiBaseUrl + ApiPaths.updateCustomer}`;
        var data = JSON.stringify(customer);
        return this.httpClient
          .post<Customer>(url,
            data,
            this.httpOptions
          );
      }

      remove(id: string): Observable<any> {
        let url = `${environment.apiBaseUrl + ApiPaths.removeCustomer + id}`;
        return this.httpClient.delete<any>(url, this.httpOptions);
    }
}