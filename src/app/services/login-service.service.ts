import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  url = "http://52.15.168.168:8080/bonita/";
  constructor(private http : HttpClient) { }

  login(username:string , password : string) {
    let credenciales = new HttpParams()
      .set('username',username)
      .set('password',password)
      .set('redirect','false');
    
    return this.http.post(this.url + "loginservice",credenciales,{withCredentials: true});
  }

  getToken() {
    return this.http.get(this.url + "API/system/session/unusedId",{observe: 'response', withCredentials: true});
  }

  crearSolicitud(){
    let headers = new HttpHeaders()
      .append("X-Bonita-API-Token", localStorage.getItem("BONITA_TOKEN"));
    return this.http.post(this.url + "API/bpm/process/7455610800192491359/instantiation", {},{
      headers,
      withCredentials: true
    });
  } 
 
  getHumanTask(caseNumber) {
    let headers = new HttpHeaders()
      .append("X-Bonita-API-Token", localStorage.getItem("BONITA_TOKEN"));
    return this.http.get(this.url + "API/bpm/humanTask?c=1&d=rootContainerId&f=state%3Dready&o=displayName+ASC&p=0&f=caseId%3D"+caseNumber, {
      withCredentials: true,
      headers
    })
  }

  asignarCaso(taskId){
    let headers = new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("X-Bonita-API-Token", localStorage.getItem("BONITA_TOKEN"));
    return this.http.put(`${this.url}API/bpm/humanTask/${taskId}`, { assigned_id: localStorage.getItem("USER_ID") }, {
      withCredentials: true,
      headers
    })
  }
}

