import { LoginServiceService } from './../services/login-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  constructor(private servicio:LoginServiceService) { }

  tipo : string = 'NO_PAGO';
  solicitante : string
  tipoComision : string = 'POST PAGO';
  idComision : string
  descripcion : string;

  taskId: string;

  ngOnInit() {
  }

  crear(){
    this.servicio.crearSolicitud().subscribe(
      (res: any) => {
        this.servicio.getHumanTask(res.caseId).subscribe(response => {
          this.taskId = response[0].id;
          this.servicio.asignarCaso(this.taskId).subscribe(_ => {
            // mover al usuario a la pantalla del formulario
          })
        });
      }

    );
  }
}
