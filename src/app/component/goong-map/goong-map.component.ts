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
  map: any;
  startMarker: any;
  endMarker: any;
  clickCount =0;

    ngOnInit() {
      // Khởi tạo map
      this.map = new goongjs.Map({
        container: 'map',
        style: 'https://tiles.goong.io/assets/goong_map_web.json',
        center: [105.8342, 21.0278], // Hà Nội
        zoom: 13,
        accessToken: enviroment.mapTitleKey
      });

  }

}
