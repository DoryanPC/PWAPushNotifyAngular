import { Component } from '@angular/core';
import { SwUpdate,SwPush } from '@angular/service-worker';
import { APIRestServiceService } from './apirest-service.service';


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {


  title = 'Service Workers';
  updateCheckText = '';
  data='';

  public readonly VAPID_PUBLIC_KEY = 'BBxVIegBGDP2eo1wsx_m777_5qI5q3IvyBH5SLb54NmItBs8L0XVnIreUG1LLdedPpLnphJVvoMINxBN1eDBvmc';


  constructor(private update: SwUpdate,private swPush: SwPush,private apiRest: APIRestServiceService) {
    this.SucribirToNotification();
  }


  SucribirToNotification(): any {
      console.log("este es el metodo de  notificacion");

      this.swPush.requestSubscription({
        serverPublicKey:this.VAPID_PUBLIC_KEY
      }).then(sub => {

        console.log("este es el them");

        const token =JSON.parse(JSON.stringify(sub));

        console.log("ojito",token);

        this.apiRest.saveToken(token).subscribe({
          next: (response) => console.log("response savetoken"),
          error: (err) => console.error(err),
          complete: () => console.log('Data fetch complete')
        });

      });
  }

  updateCheck(): void {
    this.update
        .checkForUpdate()
        .then(() => this.updateCheckText = 'resolved')
        .catch(err => this.updateCheckText = `rejected: ${err.message}`);
  }

  /*ngOnInit() {
    this.SucribirToNotification();
  }*/
}
