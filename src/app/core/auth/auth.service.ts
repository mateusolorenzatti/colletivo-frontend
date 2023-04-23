import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { UserService } from '../entities/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private userService: UserService
  ) { }

  authenticate(username: string, password: string) {
    return this.http.post<any>(
      this.config.getURL('signin'),
      { username, password },
      { observe: 'response' }
    )
      .pipe(tap(res => {
        const authToken = res.body['accessToken'];
        this.userService.login(authToken);
        this.userService.getUser(username)
          .subscribe(
            res => this.userService.saveUserData(res),
            err => console.log(err)
          )

        console.log(`User ${username} authenticated with token ${authToken}`);
      }));
  }
}
