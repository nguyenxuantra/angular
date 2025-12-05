import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NzFormDirective, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {FormService} from "../../service/form.service";

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
export class FormComponent implements OnInit{
  constructor(private formService : FormService ) {
  }
  ngOnInit() {
    this.formService.getType.subscribe(res => console.log(res));
  }
  onClick(){
    this.formService.setType(5);
  }
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
