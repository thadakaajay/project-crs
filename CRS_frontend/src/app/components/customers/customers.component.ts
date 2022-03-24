import { CustomersService } from './../../services/customers.service';
import { Customers } from './../../models/customers';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
   selector: 'app-customers',
   templateUrl: './customers.component.html',
   styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
   customer: Customers = new Customers();
   customerLoggedIn: String;
   constructor(private _customersService: CustomersService, private _router: Router, private _activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder) {}

   loginForm = this._formBuilder.group({
      customerEmail: '',
      customerPassword: '',
   });

   ngOnInit(): void {}

   registerCustomer(): any {
      console.log('inside registerCustomer () !');

      this._customersService.registerCustomer(this.customer).subscribe(() => {
         alert('Registration Completed Successfully !');
      });
   }

   validateCustomer(): any {
      this._customersService.validateCustomer(this.loginForm.value).subscribe((data) => {
         if (data) {
            this.customerLoggedIn = this.loginForm.value['customerEmail'];
            this._customersService.setCustomerLoggedIn(this.customerLoggedIn.toString());

            console.log('Customer Exists : reached safely !', this.customerLoggedIn);

            this._router.navigateByUrl('/customers/registerComplaints');
         } else {
            console.log('Customer does not exists !');
         }
      });
   }
}
