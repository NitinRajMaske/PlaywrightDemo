import {Page, Locator} from '@playwright/test'
import { DashboardPage } from './DashboardPage';

export class SignInPage{

    private readonly page:Page;
    private readonly lblLoginSection:Locator;
    private readonly txtEmail:Locator;
    private readonly txtPassword:Locator;
    private readonly btnSignIn:Locator;

    constructor(page:Page){

        this.page=page;
        this.lblLoginSection=this.page.locator('div[class="login-section-wrapper"] ');
        this.txtEmail=this.page.getByPlaceholder('email@example.com');
        this.txtPassword=this.page.getByPlaceholder("enter your passsword");
        this.btnSignIn=this.page.getByText('Login');

    }

    public get emailInput():Locator{
        return this.txtEmail;
    }

    public get passwordInput():Locator{
        return this.txtPassword;
    }

    public get submitButton():Locator{
        return this.btnSignIn;
    }


    async navigate(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async navigateToDashboard(url:string){
        await this.page.goto(url);
    }

    async login(username:string, password:string){
        await this.txtEmail.fill(username)//.pressSequentially(username,{delay:1000});
        await this.txtPassword.fill(password)//.pressSequentially(password,{delay:1000});
        await this.btnSignIn.click();
        return new DashboardPage(this.page);
    }


}