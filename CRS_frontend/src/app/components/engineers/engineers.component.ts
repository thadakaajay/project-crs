import { FeedbacksService } from './../../services/feedbacks.service';
import { Feedbacks } from './../../models/feedbacks';
import { Complaints } from './../../models/complaints';
import { Engineers } from './../../models/engineers';
import { Router, ActivatedRoute } from '@angular/router';
import { EngineersService } from './../../services/engineers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
   selector: 'app-engineers',
   templateUrl: './engineers.component.html',
   styleUrls: ['./engineers.component.css'],
})
export class EngineersComponent implements OnInit {
   engineer: Engineers = new Engineers();
   engineerLoggedIn: string;
   ticketIds: number[] = [];
   engineerLoginStatus: boolean = false;
   complaints: Complaints[] = [];
   feedbacks: Feedbacks[] = [];
   viewComplaints: boolean = false;
   viewFeedbacks: boolean = false;
   newEngineerStatus: string;

   constructor(
      private _engineersService: EngineersService,
      private _router: Router,
      private _activatedRoute: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private _feedbacksService: FeedbacksService
   ) {}

   loginForm = this._formBuilder.group({
      engineerEmail: '',
      engineerPassword: '',
   });

   ngOnInit(): void {}

   registerEngineer(): any {
      console.log('inside registerManager() !');
      this._engineersService.registerEngineer(this.engineer).subscribe(() => {
         alert('Registration Completed Successfully !');
      });
   }

   validateEngineer(): any {
      this._engineersService.validateEngineer(this.loginForm.value).subscribe((data) => {
         if (data != null) {
            this.engineerLoggedIn = this.loginForm.value['engineerEmail'];
            console.log('Engineer Exists : reached safely with associated ticket Ids -- ', data);
            this.ticketIds = data;
            this.engineerLoginStatus = true;
         } else {
            console.log('Engineer does not exists !');
         }
      });
   }

   getAllComplaintsByTicketIds() {
      this.viewComplaints = true;
      this._engineersService.getAllComplaintsByTicketIds(this.ticketIds).subscribe((data) => {
         console.log('Successfully fetched Complaints for Engineers !', data);
         this.complaints = data;
      });
   }

   getAllFeedbacks() {
      this.viewFeedbacks = true;
      this._feedbacksService.getAllFeedbacks().subscribe((data) => {
         console.log('data = feedbacks fetched based on email', data);
         this.feedbacks = data;
      });
   }
   updateStatus(complaint: Complaints) {
      console.log('new status', this.newEngineerStatus);

      this._engineersService.updateStatus(complaint.ticketId, this.newEngineerStatus).subscribe((data) => {
         console.log('data added successfully', data);
      });
   }
   newStatus(event: any) {
      this.newEngineerStatus = event.target.value;
   }
}
