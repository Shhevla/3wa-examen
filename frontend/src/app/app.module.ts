import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeCoverComponent } from './views/home/home-cover/home-cover.component';
import { HookComponent } from './views/home/hook/hook.component';
import { ValuationComponent } from './views/home/valuation/valuation.component';
import { InformationsComponent } from './views/home/informations/informations.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { HomePageComponent } from './views/home/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth.services';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { SigninComponent } from './views/auth/signin/signin.component';
import { MembersComponent } from './views/board-manager/management/members-list/members.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { HomeHeaderComponent } from './views/home/home-header/home-header.component';
import { MemberFormComponent } from './views/board-manager/management/members-list/member-form/member-form.component';
import { LocationsListComponent } from './views/board-manager/management/locations-list/locations-list.component';
import { ArchiveListComponent } from "./views/board-manager/management/archived-members-list/archive-list.component";
import { CalendarComponent } from './views/board-manager/calendar-manager/month-calendar/calendar.component';
import { CalendarManagerComponent } from './views/board-manager/calendar-manager/calendar-manager.component';
import { WeekCalendarComponent } from './views/board-manager/calendar-manager/week-calendar/week-calendar.component';
import { BoardManagerComponent } from './views/board-manager/board-manager.component';
import { CalendarModalComponent } from './views/board-manager/calendar-manager/month-calendar/calendar-modal/calendar-modal.component';
import { ModifyMemberComponent } from './views/board-manager/management/members-list/modify-member/modify-member.component';
import { PractitionersFormComponent } from './views/board-manager/management/members-list/practitioners-form/practitioners-form.component';
import { ModifyPractitionersComponent } from './views/board-manager/management/members-list/modify-practitioners/modify-practitioners.component';
import { ProfileComponent } from './views/board-manager/profile-manager/profile/profile.component';
import { ProfileManagerComponent } from './views/board-manager/profile-manager/profile-manager.component';
import { HomeModuleManagerComponent } from './views/board-manager/home-module-manager/home-module-manager.component';
import { InscriptionComponent } from './views/auth/inscription/inscription.component';
import { CabinetManagerComponent } from './views/board-manager/profile-manager/cabinet-manager/cabinet-manager.component';
import { CabinetOptionComponent } from './views/board-manager/profile-manager/cabinet-option/cabinet-option.component';
import { ManagementComponent } from './views/board-manager/management/management.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { CabinetComponent } from './views/board-manager/profile-manager/cabinet/cabinet.component';
import { ScheduleComponent } from './views/board-manager/schedule/schedule.component';
import { ScheduleDayComponent } from './views/board-manager/schedule/schedule-day/schedule-day.component';
import { ScheduleWeekComponent } from './views/board-manager/schedule/schedule-week/schedule-week.component';
import { ScheduleMonthComponent } from './views/board-manager/schedule/schedule-month/schedule-month.component';
import { ScheduleModalsComponent } from './views/board-manager/schedule/schedule-modals/schedule-modals.component';
import { TchatboxComponent } from './views/tchatbox/tchatbox.component';
import { TchatboxmessageComponent } from './views/tchatbox/tchatboxmessage/tchatboxmessage.component';
import { TchatboxPopupComponent } from './views/tchatbox/tchatbox-popup/tchatbox-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCoverComponent,
    HookComponent,
    ValuationComponent,
    InformationsComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    PageNotFoundComponent,
    SignupComponent,
    SigninComponent,
    MembersComponent,
    HomeHeaderComponent,
    MemberFormComponent,
    LocationsListComponent,
    ArchiveListComponent,
    CalendarComponent,
    CalendarManagerComponent,
    WeekCalendarComponent,
    BoardManagerComponent,
    CalendarModalComponent,
    ModifyMemberComponent,
    PractitionersFormComponent,
    ModifyPractitionersComponent,
    ProfileComponent,
    ProfileManagerComponent,
    HomeModuleManagerComponent,
    InscriptionComponent,
    CabinetManagerComponent,
    CabinetOptionComponent,
    ManagementComponent,
    CabinetComponent,
    ScheduleComponent,
    ScheduleDayComponent,
    ScheduleWeekComponent,
    ScheduleMonthComponent,
    ScheduleModalsComponent,
    TchatboxComponent,
    TchatboxmessageComponent,
    TchatboxPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    BnNgIdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
