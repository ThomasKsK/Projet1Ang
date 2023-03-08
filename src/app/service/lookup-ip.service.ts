import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; 
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class LookupIpService {

  constructor(private http:HttpClient) { }

  public getGeoLocationIp(ip: string) : Observable<any> {
    return this.http.get(environment.apiBaseUrl + ip + '?output=json&access_key=' + environment.keyAPI);
  }
}