import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  winningProduct!:Product;

  constructor(userService:UserService,productService:ProductService, private router: Router) { }

  ngOnInit(): void {
  }
  pay(){
    this.router.navigate(['paypal'])
  }
}
