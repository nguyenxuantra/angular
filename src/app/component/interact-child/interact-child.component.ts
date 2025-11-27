import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-interact-child',
  standalone: true,
  imports: [],
  templateUrl: './interact-child.component.html',
})
export class InteractChildComponent {
    @Input() message!: string;
    @Output() info: EventEmitter<string> = new EventEmitter();

    sentMessage() {
      this.info.emit("Hello application"+ this.message);
    }
}
