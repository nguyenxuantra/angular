import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {InteractParentComponent} from "./component/interact-parent/interact-parent.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InteractParentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular';
}
