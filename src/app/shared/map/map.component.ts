import { environment } from '../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

import { v4 as uuidv4 } from 'uuid'
import * as mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { MapService } from 'src/app/core/map/map.service';
import { StopTimeDraft } from 'src/app/core/entities/stop-time/stop-time-draft';

@Component({
  selector: 'co-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map
  style = 'mapbox://styles/mapbox/streets-v11'

  geocoder!: MapboxGeocoder

  markers: mapboxgl.Marker[] = [];
  newMarkerMode: boolean = true;

  directions: any[] = []

  @Input('editable') editable: Boolean = false

  constructor( ) { }

  ngOnInit() {
    this.initializeMap()
  }

  initializeMap() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-51.3433, -29.2225],
      zoom: 12
    });

    // this.geocoder = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   mapboxgl
    // });

    // // *************
    // this.geocoder.on('result', ($event) => {
    //   const { result } = $event;
    //   this.geocoder.clear();
    //   console.log('*********', result)
    // })

    // this.geocoder.addTo(this.map)

    // this.map.on('click', (event) => {
    //   if (this.isMarkerTooClose(event.lngLat)) {
    //     console.log('Marker is too close!');
    //   } else {
    //     this.addMarker(event.lngLat);
    //   }
    // });
  }

  /*

  addMarker(lngLat: mapboxgl.LngLat) {
    let newMarker: mapboxgl.Marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    console.log('Marker added to:', lngLat)

    newMarker.on('dragend', () => {
      console.log('Marker dragged to:', newMarker.getLngLat());
    });

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <p> Stop #${this.markers.length + 1} </p> 
        <a class="btn btn-sm btn-danger marker-remove" id="m-${this.markers.length + 1}">
          <i tabindex="0" class="fa fa-trash mx-3"></i>
        </a>`)
      .addTo(this.map);
    
    newMarker.setPopup(popup)    

    this.markers.push(newMarker)

    console.log(this.markers)

    this.newMarkerMode = false; // switch to popup mode
  }

  isMarkerTooClose(lngLat: mapboxgl.LngLat): boolean {
    const minDistance = 25; // minimum distance in meters between markers
    for (const marker of this.markers) {
      const distance = marker.getLngLat().distanceTo(lngLat);
      if (distance < minDistance) {
        return true;
      }
    }
    return false;
  }

  removeMarker(markerId: number){
    console.log("Remover o: " + markerId )
  }
  
  */

  clearMap() {
    this.markers.forEach(marker => {
      marker.remove()
    })

    this.markers = []
  }

  addLine(coordenadas: number[][], cor: string = '#ff0000') {
    // this.set_center(coordenadas);

    this.map.on('load', () => {
      this.map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': coordenadas
          }
        }
      });

      this.map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': cor,
          'line-width': 5
        }
      });
    });
  }

  addPoint(
    parameters: {
      id: string,
      coordinates: [number, number],
      popupInfo?: { code: string, description: string },
      callbackFunc: Function
    }
  ) {

    console.log(parameters.id + ' - ' + parameters.popupInfo?.description)

    this.map.on('load', () => {
      this.map.setCenter(parameters.coordinates)

      let newMarker = new mapboxgl.Marker()
        .setLngLat(parameters.coordinates)
        .addTo(this.map)

      if (parameters.popupInfo) {
        const popup = new mapboxgl.Popup({ offset: 25, className: '3' })
          .setHTML(`
              <p> Parada #${parameters.popupInfo.code} </p> 
              <p> ${parameters.popupInfo.description} </p>`)
          .addTo(this.map);

        newMarker.setPopup(popup)
        newMarker.togglePopup()

        newMarker.getElement().addEventListener('click', () => parameters.callbackFunc(parameters.id))

        this.markers.push(newMarker)
      }
    })
  }

  addDirections(
    pointA: [number, number], 
    pointB: [number, number],
    mapService: MapService
  ): void {

    mapService.requestDirections( pointA, pointB ).subscribe(
      (res: any) => {
        const data = res.routes[0];
        const route = data.geometry.coordinates;
        const uuid = uuidv4()

        console.log(route)

        this.map.addSource(uuid, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          }
        });
  
        this.map.addLayer({
          id: uuid,
          type: 'line',
          source: uuid,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': 'red',
            'line-width': 5
          }
        });

        this.directions.push({
          data: res,
          pointA: pointA,
          pointB: pointB,
          id: uuid
        })

        console.log(this.directions)
  
        // this.wayPoints = route;
        // this.map.fitBounds([route[0], route[route.length - 1]], {
        //   padding: 100
        // })
      }
    )
  }

  // setCenter(coordenadas: number[][]) {
  //   let longs: number[] = [], lats: number[] = [];

  //   coordenadas.forEach(coordenada => {
  //     longs.push(coordenada[0]);
  //     lats.push(coordenada[1]);
  //   });

  //   const coordenada = {
  //     lon: (longs.reduce((soma, coo) => (soma + coo)) / longs.length),
  //     lat: (lats.reduce((soma, coo) => (soma + coo)) / lats.length)
  //   };

  //   this.map.setCenter(coordenada);
  // }

  recreateDirections(
    removedStopTime: StopTimeDraft,
    isEdgePoint: Boolean
  ): { pointA: [number, number], pointB: [number, number], isEdgePoint: Boolean } {
    const removedStopCoordinates = [
      removedStopTime.stop?.stop_lon,
      removedStopTime.stop?.stop_lat
    ]

    let newPointA: [number, number] = [0,0], newPointB: [number, number] = [0,0]
    
    this.directions.forEach(direction => {
      if(
        (direction.pointA[0] == removedStopCoordinates[0] && direction.pointA[1] == removedStopCoordinates[1])
        ||
        (direction.pointB[0] == removedStopCoordinates[0] && direction.pointB[1] == removedStopCoordinates[1])
      ){
        // console.log("Remover essa diretion: " + direction)
        this.map.removeLayer(direction.id)
        this.directions = this.directions.filter(dir => dir.id !== direction.id)

        // If it is not a edge point, it means the route must be reorganized
        if(!isEdgePoint){
          // If it is the point A, the new point B assumes the point B
          if(direction.pointA[0] == removedStopCoordinates[0] && direction.pointA[1] == removedStopCoordinates[1]){
            newPointB = direction.pointB
          }
          
          // If it is the point B, the new point A assumes the point A
          if(direction.pointB[0] == removedStopCoordinates[0] && direction.pointB[1] == removedStopCoordinates[1]){
            newPointA = direction.pointA
          }

          // This way, a new route will be defined when this is returned to the caller
        }
        
        console.log(this.directions)
      }
    })

    return { pointA: newPointA, pointB: newPointB, isEdgePoint }
  }
}
