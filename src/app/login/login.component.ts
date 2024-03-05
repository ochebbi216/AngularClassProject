import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService (2)';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private  authService : AuthService,private router : Router) {}


  signIn():void{
    this.authService.doGoogleLogin().then(()=>{
      this.router.navigate(['/members']);

    })

  }
}
