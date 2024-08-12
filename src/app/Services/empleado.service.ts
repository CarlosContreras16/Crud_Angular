import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Empleado } from '../Models/Empleado';
import { ResponseAPI } from '../Models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private http = inject(HttpClient);
  private apiURL:string = appsettings.apiUrl + "Empleado";

  constructor() { }

  lista(){
   return this.http.get<Empleado[]>(this.apiURL);
  }

  obtener(id:number){
    return this.http.get<Empleado>(`${this.apiURL}/${id}`);
   }

   crear(objeto:Empleado){
    return this.http.post<ResponseAPI>(this.apiURL,objeto);
   }

   editar(objeto:Empleado){
    return this.http.put<ResponseAPI>(this.apiURL,objeto);
   }

   eliminar(id:number){
    return this.http.delete<ResponseAPI>(`${this.apiURL}/${id}`);
   }
}
