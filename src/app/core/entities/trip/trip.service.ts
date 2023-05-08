import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs';
import { Trip } from './trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  public findAll(): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      this.configService.getURL('trips')
    )
  }

  public create(trip: Trip): Observable<Trip>{
    return this.http.post<any>(
      this.configService.getURL('trips'),
      trip
    )
  }
}
