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
    return this.http.post(this.url + "API/bpm/process/6067463437787302834/instantiation", {},{
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
    });
  }

  executeTask(taskId, data) {
    let headers = new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("X-Bonita-API-Token", localStorage.getItem("BONITA_TOKEN"));
    return this.http.post(`${this.url}API/bpm/userTask/${taskId}/execution`, data, {
      withCredentials: true,
      headers
    });
  }

  getListTasks() {
    let headers = new HttpHeaders()
      .append("X-Bonita-API-Token", localStorage.getItem("BONITA_TOKEN"));
    const userId = localStorage.getItem("USER_ID");
    return this.http.get(`${this.url}API/bpm/humanTask?c=50&d=rootContainerId&f=state%3Dready&f=user_id%3D${userId}&o=displayName+ASC&p=0`,{
      headers,
      withCredentials: true
    });
  }

  getContext(taskId) {
    let headers = new HttpHeaders()
      .append("X-Bonita-API-Token", localStorage.getItem("BONITA_TOKEN"));
    return this.http.get(`${this.url}API/bpm/userTask/${taskId}/context`, {
      headers,
      withCredentials: true
    })
  }

  getDataModel(path) {
    let headers = new HttpHeaders()
      .append("X-Bonita-API-Token", localStorage.getItem("BONITA_TOKEN"));
    return this.http.get(`${this.url}${path}`, {
      headers,
      withCredentials: true
    });
  }

  getCaseVariable(caseId, variable) {
    let headers = new HttpHeaders()
      .append("X-Bonita-API-Token", localStorage.getItem("BONITA_TOKEN"));
    return this.http.get(`${this.url}API/bpm/caseVariable/${caseId}/${variable}`, {
      headers,
      withCredentials: true
    });
  }
}

