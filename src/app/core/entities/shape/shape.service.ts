import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs';
import { Shape } from './shape';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  public findAll(): Observable<Shape[]> {
    return this.http.get<Shape[]>(
      this.configService.getURL('shapes')
    )
  }

  public create(shape: Shape): Observable<Shape>{
    return this.http.post<any>(
      this.configService.getURL('shapes'),
      shape
    )
  }
}
