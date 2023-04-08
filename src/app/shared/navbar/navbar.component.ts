import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'co-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  public user!: User

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.user = await this.userService.getUserData()
  }

  @HostListener('window:storage', ['$event'])
  async onStorageChange(event: StorageEvent) {
    if (event.key === 'user') {
      this.user = await this.userService.getUserData()
    }
  }

  logout() {
    this.userService.logout()

    this.router.navigate(['auth', 'signin'])
  }

  isLogged(): Boolean {
    return this.userService.isLogged()
  }
}
