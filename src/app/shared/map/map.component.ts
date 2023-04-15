import { environment } from '../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'co-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';

  markers: mapboxgl.Marker[] = [];
  newMarkerMode: boolean = true;

  constructor() { }

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

    this.map.on('click', (event) => {
      if (this.isMarkerTooClose(event.lngLat)) {
        console.log('Marker is too close!');
      } else {
        this.addMarker(event.lngLat);
      }
    });
  }

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

  clearMap() {
    this.markers.forEach(marker => {
      marker.remove()
    })

    this.markers = []
  }

  removeMarker(markerId: number){
    console.log("Remover o: " + markerId )
  }

  add_line(coordenadas: number[][], cor: string = '#ff0000') {
    this.set_center(coordenadas);

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

  add_point(coordenadas: [number, number]) {
    this.map.on('load', () => {
      this.map.setCenter(coordenadas);

      const marker = new mapboxgl.Marker()
        .setLngLat(coordenadas)
        .addTo(this.map);
    });
  }

  // add_multi_points(coordenadas: number[][]) {
  //   this.map.on('load', () => {

  //     coordenadas.forEach(coordenada =>
  //       new mapboxgl.Marker()
  //         .setLngLat(coordenada)
  //         .addTo(this.map)
  //     );
  //   });
  // }

  set_center(coordenadas: number[][]) {
    let longs: number[] = [], lats: number[] = [];

    coordenadas.forEach(coordenada => {
      longs.push(coordenada[0]);
      lats.push(coordenada[1]);
    });

    const coordenada = {
      lon: (longs.reduce((soma, coo) => (soma + coo)) / longs.length),
      lat: (lats.reduce((soma, coo) => (soma + coo)) / lats.length)
    };

    this.map.setCenter(coordenada);
  }

}
