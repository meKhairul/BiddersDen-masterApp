import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { Emitters } from "./emiiters/Emitter";
import { User } from "./user";
@Injectable({
    providedIn: 'root'
})

export class UserService {

    user!:any;
    loggedIn = false;

    API_URL = 'http://127.0.0.1:8000'
    constructor(private http: HttpClient) { }
    /*getAllUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.API_URL + '/users/');
    }*/

    addUser(val: any) {
        return this.http.post(this.API_URL + '/register/', val);
    }

    /*deleteUser(val:any){
        return this.http.delete(this.API_URL + '/users/'+ val);
    }*/
    
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
}
