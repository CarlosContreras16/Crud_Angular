import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { EmpleadoService } from '../../Services/empleado.service';
import { Empleado } from '../../Models/Empleado';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatButtonModule,MatIconModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private empleadoServicio = inject(EmpleadoService);
  public listaEmpleado :Empleado[] = [];
  public displayedColumns:string[] = ['nombreCompleto', 'correo', 'sueldo', 'fechaContrato','accion']

  obtenerEmpleado(){
    this.empleadoServicio.lista().subscribe({
      next:(data)=>{
        if(data.length>0){
          this.listaEmpleado = data;
        }
      },
       error:(err)=>{
        console.log(err.message)
       }
    })
  }

  constructor(private router:Router){
    this.obtenerEmpleado();
  }

  nuevo(){
    this.router.navigate(['/empleado',0]);
  }

  editar(objeto:Empleado){
    this.router.navigate(['empleado', objeto.idEmpleado])
  }  

  eliminar(objeto:Empleado){
    if(confirm("Desea eliminar el empleado " + objeto.nombreCompleto)){
      this.empleadoServicio.eliminar(objeto.idEmpleado).subscribe({
        next:(data)=>{
          if(data.isSucces){
            this.obtenerEmpleado();
          }else{
            alert("No se puede eliminar el empleado")
          }
        },
         error:(err)=>{
          console.log(err.message)
         }
      })
    }
  }
}
