import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io";
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(
    private httpClient: HttpClient
  ) { }

  requestDirections(
    pointA: [number, number],
    pointB: [number, number]
  ): Observable<Object> {
    const url = [
      `https://api.mapbox.com/directions/v5/mapbox/driving/`,
      `${pointA[0]},${pointA[1]};${pointB[0]},${pointB[1]}`,
      `?steps=true&geometries=geojson&access_token=${environment.mapbox.accessToken}`,
    ].join('');

    return this.httpClient.get(url)
  }
}
