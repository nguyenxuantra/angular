import {Component, NgZone, OnInit} from '@angular/core';
import * as goongjs from '@goongmaps/goong-js';
import {enviroment} from "../../../enviroments/enviroment";
import {NzNotificationService} from "ng-zorro-antd/notification";



@Component({
  selector: 'app-goong-map',
  standalone: true,
  imports: [],
  templateUrl: './goong-map.component.html',

})
export class GoongMapComponent implements OnInit{
  map: any;
  marker: any;
  clickPoint: any;
  left: any;
  top: any;

  constructor(private notify: NzNotificationService,
             private ngZone: NgZone) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(()=>{
      this.init();
    })
  }
  init(){
    setTimeout(()=>{
      this.loadMap();
    }, 100)
  }
  loadMap(){
    this.map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.8342, 21.0278], // Hà Nội
      zoom: 13,
      accessToken: enviroment.mapTitleKey
    });
  }
  rightClickMap(){
    this.map.on("click", (evt)=>{
      this.clickPoint =
    })
  }
}
