import {Component, NgZone} from '@angular/core';
import {CartChildComponent} from "../cart-child/cart-child.component";

@Component({
  selector: 'app-cart-parent',
  standalone: true,
  imports: [
    CartChildComponent
  ],
  templateUrl: './cart-parent.component.html',
})
export class CartParentComponent {
    count=0;
    idSetInterval:any;
    constructor(private ngZone: NgZone){

    }
    runZoneExample(){
      this.ngZone.runOutsideAngular(()=>{
          this.idSetInterval = setInterval(()=>{
            this.count++;
            if(this.count%2===0){
              this.ngZone.run(()=>{})
            }
          },1000)
      })
    }
    clear(){
      clearInterval(this.idSetInterval);
    }
}
