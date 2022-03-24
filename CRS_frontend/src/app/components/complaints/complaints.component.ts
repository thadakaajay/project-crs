import { FeedbacksService } from './../../services/feedbacks.service';
import { ComplaintsService } from './../../services/complaints.service';
import { CustomersService } from './../../services/customers.service';
import { Router } from '@angular/router';
import { Complaints } from './../../models/complaints';
import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'app-complaints',
   templateUrl: './complaints.component.html',
   styleUrls: ['./complaints.component.css'],
})
export class ComplaintsComponent implements OnInit {
   complaint: Complaints = new Complaints();
   complaints: Complaints[] = [];
   viewComplaints: boolean = false;
   sentFeedback: boolean = false;

   constructor(private _router: Router, private _complaintsService: ComplaintsService, private _customersService: CustomersService, private _feedbacksService: FeedbacksService) {
      this.complaint.customerEmail = _customersService.getCustomerLoggedIn();
   }

   ngOnInit(): void {}

   registerComplaint(): any {
      console.log('inside registerComplaint () !');
      this._complaintsService.registerComplaint(this.complaint).subscribe(() => {
         alert('Successfully Registered !');
      });
   }

   getAllComplaintsByEmail(customerEmail: string) {
      this.viewComplaints = true;
      console.log('in complaint.component.ts ==', customerEmail);

      this._complaintsService.getAllComplaintsByEmail(customerEmail).subscribe((data) => {
         console.log('data = complaints fetched based on email', data);

         this.complaints = data;
      });
   }

   sendComplaintDetails(complaint: Complaints): any {
      this._feedbacksService.sendComplaintDetails(complaint);
   }
}
