import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn:'root'
})
export class FormService {
  private readonly typeMap$ = new BehaviorSubject<number>(1);
  setType(type: number){
    this.typeMap$.next(type);
  }
  get getType(){
    return this.typeMap$.asObservable();
  }
}
