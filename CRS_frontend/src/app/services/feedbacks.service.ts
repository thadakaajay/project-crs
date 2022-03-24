import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Complaints } from './../models/complaints';
import { HttpClient } from '@angular/common/http';
import { Feedbacks } from './../models/feedbacks';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class FeedbacksService {
   complaint: Complaints;
   private sendFeedbackUrl: string = 'http://localhost:8080/feedbacks/addFeedback';

   private getAllFeedbacksUrl: string = 'http://localhost:8080/feedbacks/getAllFeedbacks';
   constructor(private _httpClient: HttpClient, private _router: Router) {}

   sendComplaintDetails(complaint: Complaints) {
      this.complaint = complaint;
      this._router.navigateByUrl('/feedbacks/sendFeedback');
   }

   getAllFeedbacks(): Observable<Feedbacks[]> {
      return this._httpClient.get<Feedbacks[]>(this.getAllFeedbacksUrl);
   }
   sendFeedback(feedback: Feedbacks) {
      console.log('inside feedback.service.ts', feedback.customerEmail, feedback.feedback, feedback.ticketId);

      return this._httpClient.post<Feedbacks>(this.sendFeedbackUrl, feedback);
   }
}
