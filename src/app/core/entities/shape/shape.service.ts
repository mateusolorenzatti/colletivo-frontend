import { HttpClient, HttpParams } from '@angular/common/http';
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

  public findAll(shape_id: string): Observable<Shape[]> {    
    let params
    
    if(shape_id){ 
      console.log(shape_id)
      params = new HttpParams().set('shape_id', shape_id)
    }else{
      params = new HttpParams()
    }
    
    return this.http.get<Shape[]>(
      this.configService.getURL('shapes'),
      { params }
    )
  }

  public create(shape: Shape): Observable<Shape>{
    return this.http.post<any>(
      this.configService.getURL('shapes'),
      shape
    )
  }
}
