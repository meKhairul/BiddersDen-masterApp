export class Product{
    uid : string = "";
    product_name : string = ""; 
    product_category : string = "";
    base_price !: number ;
    product_details : string = "";
    current_price : number = 0;
    time_to_bid !: number ;
    recieved_date : string = ""; 
    shipping_date : string = "";
    delivered_date : string = "";
    isApproved : boolean = false;
    seller : string = "";
    buyer : string = "";
    isSold : boolean = false;
}