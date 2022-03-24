import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './components/customers/customers.component';
import { ManagersComponent } from './components/managers/managers.component';
import { EngineersComponent } from './components/engineers/engineers.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { AdminComponent } from './components/admin/admin.component';

const routers: Routes = [
   { path: 'admin', component: AdminComponent },
   { path: 'customers', component: CustomersComponent },
   { path: 'customers/registerComplaints', component: ComplaintsComponent },
   { path: 'feedbacks/sendFeedback', component: FeedbacksComponent },
   { path: 'engineers', component: EngineersComponent },
   { path: 'managers', component: ManagersComponent },
];

@NgModule({
   declarations: [AppComponent, CustomersComponent, ManagersComponent, EngineersComponent, ComplaintsComponent, FeedbacksComponent, AdminComponent],
   imports: [RouterModule.forRoot(routers), BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
