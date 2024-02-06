import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
const routes: Routes = [
  { path: 'create', component: MemberFormComponent, pathMatch: 'full' },
  { path: 'members', component: MemberComponent },
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  { path: '**', redirectTo: 'members' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
