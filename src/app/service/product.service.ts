import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../untils/product";

@Injectable({
  providedIn:'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }
  getProduct(): Observable<Product[]>{
    return this.http.get<Product[]>('/api/products');
  }

}
