import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class APIRestServiceService {

  public url ='http://localhost:8000/api';

  constructor(private http: HttpClient){ }

  saveToken = (token : any) => {
    return this.http.post(this.url+'/saveToken',{token:token});
  }

 getNotofications(){
    let response=this.http.get(this.url+'/getNotifications',{});
    return response;
  }

  EmitirNotificacion(IdNotify: any){
    let response=this.http.post(this.url+'/send',{IdNotify:IdNotify});
    return response;
  }

  saveNotification(Notification: any){
    let response=this.http.post(this.url+'/saveNotification',Notification);
    return response;
  }


}
