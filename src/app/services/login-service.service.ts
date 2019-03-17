import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios'
import qs from 'qs'


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  url = "http://52.15.168.168:8080/bonita/";
  constructor(private http : HttpClient) { }

  login(username:string , password : string) {
    let credenciales = {username:username,password:password,redirect:false}
    
    let options = {method : 'post' ,url:this.url + "loginservice", 
      headers : {"Content-Type":'application/x-www-form-urlencoded'},data:qs.stringify(credenciales),crossdomain:true,withCredentials:true}
    axios(options).then(response => {
      debugger
      console.log(response)
    });
    /*let credenciales = new HttpParams()
    .set('username',username)
    .set('password',password)
    .set('redirect','false');

    let headers = new HttpHeaders();
    headers.append("Content-Type", 'application/x-www-form-urlencoded');
    
    return this.http.post(this.url + "loginservice",credenciales,{headers:headers,observe:'response'});*/
  }

  crearSolicitud(){
    /*let headers = new HttpHeaders();
    //headers.append("X-Bonita-API-Token", 'application/');
    return this.http.post(this.url + "API/bpm/process/7455610800192491359/instantiation",null,{withCredentials:true});*/
    let options = {method : 'post' ,url:this.url + "API/bpm/process/7455610800192491359/instantiation", 
      data:null,withCredentials:true}
    axios(options).then(response => {
      debugger
    })
  } 
 
  asignarCaso(caseNumber){
    /*let headers = new HttpHeaders();
    //headers.append("X-Bonita-API-Token", 'application/');
    return this.http.post(this.url + "/API/bpm/humanTask?c=50&d=rootContainerId&f=state%3Dready&o=displayName+ASC&p=0&f=caseId%3D"+caseNumber,null,{withCredentials:true});*/
  }
}

