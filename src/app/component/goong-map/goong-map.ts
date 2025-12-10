import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
// assume goongjs is globally available or imported correctly
declare const goongjs: any;

@Component({
  selector: 'app-goong-map',
  templateUrl: './goong-map.component.html',
  styleUrls: ['./goong-map.component.scss']
})
export class GoongMapComponent implements OnInit, OnDestroy {
  @ViewChild('contextMenu') contextMenu!: ElementRef<HTMLDivElement>;

  gmap: any;
  fromMarker: any = null;
  toMarker: any = null;
  routePolygon: any = null;

  clickPoint: any = null; // {lng, lat}
  menuTop = '0px';
  menuLeft = '0px';

  // keep handlers if you want to off
  private clickHandler: any;
  private contextHandler: any;
  private clickMapHandler: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.loadMap();
  }

  ngOnDestroy() {
    try {
      if (this.gmap) {
        // remove all listeners
        this.gmap.off('click', this.clickHandler);
        this.gmap.off('contextmenu', this.contextHandler);
        this.gmap.off('click', this.clickMapHandler);
      }
    } catch (e) { /* ignore */ }
  }

  loadMap() {
    goongjs.accessToken = 'YOUR_KEY';
    this.gmap = new goongjs.Map({
      container: 'g-map',
      style: 'https://{...}', // your style
      center: [106.6798, 10.7626],
      zoom: 14
    });

    // register events after map 'load'
    this.gmap.on('load', () => {
      this.registerMapEvents();
    });
  }

  registerMapEvents() {
    // Use runOutsideAngular for event registration heavy handlers
    this.ngZone.runOutsideAngular(() => {
      // left click: show context menu (custom)
      this.contextHandler = (evt: any) => {
        // evt.lngLat, evt.point available
        // compute pixel pos relative to map container
        const x = evt.point.x;
        const y = evt.point.y;

        // update variables inside Angular zone
        this.ngZone.run(() => {
          this.clickPoint = { lng: evt.lngLat.lng, lat: evt.lngLat.lat };
          this.menuLeft = `${x}px`;
          this.menuTop = `${y}px`;
          this.showContextMenuAt(this.menuLeft, this.menuTop);
        });
      };

      this.gmap.on('click', this.contextHandler);

      // click anywhere to hide menu
      this.clickMapHandler = () => {
        this.ngZone.run(() => this.hideContextMenu());
      };
      this.gmap.on('click', this.clickMapHandler);

      // also hide when dragging ends
      this.gmap.on('dragend', () => {
        this.ngZone.run(() => this.hideContextMenu());
      });
    });
  }

  showContextMenuAt(left: string, top: string) {
    const el = this.contextMenu.nativeElement;
    el.style.left = left;
    el.style.top = top;
    el.style.display = 'block';
  }

  hideContextMenu() {
    const el = this.contextMenu.nativeElement;
    el.style.display = 'none';
  }

  // USER ACTIONS
  onFromHere() {
    this.hideContextMenu();
    if (!this.clickPoint) return;

    // remove old marker
    if (this.fromMarker) {
      this.fromMarker.remove();
      this.fromMarker = null;
    }

    this.fromMarker = this.createMarker('assets/from.png', this.clickPoint).addTo(this.gmap);

    // if both points exist, draw route
    if (this.fromMarker && this.toMarker) {
      this.drawRoute(this.clickPoint, { lng: this.toMarker.getLngLat().lng, lat: this.toMarker.getLngLat().lat });
    }
  }

  onToHere() {
    this.hideContextMenu();
    if (!this.clickPoint) return;

    if (this.toMarker) {
      this.toMarker.remove();
      this.toMarker = null;
    }

    this.toMarker = this.createMarker('assets/to.png', this.clickPoint).addTo(this.gmap);

    if (this.fromMarker && this.toMarker) {
      this.drawRoute({ lng: this.fromMarker.getLngLat().lng, lat: this.fromMarker.getLngLat().lat },
        { lng: this.clickPoint.lng, lat: this.clickPoint.lat });
    }
  }

  onClearRoute() {
    this.hideContextMenu();
    if (this.fromMarker) { this.fromMarker.remove(); this.fromMarker = null; }
    if (this.toMarker) { this.toMarker.remove(); this.toMarker = null; }
    if (this.routePolygon) { this.routePolygon.remove(); this.routePolygon = null; }
  }

  // create marker helper
  createMarker(iconUrl: string, point: {lng: number, lat: number}) {
    let innerHtml =
      `<div class="custom-marker">
        <img class="marker_img" style="width: 44px;
        height: 44px;
        transform: rotate(0deg);
        transform-origin: 50% 50%;" src="${iconUrl}" />
      </div>`;
    const el = document.createElement('div');
    el.innerHTML = innerHtml
    const marker = new goongjs.Marker(el).setLngLat([point.lng, point.lat]);
    return marker;
  }

  // draw route — call your Directions API and decode polyline
  async drawRoute(source: any, target: any) {
    // remove old
    if (this.routePolygon) { this.routePolygon.remove(); this.routePolygon = null; }

    // Example fetch — adapt to Goong Directions API
    const key = 'YOUR_KEY';
    const url = `https://rsapi.goong.io/Direction?origin=${source.lat},${source.lng}&destination=${target.lat},${target.lng}&vehicle=car&api_key=${key}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data || !data.routes || data.routes.length === 0) {
        console.warn('No route found');
        return;
      }
      // geometry format depends on API: example uses .overview_polyline.points encoded string
      const encoded = data.routes[0].overview_polyline?.points || data.routes[0].geometry;
      // decode depending on format; if already coords array, use directly
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
      this.routePolygon.addTo(this.gmap);
    } catch (err) {
      console.error('drawRoute error', err);
    }
  }
}
