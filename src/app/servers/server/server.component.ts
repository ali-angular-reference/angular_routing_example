import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { EditServerComponent } from '../edit-server/edit-server.component';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  allowEdit=false;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // use the resolver
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    )

    //retireve info from the route path
    // var id = +this.route.snapshot.params[('id')]
    // this.server = this.serversService.getServer(id);
    // // react to params changes when this component stays loaded
    // this.route.params.subscribe(
    //   (params:Params)=>{
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );

    this.route.queryParams
    .subscribe(
      // check if server is allowed to edit
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      } 
  )
  }

  onEditServer(){
    // navigate to the edit server component
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'}) // preserve the query params
  }

}
