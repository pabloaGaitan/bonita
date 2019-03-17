import { LoginServiceService } from './../services/login-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginServiceService,
    private formBuilder: FormBuilder) { }
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
    this.loginService.login(this.loginForm.value.username,this.loginForm.value.password)
    // this.loginService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe(
    //   res =>{
    //     debugger
    //     console.log(res.headers.get('Set-Cookie'))
    //   }
    // );


  }

  

}
