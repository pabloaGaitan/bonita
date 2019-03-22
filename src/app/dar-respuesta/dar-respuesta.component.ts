import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dar-respuesta',
  templateUrl: './dar-respuesta.component.html',
  styleUrls: ['./dar-respuesta.component.css']
})
export class DarRespuestaComponent implements OnInit {

  taskId;
  caseId;
  claim = {};
  requesterName;
  solution=""
  notas_solucion=""
  constructor( private service: LoginServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.taskId = params['taskId'];
      this.caseId = params['caseId'];
      this.service.getContext(this.taskId).subscribe((context: any) => {
        this.service.getDataModel(context.newClaim_ref.link+"/solution").subscribe((res:any) =>{
          this.solution = res.notes
        })
        this.service.getDataModel(context.newClaim_ref.link).subscribe((data: any) => {
          
          this.claim = data;

        });
      });
      this.service.getCaseVariable(this.caseId, 'contact').subscribe((contact: any) => {
        this.requesterName = this.getProperty(contact.value, "Name");
      })
    });
  }

  private getProperty(map: string, searchKey: string) {
    let str = map.replace(/[{}]+/g, ""),
      splitted = str.split(",");
    for (let i = 0; i < splitted.length; i++) {
      let [key, value] = splitted[i].split("=");
      if (key.trim() === searchKey)
        return value.trim();
    }
    return "";
  }

  submit() {
    let obj = {solution : this.notas_solucion};
    this.service.asignarCaso(this.taskId).subscribe(resp => {
      this.service.executeTask(this.taskId,obj).subscribe(res => {
        alert(`Operación realizada exitosamente`);
        setTimeout(() => {
          this.router.navigateByUrl("/home");
        }, 2000);
      })
    });
  }

}
