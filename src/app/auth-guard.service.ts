import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { timeStamp } from "console";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

// import the auth service
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router){}


    // This is executed before a route is loaded for a main route
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        // Check if the user is logged in or not 
        return this.authService.isAuthenticated()
            .then(
                (authenticated: boolean) => {
                    if(authenticated){
                        // if logged in, the route can be accessed
                        return true;
                    } else {
                        // if not logged in, return to the home page  
                        this.router.navigate(['/'])
                    }
                }
            );
    }

    //this is executed for clidren of aroute only 
    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return this.canActivate(route, state);
    }

    // can deactivate route: wether I can leave a route or not
    
}