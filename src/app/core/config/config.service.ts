import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

const apiRoutes: { [key: string]: string } = { 
  signin: '/auth/signin',
  signup: '/auth/signup',
  getuser: '/auth/user',

  agency: '/agency',
  routes: '/routes',
  trips: '/trips',
  stops: '/stops',
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor() { }

  public getURL(key: string): string{ 
    return API_URL + apiRoutes[key]
  }
}
