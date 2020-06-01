import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';
import {PopUpService} from './pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  region = '/assets/data/markers.json';

  constructor(private http: HttpClient,
              private popupService: PopUpService) {
  }

  makeCapitalMarkers(map: L.map): void {
    this.http.get(this.region).subscribe((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const marker = L.marker([lon, lat]);
        marker.bindPopup(this.popupService.makeCapitalPopup(c));
        marker.addTo(map);
      }
    });
  }
}
