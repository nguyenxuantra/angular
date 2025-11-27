import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NzFormDirective, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NzFormDirective,
    NzFormLabelComponent,
    NzInputDirective,
    NzButtonComponent
  ],
  templateUrl: './form.component.html',
})
export class FormComponent {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(18),
  })
  submit(){
    if(this.userForm.valid){
      console.log(this.userForm.value);
    }else{
      console.log('Form invalid');
    }
  }
}
