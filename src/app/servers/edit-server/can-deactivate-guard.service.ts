import { componentFactoryName } from "@angular/compiler";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

// a contract that can be imported by another class that forces this class to provide logic
export interface CanComponentDeactivate {
    // gets one argument from the complenent that uses it
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate>{
    // forces a component to use the candeactivate method
    canDeactivate(component: CanComponentDeactivate, // called by the router when I try to leave a route
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
            return component.canDeactivate();
        }
}