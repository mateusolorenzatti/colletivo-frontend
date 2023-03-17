import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(    
    private http: HttpClient,
    private config: ConfigService
  ){ }

  signUp(user: User){
    return this.http.post<any>(
      this.config.getURL('signup'), 
      user, 
      { observe: 'response'} 
    );
  }
}
