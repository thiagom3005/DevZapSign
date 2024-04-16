import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './company/company.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { DocComponent } from './doc/doc.component';
import { DocDetailComponent } from './doc/doc-detail/doc-detail.component';
import { DocFormComponent } from './doc/doc-form/doc-form.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserFormComponent } from './user/user-form/user-form.component';

const routes: Routes = [
  { path: '', component: CompanyComponent },
  { path: 'companies', component: CompanyComponent },
  { path: 'companies/new', component: CompanyFormComponent },
  { path: 'companies/:id', component: CompanyDetailComponent },
  { path: 'companies/:id/edit', component: CompanyFormComponent },
  { path: 'docs', component: DocComponent },
  { path: 'docs/new', component: DocFormComponent },
  { path: 'docs/:id', component: DocDetailComponent },
  { path: 'docs/:id/edit', component: DocFormComponent },
  { path: 'users', component: UserComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'users/:id/edit', component: UserFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

export default routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
