import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { StopTime } from './stop-time';
import { StopTimeCreate } from './stop-time-create';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StopTimeService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  public findAll(): Observable<StopTime[]> {
    return this.http.get<StopTime[]>(
      this.configService.getURL('stopTimes')
    )
  }

  public create(stopTime: StopTimeCreate): Observable<StopTime>{
    return this.http.post<StopTime>(
      this.configService.getURL('stopTimes'),
      stopTime
    )
  }
}
