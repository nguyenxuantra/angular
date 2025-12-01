import { Routes } from '@angular/router';
import {CartParentComponent} from "./component/cart-parent/cart-parent.component";
import {InteractParentComponent} from "./component/interact-parent/interact-parent.component";
import {FormComponent} from "./component/form/form.component";
import {GoongMapComponent} from "./component/goong-map/goong-map.component";

export const routes: Routes = [
  {path:'', component : CartParentComponent},
  {path:'interact', component : InteractParentComponent},
  {path:'form', component : FormComponent},
  {path:'goongmap', component : GoongMapComponent},
];
