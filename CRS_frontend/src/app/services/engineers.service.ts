import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Engineers } from '../models/engineers';
import { Complaints } from '../models/complaints';

@Injectable({
   providedIn: 'root',
})
export class EngineersService {
   updatedStatus = {};
   private regEngineerUrl: string = 'http://localhost:8080/engineers/addEngineer';
   private logEngineerUrl: string = 'http://localhost:8080/engineers/login';
   private getAllEngineerMailsUrl: string = 'http://localhost:8080/engineers/getAllEngineerMails';

   private getAllComplaintsByTicketIdUrl: string = 'http://localhost:8080/complaints/getAllComplaintsByTicketIds';
   private updateStatusUrl: string = 'http://localhost:8080/engineerDuty/updateStatus';

   constructor(private _httpClient: HttpClient) {}

   registerEngineer(engineer: Engineers) {
      return this._httpClient.post<Engineers>(this.regEngineerUrl, engineer);
   }

   validateEngineer(value: any) {
      return this._httpClient.post<number[]>(this.logEngineerUrl, value);
   }

   getAllEngineerMails(): Observable<string[]> {
      return this._httpClient.get<string[]>(this.getAllEngineerMailsUrl);
   }
   getAllComplaintsByTicketIds(ticketIds: number[]): Observable<Complaints[]> {
      console.log(ticketIds);
      return this._httpClient.post<Complaints[]>(this.getAllComplaintsByTicketIdUrl, ticketIds);
   }

   updateStatus(ticketId: number, status: string) {
      this.updatedStatus = {
         ticketId: ticketId,
         status: status,
      };

      return this._httpClient.post(this.updateStatusUrl, this.updatedStatus);
   }
}
