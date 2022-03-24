import { Feedbacks } from './../../models/feedbacks';
import { Complaints } from './../../models/complaints';
import { Router } from '@angular/router';
import { FeedbacksService } from './../../services/feedbacks.service';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-feedbacks',
   templateUrl: './feedbacks.component.html',
   styleUrls: ['./feedbacks.component.css'],
})
export class FeedbacksComponent implements OnInit {
   complaint: Complaints;
   feedback: Feedbacks = new Feedbacks();
   userFeedback: string = '';

   constructor(private _feedbacksService: FeedbacksService, private _router: Router) {
      this.complaint = _feedbacksService.complaint;
   }

   ngOnInit(): void {}

   sendFeedback() {
      console.log('inside feedback.component.ts', this.complaint.ticketId, this.complaint.customerEmail, this.userFeedback);
      this.feedback.customerEmail = this.complaint.customerEmail;
      this.feedback.ticketId = this.complaint.ticketId;
      this.feedback.feedback = this.userFeedback;
      this._feedbacksService.sendFeedback(this.feedback).subscribe((data) => {
         alert('feedback submitted successfully');
      });
   }
}
