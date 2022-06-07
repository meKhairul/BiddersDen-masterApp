import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  category!:any;
  products: Product[] = [] ;
  searchText!:String;
  searchTextProducts: Product[] = [];
  categoricalProducts:Product[] = [];
  API_URL = 'http://127.0.0.1:8000';
  productToBeShown  = new Product();
  bidProductToBeShown  = new Product();
  sortValue!:number;
  flag!:number;
  adminUpdatedProduct:Product=new Product();

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

updateProduct(data:any) {
  return this.http.post(this.API_URL + '/updateProduct/', data);
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
getCategoricalProducts(data:any): Observable<any[]>{
  return this.http.post<any[]>(this.API_URL + '/categories/', data);
}
createEvent(event:String, username : String,product:Product){
  var event_type = event;
  var user_id = username;
  var product_id = product.uid;
  var category_code = product.product_category;
  var price = product.base_price;
  
  
  var data = {
    product_id : product_id,
    user_id : user_id,
    event_type : event_type,
    category_code : category_code,
    price : price
  }
  return this.http.post(this.API_URL + '/addEvent/', data);
}

setCategory(category:String)
{
  this.category = category;
}
getCategory()
{
  return this.category;
}
setAdminUpdatedProduct(product:Product){
  this.adminUpdatedProduct = product;
}
getAdminUpdateProduct():Product
{
  return this.adminUpdatedProduct;
}
getProductDetails(id : string): Observable<any>{
  var data = {
    id:id,
  }
  return this.http.post(this.API_URL + '/productDetails/', data);
}

}
