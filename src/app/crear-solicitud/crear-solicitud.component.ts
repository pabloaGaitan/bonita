import { LoginServiceService } from './../services/login-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  constructor(
    private servicio:LoginServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  tipo : string = 'NO_PAGO';
  solicitante : string = "";
  tipoComision : string = 'POSTPAGO';
  idComision : string = "";
  descripcion : string = "";

  taskId: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.taskId = params['taskId'];
    });
  }

  send() {
    this.servicio.executeTask(this.taskId, {
      type: this.tipo,
      requester: this.solicitante,
      assignment: this.tipoComision,
      assignmentId: this.idComision,
      description: this.descripcion
    }).subscribe( res => {
      alert(`Se ha creado la solicitud exitosamente`);
      setTimeout(() => {
        this.router.navigateByUrl("/home");
      }, 2000);
    })
  }
}
