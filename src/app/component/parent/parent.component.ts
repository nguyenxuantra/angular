// import {Component, OnChanges, SimpleChanges} from '@angular/core';
// import {ChildComponent} from "../child/child.component";
// import {User} from "../../untils/user";
// import {NgIf} from "@angular/common";
//
// @Component({
//   selector: 'app-parent',
//   standalone: true,
//   imports: [
//     ChildComponent,
//     NgIf
//   ],
//   templateUrl: './parent.component.html',
//   styleUrl: './parent.component.scss'
// })
// export class ParentComponent{
//   show = true;
//   username = 'Angular';
//   user: User = {
//     name:'Angular',
//     userId:1
//   }
//   onChange=()=>{
//     this.username = this.username === 'Angular' ? 'Reactjs' : 'Angular';
//   }
//   onChangeUser= ()=>{
//     // this.user.name = this.username === 'Angular' ? 'Reactjs' : 'Angular';
//     this.user = this.user.name === 'Angular' ?{
//       ...this.user,
//       name:'Reactjs',
//     } :
//       {
//         ...this.user,
//         name:'Angular',
//       }
//   }
//   onClick = ()=>{
//     this.show = !this.show;
//   }
// }
