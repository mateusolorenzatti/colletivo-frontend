import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import { Route } from './route';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  public findAll(): Observable<Route[]> {
    return this.http.get<Route[]>(
      this.configService.getURL('routes')
    )
  }

  public create(route: Route): Observable<Route>{
    return this.http.post<any>(
      this.configService.getURL('routes'),
      route
    )
  }

}
