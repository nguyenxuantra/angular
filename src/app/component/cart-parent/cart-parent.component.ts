import { Component } from '@angular/core';
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

}
