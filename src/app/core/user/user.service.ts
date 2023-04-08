import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { TokenService } from '../token/token.service';
import { User } from './user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private token: TokenService
  ) { }

  signUp(user: User) {
    return this.http.post<any>(
      this.config.getURL('signup'),
      user,
      { observe: 'response' }
    );
  }

  getUser(username: string) {
    return this.http.get<User>(
      this.config.getURL('getuser'),
      {
        params: { username }
      }
    )
  }

  saveUserData(user: User): void {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  getUserData(): User{
    return JSON.parse(window.localStorage.getItem('user') || '{}') satisfies User
  }

  login(authToken: string) {
    this.token.setToken(authToken)
  }

  logout() {
    this.token.removeToken();

    window.localStorage.removeItem('user');
  }

  isLogged(): Boolean {
    return this.token.hasToken();
  }
}
