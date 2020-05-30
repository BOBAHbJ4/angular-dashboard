import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {HttpClient} from '@angular/common/http';
import {ShapeService} from '../_services/shape.service';

const iconUrl = 'assets/data/marker-icon.png';
const iconDefault = L.icon({
    iconUrl,
    iconSize: [51, 61],
    iconAnchor: [12, 41],
    popupAnchor: [12, -41],
    tooltipAnchor: [16, -28]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

    private map;
    private states;
    json;

    constructor(private http: HttpClient,
                private shapeService: ShapeService) {
    }

    ngAfterViewInit(): void {
        this.initMap();
        this.shapeService.getStateShapes().subscribe(states => {
            this.states = states;
            this.initStatesLayer();
        });
    }

    private initMap(): void {
        this.map = L.map('map', {
            center: [53.516667, 28.033333],
            zoom: 6.5
        });
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        const marker = L.marker([52.22, 23.54]).addTo(this.map);
        const marker2 = L.marker([55.20395325785898, 30.201416015625004]).addTo(this.map);
        const marker3 = L.marker([52.429222277955134, 31.003417968749996]).addTo(this.map);
        const marker4 = L.marker([53.70321053273598, 23.829345703125]).addTo(this.map);
        const marker5 = L.marker([53.91081008725409, 27.564697265624996]).addTo(this.map);
        const marker6 = L.marker([53.91728101547621, 30.333251953124996]).addTo(this.map);

        tiles.addTo(this.map);
        marker.bindPopup('<b>Hello!</b><br>I am a popup.');
        marker2.bindPopup('<b>Hello!</b><br>I am a popup.');
        marker3.bindPopup('<b>Hello!</b><br>I am a popup.');
        marker4.bindPopup('<b>Hello!</b><br>I am a popup.');
        marker5.bindPopup('<b>Hello!</b><br>I am a popup.');
        marker6.bindPopup('<b>Hello!</b><br>I am a popup.').openPopup();
    }

  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#6DB65B'
      }),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
        })
      )
    });

    this.map.addLayer(stateLayer);
  }

  private highlightFeature(e)  {
    const layer = e.target;
    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042',
    });
  }

  private resetFeature(e)  {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B'
    });
  }
}
