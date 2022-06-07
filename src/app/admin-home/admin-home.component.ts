import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/Emitter';
import { Notify } from '../notify';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private userService:UserService, private productService: ProductService, private router:Router) { }

  show:boolean=false;
  
  ngOnInit(): void {
    
  }

  swapValue(){
    if(this.show==false)
    {
      this.show=true;
    }
    else
    {
      this.show=false;
    }
  }



}
