import { LoginServiceService } from './../services/login-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  username: string = "";
  tasks: any[] = [];

  confLinks = {
    "4. Revisar Solicitud ": "/review-claim"
  }

  constructor(
    private service: LoginServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem("USER_NAME");
    if(this.username !== 'ventas') {
      this.service.getListTasks().subscribe( (tasks: any[]) => this.tasks = tasks);
    }
  }

  crear() {
    this.service.crearSolicitud().subscribe(
      (res: any) => {
        this.service.getHumanTask(res.caseId).subscribe(response => {
          const taskId = response[0].id;
          this.service.asignarCaso(taskId).subscribe(_ => {
            this.router.navigateByUrl(`new-claim/${taskId}`);
          })
        });
      }

    );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login")
  }

  start(taskId, caseId, displayName) {
    if(!this.confLinks[displayName])
      return "";
    return `${this.confLinks[displayName]}/${taskId}/${caseId}`
  }

}
