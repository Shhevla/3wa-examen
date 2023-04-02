import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/shared/services/call-api.service';
import { MembersService } from 'src/app/shared/services/members.service';
import { UserProfile } from 'src/app/shared/models/profile.model';

@Component({
  selector: 'app-home-module-manager',
  templateUrl: './home-module-manager.component.html',
  styleUrls: ['./home-module-manager.component.scss']
})
export class HomeModuleManagerComponent implements OnInit {
  
  user: UserProfile | null = null;
  constructor(private callApi: CallApiService, private router: Router, private membersService: MembersService) { }

  async ngOnInit() {
    await this.callApi.getLoginData().then(data => {
      if (data)
        this.user = data;
    });
  }

  travelToModule(moduleName: string) {
    if (moduleName === "board") {
      this.router.navigate([`/${moduleName}/${this.membersService.cityLocation}/calendar`]);
    }
    this.router.navigate(['/' + moduleName]);
  }

}
