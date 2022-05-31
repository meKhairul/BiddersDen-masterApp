import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [] ;
  searchText!:String;
  searchTextProducts: Product[] = [];
  API_URL = 'http://127.0.0.1:8000';
  productToBeShown  = new Product();
  bidProductToBeShown  = new Product();
  sortValue!:number;
  flag!:number;

constructor(private http: HttpClient) { }



uploadProductImage(image:any) {
  return this.http.post(this.API_URL + '/imageUpload/', image);
}
addProduct(product:any) {
  return this.http.post(this.API_URL + '/upload-product-info/', product);
}

getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + '/products/');
}
setBid(data:any){
  return this.http.post(this.API_URL + '/addBid/', data);
}
getBids(data:any): Observable<any[]>{
  return this.http.post<any[]>(this.API_URL + '/bids/', data);
}
searchProducts(data:any){
  return this.http.post<any[]>(this.API_URL + '/searchProducts/', data);
}

getProducts():Product[]{
  return this.products;
}
setBidProductToBeShown(product:Product){
  this.bidProductToBeShown=product;
}
setProductToBeShown(product:Product){
  this.productToBeShown=product;
}
getProductToBeShown():Product{
  return JSON.parse(JSON.stringify(this.productToBeShown));
}
getBidProductToBeShown():Product{
  return JSON.parse(JSON.stringify(this.bidProductToBeShown));
}
showProduct(){
  console.log("product: "+this.productToBeShown);
}
setSearchTextProducts(data : Product[]){
  this.searchTextProducts = data;
}
getSearchTextProducts():Product[]{
  return this.searchTextProducts;
}
setSearchText(data : String){
  this.searchText = data;
}
getSearchText():String{
  return this.searchText;
}
setFlag(flag:number)
{
  this.flag = flag;
}
getFlag():number{
  return this.flag;
}
setSortValue(sortValue:number)
{
  this.sortValue = sortValue;
}
getSortValue():number
{
  return this.sortValue;
}


}
