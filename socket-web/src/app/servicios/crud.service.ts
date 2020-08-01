import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web-service.service';
import { PermisosService } from './permisos.service';
import { DataRx } from '../modelos/data-rx';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private url: string;

  constructor(
    private http: HttpClient,
    private server: WebServiceService,
    private permissions: PermisosService
  ) {
    this.url = this.server.obtenerUrl();
  }

  // getAllData(endPoint: string): Array<any> {
  //   let returnData: Array<any> = [];

  //   this.http
  //     .get<DataRx>(`${this.url}${endPoint}`, this.server.getHeaders())
  //     .subscribe((data) => {
  //       if (data.ok) {
  //         returnData = data.data;
  //         this.permissions.decodeToken(data.token);
  //       } else {
  //         alert(data.msg);
  //       }
  //     });
  //   return returnData;
  // }

  postData(dataSend: object, endPoint: string): Array<any> {
    let returnData: Array<any> = [];

    this.http
      .post<DataRx>(
        `${this.url}${endPoint}`,
        dataSend,
        this.server.obtenerHeaders()
      )
      .subscribe((data) => {
        if (data.transaccion) {
          returnData = data.data;
          this.permissions.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }

  // getByID(id: string): Array<any> {
  //   let returnData: Array<any> = [];
  //   this.http
  //     .get<DataRx>(`${this.url}user/${id}`, this.server.getHeaders())
  //     .subscribe((data) => {
  //       if (data.ok) {
  //         returnData = data.data;
  //         this.permissions.decodeToken(data.token);
  //       } else {
  //         alert(data.msg);
  //       }
  //     });
  //   return returnData;
  // }

  putData(dataSend: object, endPoint: string, _id: string): Array<any> {
    let returnData: Array<any> = [];

    this.http
      .put<DataRx>(
        `${this.url}${endPoint}?id=${_id}`,
        dataSend,
        this.server.obtenerHeaders()
      )
      .subscribe((data) => {
        console.log(data)
        if (data.transaccion) {
          returnData = data.data;
          this.permissions.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }
 

  deleteData(endPoint: string, _id: string): Array<any> {
    let returnData: Array<any> = [];
    
    this.http
      .delete<DataRx>(`${this.url}${endPoint}?id=${_id}`, this.server.obtenerHeaders())
      .subscribe((data) => {
        if (data.transaccion) {
          returnData = data.data;
          this.permissions.decodeToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }
}