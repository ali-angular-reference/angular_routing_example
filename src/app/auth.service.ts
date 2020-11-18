import { resolve } from "dns";

export class AuthService {
    // a fake log in and log out service
    loggedIn = false;

    isAuthenticated(){ // pretend method to check if the user is logged in
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(()=>{
                    resolve(this.loggedIn)
                },500);
            }
        );
        return promise
    }

    login(){
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }
}