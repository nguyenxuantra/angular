import {Component, OnInit} from '@angular/core';
import * as goongjs from '@goongmaps/goong-js';
import {enviroment} from "../../../enviroments/enviroment";

@Component({
  selector: 'app-goong-map',
  standalone: true,
  imports: [],
  templateUrl: './goong-map.component.html',
})
export class GoongMapComponent implements OnInit{


  ngOnInit() {

    const map = new goongjs.Map({
      container: 'map',
      style:'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.8342, 21.0278],
      zoom: 12,
      accessToken: enviroment.mapTitleKey
    })
    map.on('load', ()=>{
      new goongjs.Marker()
        .setLngLat([105.8342, 21.0278])
        .addTo(map);
    })
  }
}
