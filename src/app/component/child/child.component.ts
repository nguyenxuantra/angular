// import {
//   AfterContentChecked,
//   AfterContentInit, AfterViewChecked, AfterViewInit,
//   Component,
//   DoCheck, ElementRef,
//   Input,
//   OnChanges, OnDestroy,
//   OnInit,
//   SimpleChanges, ViewChild
// } from '@angular/core';
// import {UserService} from "../../service/user.service";
// import {User} from "../../untils/user";
//
// @Component({
//   selector: 'app-child',
//   standalone: true,
//   imports: [
//   ],
//   templateUrl: './child.component.html',
//   styleUrl: './child.component.scss'
// })
// export class ChildComponent implements OnChanges, DoCheck, AfterContentInit, OnInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{
//   @Input() name!: string;
//   @Input() user!: User;
//   @ViewChild('titleElement') titleElement?: ElementRef;
//   intervalId: any;
//   constructor(private userService: UserService){
//     this.intervalId = setInterval(()=>{
//       console.log('interval đang chạy...');
//     },1000)
//   }
//   ngOnInit() {
//     console.log("Component ngOnInit");
//   }
//
//   ngOnChanges(onChanges: SimpleChanges){
//     if(onChanges['name']){
//       const c = onChanges['name'];
//       console.log("Giá trị trước",c.previousValue, "Giá trị hiện tại",c.currentValue, "Thay đổi lần đầu", c.firstChange);
//     }
//     if(onChanges['user']){
//       const c = onChanges['user'];
//       console.log("Giá trị trước",c.previousValue, "Giá trị hiện tại",c.currentValue, "Thay đổi lần đầu", c.firstChange);
//     }
//   }
//   ngDoCheck() {
//     console.log("Có sự thay đổi")
//   }
//   ngAfterContentInit(){
//     console.log("conten da duoc ren vao")
//   }
//   ngAfterContentChecked(){
//     console.log("content su dung aftercontentchecked")
//   }
//   ngAfterViewInit(){
//     console.log("Noi dung cua the div", this.titleElement?.nativeElement.textContent);
//   }
//   ngAfterViewChecked() {
//     console.log("Noi dung cua the div checked lai", this.titleElement?.nativeElement.textContent);
//   }
//   ngOnDestroy() {
//     console.log("Component bị huỷ");
//     clearInterval(this.intervalId);
//   }
// }
