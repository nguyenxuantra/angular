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
  marker: any;
    ngOnInit() {
      // Khởi tạo map
      this.map = new goongjs.Map({
        container: 'map',
        style: 'https://tiles.goong.io/assets/goong_map_web.json',
        center: [105.8342, 21.0278], // Hà Nội
        zoom: 13,
        accessToken: enviroment.mapTitleKey
      });
      this.map.on('load', () => {
        this.maker();
      })
  }
  maker(){

    const popup = new goongjs.Popup({ offset: 25}).setText('Day la Ha Noi')
    // Tạo marker mặc định (không cần custom element)
    this.marker = new goongjs.Marker()
      .setLngLat([105.8342, 21.0278])
      .setPopup(popup)
      .addTo(this.map);
  }
}
