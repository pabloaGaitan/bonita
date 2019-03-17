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
  descripcion : string

  ngOnInit() {
  }

  crear(){
    this.servicio.crearSolicitud();
    // this.servicio.crearSolicitud().subscribe(
    //   res=>{
    //     debugger
    //     this.servicio.asignarCaso(res).subscribe(
    //       res => {
    //         console.log(res)
    //       }
    //     )
    //   }

    // );
  }
}
