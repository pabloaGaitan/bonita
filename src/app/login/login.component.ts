import { LoginServiceService } from './../services/login-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService : LoginServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  username : string
  password : string
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  login(){
    this.loginService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe(
      res => {
        this.loginService.getToken().subscribe((response: any) => {
          localStorage.setItem("BONITA_TOKEN", response.headers.get("X-Bonita-API-Token"));
          localStorage.setItem("USER_ID", response.body.user_id);
          localStorage.setItem("USER_NAME", response.body.user_name);
          this.router.navigateByUrl("/home");
        });
      }
    );


  }

  

}
