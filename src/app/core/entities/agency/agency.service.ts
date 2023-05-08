import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import { Agency } from './agency';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  public findAll(): Observable<Agency[]> {
    return this.http.get<Agency[]>(
      this.configService.getURL('agency')
    )
  }
}
