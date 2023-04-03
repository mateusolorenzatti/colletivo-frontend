import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { TokenService } from '../token/token.service';
import { User } from './user';

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

  login(authToken: string) {
    this.token.setToken(authToken)
  }

  logout() {
    this.token.removeToken();
  }

  isLogged(): Boolean {
    return this.token.hasToken();
  }
}
