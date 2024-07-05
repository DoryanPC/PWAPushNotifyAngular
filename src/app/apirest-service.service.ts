import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class APIRestServiceService {

  public url ='http://localhost:8000/api/saveToken';

  constructor(private http: HttpClient){ }

  saveToken = (token : any) => {
    return this.http.post(this.url,{token:token});
  }

  getData(){
    return 'Hello from service!';
  }


}
