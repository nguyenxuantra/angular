import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-interact-child',
  standalone: true,
  imports: [],
  templateUrl: './interact-child.component.html',
})
export class InteractChildComponent {
  @Output() notifi: EventEmitter<any> = new EventEmitter();

  sentToParent(){
    this.notifi.emit("Hello Application");
  }
}
