import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolsComponent } from './tools/tools.component';
import { ArticlesComponent } from './articles/articles.component';
import { EventsComponent } from './events/events.component';
const routes: Routes = [
  { path: 'create', component: MemberFormComponent, pathMatch: 'full' },
  { path: 'members', component: MemberComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'events', component: EventsComponent},

  { path: '', redirectTo: 'members', pathMatch: 'full' },
  { path: ':id/edit', pathMatch:'full', component: MemberFormComponent },

  { path: '**', redirectTo: 'members' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
