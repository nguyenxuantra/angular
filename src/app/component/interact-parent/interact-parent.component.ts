import { Component } from '@angular/core';
import {InteractChildComponent} from "../interact-child/interact-child.component";

@Component({
  selector: 'app-interact-parent',
  standalone: true,
  imports: [
    InteractChildComponent
  ],
  templateUrl: './interact-parent.component.html',
})
export class InteractParentComponent {
  message = '';
  messageInfo (msg: string){
    this.message = msg;
  }
}
