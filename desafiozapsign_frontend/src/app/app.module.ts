import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { HomeComponent } from './home/home.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { DocComponent } from './doc/doc.component';
import { DocDetailComponent } from './doc/doc-detail/doc-detail.component';
import { DocFormComponent } from './doc/doc-form/doc-form.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserFormComponent } from './user/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    HomeComponent,
    CompanyDetailComponent,
    CompanyFormComponent,
    DocComponent,
    DocDetailComponent,
    DocFormComponent,
    UserComponent,
    UserDetailComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
