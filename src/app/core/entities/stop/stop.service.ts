import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs';
import { Stop } from './stop';

@Injectable({
  providedIn: 'root'
})
export class StopService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  public findAll(): Observable<Stop[]> {
    return this.http.get<Stop[]>(
      this.configService.getURL('stops')
    )
  }
}
