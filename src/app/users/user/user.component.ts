import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};
  paramSubscription: Subscription

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // get access to the user that's in the url 
    this.user={
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    // subscribe to the route params (an observable) changing. if they change, update the user data
    this.paramSubscription = this.route.params
      .subscribe( // angular mmostly handles this subscription being automatically destroyed to save memory
        (params:Params) => {
          //update the user object
          this.user={
            id: params['id'],
            name: params['name']
          };
        }
      );
  }
  ngOnDestroy(): void {
    // if we add our own observables, I always have to unsubscribe
    this.paramSubscription.unsubscribe()
  }
}
