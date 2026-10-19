import { Request, APIRequestContext } from "@playwright/test";

let token1:string;
export class APIUtils{

    private readonly apiContext:APIRequestContext;    
    //private token:string;

    constructor(apiContext:APIRequestContext){

        this.apiContext=apiContext;
        //this.token=token;
    }

    async Login(loginPayload:object){

       const response=await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{
            data:loginPayload,
            headers:{
                'Content-Type':'application/json'
            }
            
        })

        const jsonResponse=await response.json();
        console.log('Login Response = ',jsonResponse)
        const token=jsonResponse.token;
        return token;
    }

    async placeOrder(orderPayload:object, token:string){
        const response=await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
            data:orderPayload,
            headers:{
                'Content-Type':'application/json',
                'Authorization':token
            }
        })

        const apiResponse=await response.json();
        const orderId=apiResponse.orders[0];
        console.log("Order Id = ",orderId)
        return orderId;
    }
}