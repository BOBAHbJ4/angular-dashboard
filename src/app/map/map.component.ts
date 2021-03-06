import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { MarkerService } from '../_services/marker.service';
import { ShapeService } from '../_services/shape.service';

// add custom marker
const iconUrl = 'assets/data/marker-icon.png';
const iconDefault = L.icon({
  iconUrl,
  iconSize: [31, 41],
  iconAnchor: [12, 41],
  popupAnchor: [12, -41],
  tooltipAnchor: [16, -28]
});
L.Marker.prototype.options.icon = iconDefault;

// colors for legend
const getColor = d => {
  return d > 10 ? '#05fc15' :
    d > 1 ? '#fcec05' :
      '#fc0505';
};

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit {

  private map;
  private states;
  private legend: any;

  constructor(private http: HttpClient,
              private markerService: MarkerService,
              private shapeService: ShapeService) {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
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
    }).addTo(this.map);

    // begin legend
    this.legend = L.control({position: 'bottomright'});

    this.legend.onAdd = map => {

      // tslint:disable-next-line:one-variable-per-declaration prefer-const
      let div = L.DomUtil.create('div', 'info legend'),
        // tslint:disable-next-line:prefer-const
        grades = [0, 1, 10],
        // tslint:disable-next-line:prefer-const
        labels = [],
        from, to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
          '<i style="background:' + getColor(from + 1) + '"></i> ' +
          from + '&thinsp;' + (to ? '&frasl;' + '&thinsp;' + to : '+') + '(не раб./раб.)'); // 	&thinsp; -- узкий пробел; &frasl; -- дробь
      }

      div.innerHTML = labels.join('<br>');
      return div;
    };
    this.legend.addTo(this.map);
    // end legend
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
