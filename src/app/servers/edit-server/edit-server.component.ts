import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  id = 0;
  changesSaved = false; // to check if the user saved their edit changes

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // retrive query params and the fragment
    console.log(this.route.snapshot.queryParams)
    console.log(this.route.snapshot.fragment) // not reative to changes after the component has been loaded
    // reactive 
    this.route.queryParams
      .subscribe(
        // check if server is allowed to edit
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        } 
    )
    this.route.fragment.subscribe()
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    //ask the user if they actually want to leave the page
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route}) // go up one level when the server is updated
  }

  canDeactivate():Observable<boolean> | Promise<boolean> | boolean{
    // logic about if we can leave the url or not
    if(!this.allowEdit){
      return true; // true=can leave
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status)&&
      !this.changesSaved){ // if they change the name or status and the changes are not saved
        return confirm('Do you want to discard the changes?')
    } else {
      return true;
    }
  }
}
