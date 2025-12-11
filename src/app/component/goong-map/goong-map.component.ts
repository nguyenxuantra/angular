import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import * as goongjs from '@goongmaps/goong-js';
import {enviroment} from "../../../enviroments/enviroment";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NgTemplateOutlet} from "@angular/common";
import polyline from '@mapbox/polyline';


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
  layer:any;
  source:any;
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
      this.drawRouteUsingApi(this.clickPoint, {lng:this.toMaker.getLngLat().lng, lat:this.toMaker.getLngLat().lat});
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
      this.drawRouteUsingApi({lng: this.fromMaker.getLngLat().lng, lat: this.fromMaker.getLngLat().lat},
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
    if (this.map.getLayer('dynamic-route-line')) {
      this.map.removeLayer('dynamic-route-line');
    }

    if (this.map.getSource('dynamic-route')) {
      this.map.removeSource('dynamic-route');
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

  async drawRouteUsingApi(source: any, target: any){
    const url = `https://rsapi.goong.io/Direction?origin=${source.lat},${source.lng}&destination=${target.lat},${target.lng}&vehicle=car&api_key=${enviroment.goongApiKey}`;
    try{
      const res = await fetch(url);
      const data = await res.json();
      const encoded = data.routes[0].overview_polyline.points;
      const decoded = polyline.decode(encoded);
      const coordinates = decoded.map((p:any)=> [p[1],p[0]]);
      this.drawPolyline(coordinates);
    }catch (err){
      console.log("lôi call api", err)
    }
  }

  drawPolyline(coords: any[]){
    if(this.map.getSource('dynamic-route')){
      const source = this.map.getSource('dynamic-route') as any;
      source.setData({
        type:'Feature',
        geometry:{
          type:'LineString',
          coordinates: coords
        }
      });
      return ;
    }
    this.map.addSource('dynamic-route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: coords
        }
      }
    });
    this.map.addLayer({
      id: 'dynamic-route-line',
      type: 'line',
      source: 'dynamic-route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#ff0000',
        'line-width': 4
      }
    });
  }

}
