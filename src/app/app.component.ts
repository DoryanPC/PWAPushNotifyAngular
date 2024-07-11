import { Component } from '@angular/core';
import { SwUpdate,SwPush } from '@angular/service-worker';
import { APIRestServiceService } from './Service/apirest-service.service';
import { Notification } from '../app/Models/Notification.model';

import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ FormsModule,NgbModule ],
  templateUrl: './app.component.html'
})
export class AppComponent {


  title = 'Service Workers';
  updateCheckText = '';
  data='';
  notificacion = new Notification()

  notificaciones: any;

  public readonly VAPID_PUBLIC_KEY = 'BBxVIegBGDP2eo1wsx_m777_5qI5q3IvyBH5SLb54NmItBs8L0XVnIreUG1LLdedPpLnphJVvoMINxBN1eDBvmc';


  constructor(private update: SwUpdate,private swPush: SwPush,private apiRest: APIRestServiceService) {
    this.SucribirToNotification();
    this.getNotifications();
  }

  getNotifications(): any {
    
    this.apiRest.getNotofications().subscribe({
      next: (response) =>  this.notificaciones=response,
      error: (err) => console.error(err),
    });

  }

  SucribirToNotification(): any {

      this.swPush.requestSubscription({
        serverPublicKey:this.VAPID_PUBLIC_KEY
      }).then(sub => {

        const token =JSON.parse(JSON.stringify(sub));

        this.apiRest.saveToken(token).subscribe({
          next: (response) => console.log("response savetoken"),
          error: (err) => console.error(err),
          complete: () => console.log('Data fetch complete')
        });

      });
  }

  EventEmitir(IdNotify: any): any {
    this.apiRest.EmitirNotificacion(IdNotify).subscribe({
      next: (response) => console.log("Notificacion emitida"),
      error: (err) => console.error(err),
      complete: () => console.log('Data fetch complete')
    });
  }

  guardarNotificacion(){

    this.apiRest.saveNotification(this.notificacion).subscribe({
      next: (response) => {

        console.log(response);

        console.log(this.notificaciones);

        this.notificaciones.push(response)

        console.log(this.notificaciones);
      },
      error: (err) => console.error(err),
      complete: () => console.log('Data fetch complete')
    });
  }

}
