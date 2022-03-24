import { EngineersService } from './../../services/engineers.service';
import { Feedbacks } from './../../models/feedbacks';
import { FeedbacksService } from './../../services/feedbacks.service';
import { Complaints } from './../../models/complaints';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagersService } from './../../services/managers.service';
import { Managers } from './../../models/managers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
   selector: 'app-managers',
   templateUrl: './managers.component.html',
   styleUrls: ['./managers.component.css'],
})
export class ManagersComponent implements OnInit {
   manager: Managers = new Managers();
   managerLoggedIn: string;
   managerloginStatus: boolean = false;
   viewComplaints: boolean = false;
   viewFeedbacks: boolean = false;
   managerPincode: string;
   complaints: Complaints[] = [];
   feedbacks: Feedbacks[] = [];
   assignEngineersButton: boolean = true;
   assignEngineersDropdown: boolean = false;
   engineerEmails: string[] = [];
   selectedEngineer: string;

   constructor(
      private _managersService: ManagersService,
      private _router: Router,
      private _activatedRoute: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private _feedbacksService: FeedbacksService,
      private _engineersService: EngineersService
   ) {}

   loginForm = this._formBuilder.group({
      managerEmail: '',
      managerPassword: '',
      engineerEmail: '',
   });

   ngOnInit(): void {}

   registerManager(): any {
      console.log('inside registerManager() !');
      this._managersService.registerManager(this.manager).subscribe(() => {
         alert('Regstration Completed Successfully !');
      });
   }

   validateManager(): any {
      this._managersService.validateManager(this.loginForm.value).subscribe((data) => {
         if (data != null) {
            this.managerLoggedIn = this.loginForm.value['managerEmail'];
            this.managerloginStatus = true;
            this.managerPincode = data.managerPincode;
            console.log('Manager Exists : reached safely !', this.managerPincode);
         } else {
            console.log('Manager does not exists !');
         }
      });
   }

   getAllComplaintsByPincode() {
      console.log('Inside manager.components.ts --- ', this.managerPincode);

      this.viewComplaints = true;
      this._managersService.getAllComplaintsByPincode(this.managerPincode).subscribe((data) => {
         console.log('data = complaints fetched based on pincode', data);

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
   assignEngineers() {
      this.assignEngineersButton = false;
      this.assignEngineersDropdown = true;
      this._engineersService.getAllEngineerMails().subscribe((data) => {
         console.log('data = all Engineer Emails', data);
         this.engineerEmails = data;
      });
   }
   engineersDuty(complaint: Complaints) {
      this._managersService.statusUpdate(complaint.ticketId, complaint.customerEmail, this.selectedEngineer).subscribe((data) => {
         if (data) {
            alert('Engineer Assigned');
         } else {
            alert('complaint already assigned');
         }
      });
   }
   engineerSelected(event: any) {
      this.selectedEngineer = event.target.value;
   }
}
