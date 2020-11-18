import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(){
    this.authService.login();
    console.log("user is logged in")
  }

  onLogout(){
    this.authService.logout();
    console.log("user is logged out")
  }

  onLoadServer(id){
    // some calc, some data manipulation  
    this.router.navigate(['/servers',id,'edit'],{queryParams:{allowEdit:'1'}, fragment:'loading'})
  }

}
