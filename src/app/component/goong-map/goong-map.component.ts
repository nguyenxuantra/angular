import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import * as goongjs from '@goongmaps/goong-js';
import {enviroment} from "../../../enviroments/enviroment";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NgTemplateOutlet} from "@angular/common";



@Component({
  selector: 'app-goong-map',
  standalone: true,
  imports: [
    NzSpinComponent,
    NgTemplateOutlet
  ],
  templateUrl: './goong-map.component.html',
  styleUrls: ['./goong-map.component.scss']
})
export class GoongMapComponent implements AfterViewInit{
  map: any;
  marker: any;
  clickPoint: any;
  left: any;
  top: any;
  fromMaker: any;
  toMaker: any;
  routePolygon: any;
  private contextHandle: any;
  private clickMapHandle: any;
  @ViewChild('popupRightClick') popupRightClick!: ElementRef<HTMLDivElement>;
  constructor(private notify: NzNotificationService,
             private ngZone: NgZone) {}

  ngAfterViewInit() {
      this.loadMap();
  }
  loadMap(){
    this.map = new goongjs.Map({
      container: 'g-map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [105.8342, 21.0278], // Hà Nội
      zoom: 13,
      accessToken: enviroment.mapTitleKey
    });
    this.map.on('load',()=>{
      this.registerMapEvent();
    } )
  }
  registerMapEvent(){
    this.ngZone.runOutsideAngular(()=>{
      this.map.on('contextmenu',(evt:any)=>{
        const x = evt.point.x;
        const y = evt.point.y;

        this.ngZone.run(()=>{
          this.clickPoint = {lng: evt.lngLat.lng, lat:evt.lngLat.lat};
          this.left = `${x}px`;
          this.top = `${y}px`;
        })
        this.showPopup();
        console.log("day la", this.clickPoint);
      })

      // ẩn popup thì nhấn bât kì chỗ nào
      this.clickMapHandle = ()=>{
        this.ngZone.run(()=>{this.hidePopup()})
      }
      this.map.on('click',this.clickMapHandle)
      // this.map.on('dragend',this.clickMapHandle)
    })
  }
  hidePopup(){
    this.popupRightClick.nativeElement.style.display = 'none';
  }
  showPopup(){
    this.popupRightClick.nativeElement.style.display = 'block';
    this.popupRightClick.nativeElement.style.left = this.left;
    this.popupRightClick.nativeElement.style.top = this.top;
  }
  onFromHere(){
    this.hidePopup();
    if(this.fromMaker){
      this.fromMaker.remove();
      this.fromMaker = null;
    }
    this.fromMaker = this.createMarker('assets/image/icon-location-from.png', this.clickPoint).addTo(this.map);
    if(this.fromMaker && this.toMaker){
      this.drawRoute(this.clickPoint, {lng:this.toMaker.getLngLat().lng, lat:this.toMaker.getLngLat().lat});
    }
  }
  onToHere(){
    this.hidePopup();
    if(this.toMaker){
      this.toMaker.remove();
      this.toMaker = null;
    }
    this.toMaker = this.createMarker('assets/image/icon-location-to.png', this.clickPoint).addTo(this.map);
    if(this.fromMaker && this.toMaker){
      this.drawRoute({lng: this.fromMaker.getLngLat().lng, lat: this.fromMaker.getLngLat().lat},
        {lng: this.clickPoint.lng, lat: this.clickPoint.lat},)
    }
  }
  onClearRoute(){
    this.hidePopup();
    if(this.fromMaker){
      this.fromMaker.remove();
      this.fromMaker = null;
    }
    if(this.toMaker){
      this.toMaker.remove();
      this.toMaker = null;
    }
  }
  createMarker(iconUrl: string, point: {lng: number, lat:number}){
    const el = document.createElement("div");
    el.className = 'my-marker';
    const img = document.createElement("img");
    img.src = iconUrl;
    img.style.width = '36px';
    img.style.height = '36px';
    el.appendChild(img);
    const marker = new goongjs.Marker({element:el}).setLngLat([point.lng, point.lat]);
    return marker
  }

  async drawRoute(source: any, target: any){
    if(this.routePolygon){
      this.routePolygon.remove();
      this.routePolygon = null;
    }
    const url = `https://rsapi.goong.io/Direction?origin=${source.lat},${source.lng}&destination=${target.lat},${target.lng}&vehicle=car&api_key=${enviroment.goongApiKey}`;
    try{
      const res = await fetch(url);
      const data = await res.json();
      if(!data || !data.routes || data.routes.length ===0){
        console.warn('No route found');
        return;
      }
      const encoded = data.routes[0].overview_polyline?.points || data.routes[0].geometry;
      let path;
      if (Array.isArray(encoded)) {
        path = encoded;
      } else {
        // if encoded polyline string -> decode (need polyline lib or goongjs has decode)
        if (goongjs.Polyline && typeof goongjs.Polyline.decode === 'function') {
          path = goongjs.Polyline.decode(encoded);
        } else {
          // fallback: try parse or skip
          console.warn('Polyline decode not available');
          return;
        }
      }
      this.routePolygon = new goongjs.Polyline({
        path,
        strokeColor: '#0066FF',
        strokeWeight: 4,
        strokeOpacity: 0.8
      });
      this.routePolygon.addTo(this.map);
    }catch(err){
      console.log('drawRoute error', err)
    }
  }
}
