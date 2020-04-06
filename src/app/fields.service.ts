import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(private http: HttpClient) { }
  //regerateRoport(queryElement): Observable<any> {
  //return this.http.post('http://localhost:8080/lms/registerstudent', queryElement);
  regerateRoport (queryElement): any {
    queryElement;
    return '{"Status":200,"Message":"Report has been mailed.","Query Element":"'+queryElement+'"}';
  }

  getFields(): any {
    //return this.http.get<any>(`http://localhost:8080/lms/searchbook?bid=${user_id}`);
    return '{"field1":"field1","field2":"fields2"}';
  }

  /*loginadmin(admin): Observable<any> {
    return this.http.post('http://localhost:8080/lms/loginadmin', admin);
  }*/
}
