import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { Emitters } from "./emiiters/Emitter";
import { User } from "./user";
import { Message } from "./message";
import { Product } from "./product";
@Injectable({
    providedIn: 'root'
})

export class UserService {

    isBidAble:boolean=true;
    recovery_email:String = "";
    user!:any;
    loggedIn = false;
    winningProducts:Product[] = [];
    API_URL = 'http://127.0.0.1:8000'
    constructor(private http: HttpClient) { }
    getAllUsers(): Observable<any[]> {
        return this.http.post<any[]>(this.API_URL + '/users/', "users");
    }

    addUser(val: any) {
        return this.http.post(this.API_URL + '/register/', val);
    }

    deleteUser(val:any){
        return this.http.delete(this.API_URL + '/users/'+ val);
    }
    
    /*uploadPhoto(val:any){
        return this.http.post(this.API_URL+'/SaveFile/', val);
    }*/

    login(val:any){
        return this.http.post(this.API_URL +  '/login/', val, {
            withCredentials: true
        });
    }
    authenticate(){
        return this.user = this.http.get(this.API_URL + '/user/', {withCredentials: true});
    }
    
    logout(){
        return this.http.post(this.API_URL + '/logout/', {}, {withCredentials: true})
    }
    setUser(user : User):void{
        this.user = user;
        console.log(this.user)
    }
    getUser():User{
        return this.user;
    }

    sendMessage(messageWithHeader:any){
        return this.http.post(this.API_URL + '/message/', messageWithHeader);
    }
      
    getMessages(data:any): Observable<any[]>{
        return this.http.post<any[]>(this.API_URL + '/chat/', data);
    }
    setWinnerProducts(winningProducts : Product[])
    {
        this.winningProducts = winningProducts;
    }
    getWinnerProducts():Product[]
    {
        return this.winningProducts;
    }
    setIsBidAble(isBid:boolean)
    {
        this.isBidAble = isBid;
    }
    getIsBidAble():boolean
    {
        return this.isBidAble;
    }
    recover(email : String){
        this.recovery_email = email;
        var data = {
            email : email
        }
        return this.http.post(this.API_URL + '/recover/', data);
    }
    logInWithRecoveryCode(code: String){
        var data = {
            code : code
        }
        return this.http.post(this.API_URL + '/loginWithCode/', data);
    }
    changePassword(password : String, username : String){
        var data = {
            username : username,
            password : password,
        }
        return this.http.post(this.API_URL + '/change-password/', data);
    }
    banUser(val:any){
        return this.http.post(this.API_URL + '/ban/', val);
    }
    createRecommendations(){
        return this.http.post(this.API_URL + '/initRecommendations/', "asd");
    }

    getRecommendations(username : String): Observable<any[]>{
        var data = {
            username : username,
        }
        return this.http.post<any>(this.API_URL + '/recommend/', data);
    }
    updateUser(data:any) {
        return this.http.post(this.API_URL + '/updateUser/', data);
    }

    getPreviousBids(data:any): Observable<any[]>
    {
        return this.http.post<any>(this.API_URL + '/bidhistory/', data);
    }
}
