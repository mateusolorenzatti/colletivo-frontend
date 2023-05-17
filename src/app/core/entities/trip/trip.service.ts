import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs';
import { TripCreate } from './trip-create';
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

  public findOne(id: string): Observable<Trip> {
    return this.http.get<Trip>(
      this.configService.getURL('trips') + '/' + id 
    )
  }

  public create(trip: TripCreate): Observable<Trip>{
    return this.http.post<Trip>(
      this.configService.getURL('trips'),
      trip
    )
  }
}
