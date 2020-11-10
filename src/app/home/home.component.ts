import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoadServers(){
    // some calc, some data manipulation  
    if(Math.random()>0.5){ // change change the routing depending on a condition
      this.router.navigate(['/servers'])
    } else {
      this.router.navigate(['/servers'])
    }
  }

}
