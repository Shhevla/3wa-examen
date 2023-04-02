import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { LocationGuardService } from './shared/services/location-guard.service';
import { RoleGuardService } from './shared/services/role-guard.service';
import { InscriptionComponent } from './views/auth/inscription/inscription.component';
import { SigninComponent } from './views/auth/signin/signin.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { BoardManagerComponent } from './views/board-manager/board-manager.component';
import { CalendarComponent } from './views/board-manager/calendar-manager/month-calendar/calendar.component';
import { HomeModuleManagerComponent } from './views/board-manager/home-module-manager/home-module-manager.component';
import { ArchiveListComponent } from './views/board-manager/management/archived-members-list/archive-list.component';
import { MemberFormComponent } from './views/board-manager/management/members-list/member-form/member-form.component';
import { MembersComponent } from './views/board-manager/management/members-list/members.component';
import { CabinetManagerComponent } from './views/board-manager/profile-manager/cabinet-manager/cabinet-manager.component';
import { CabinetOptionComponent } from './views/board-manager/profile-manager/cabinet-option/cabinet-option.component';
import { ProfileManagerComponent } from './views/board-manager/profile-manager/profile-manager.component';
import { ScheduleComponent } from './views/board-manager/schedule/schedule.component';
import { HomePageComponent } from './views/home/home-page/home-page.component';
import { TchatboxComponent } from './views/tchatbox/tchatbox.component';
import { TchatboxmessageComponent } from './views/tchatbox/tchatboxmessage/tchatboxmessage.component';

const routes: Routes = [
  { path: "home", component: HomePageComponent },
  { path: "", component: HomePageComponent},
  { path: "auth/signup", component: SignupComponent},
  { path: "auth/signin", component: SigninComponent},
  { path: "auth/inscription", component: InscriptionComponent},
  { path: "board", canActivate: [AuthGuardService], component: HomeModuleManagerComponent},
  { path: "profile", canActivate: [AuthGuardService], component: ProfileManagerComponent},
  { path: "profile/cabinet", canActivate: [AuthGuardService], component: CabinetManagerComponent},
  { path: "profile/cabinet/option", canActivate: [AuthGuardService], component: CabinetOptionComponent},
  { path:"inscription", component: InscriptionComponent},
  { path: "board/:city",
    canActivate: [LocationGuardService],
    component: BoardManagerComponent,
    children: [
      { path: "calendar", canActivate: [AuthGuardService], component: ScheduleComponent},
      { path: "archive", canActivate: [AuthGuardService, RoleGuardService], component: ArchiveListComponent},
      { path: "location", canActivate: [AuthGuardService, RoleGuardService], component: MembersComponent},
    ]
  },
  { path: "members/new", canActivate: [AuthGuardService], component: MemberFormComponent},
  { path: '**', pathMatch: 'full', component: HomePageComponent },
  {path: "tchat", component: TchatboxComponent},
  {path: "tchatMessage", component: TchatboxmessageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
