import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {InteractChildComponent} from "../interact-child/interact-child.component";

@Component({
  selector: 'app-interact-parent',
  standalone: true,
  imports: [
    InteractChildComponent
  ],
  templateUrl: './interact-parent.component.html',
})
export class InteractParentComponent implements AfterViewInit{
    sent = "Thông tin của cha"
    @ViewChild(InteractChildComponent) interactChild!: InteractChildComponent;
    message = ''
    showMessage(mess: string){
        this.message = mess;
    }
    ngAfterViewInit(){
      console.log("ngAfterViewInit called"+ this.interactChild);
    }
    showAlert(){
      this.interactChild.sentMessage()
    }
}
