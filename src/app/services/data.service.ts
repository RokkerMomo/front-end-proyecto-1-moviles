import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';

export interface resultados{
  id:string,
  owner:string,
  titulo:string,
  descripcion:string,
  usuario:string,
  nombre:string,
  apellido:string,
  password:string,
  user:any
  _id:string
  msg:string
  carpeta:string
  token:string
  
}

@Injectable({
  providedIn: 'root'
})



export class DataService {

  constructor(private http: HttpClient) {  }


  //USUARIO
  public registrarse(datos:any){
      return this.http.post(`${environment.server}/signup`, datos)
    }
    public login(datos:any):Observable<resultados>{
      return this.http.post<resultados>(`${environment.server}/signin`, datos)
    }
    public MostrarPerfil(datos:any,requestOptions:any){
      return this.http.post(`${environment.server}/finduser`,datos,requestOptions)
    }
    public BorrarUsuario(datos:any,requestOptions:any){
      return this.http.post(`${environment.server}/deleteuser`,datos,requestOptions)
    }


    //NOTAS
    public crearNota(datos:any,requestOptions:any){
      return this.http.post(`${environment.server}/newnote`, datos,requestOptions)
    }
    public mostarNota(datos:any,requestOptions:any){
      return this.http.post(`${environment.server}/showdetails`, datos, requestOptions)
    }
    public editarcontenido(datos:any,requestOptions:any){
      return this.http.post<resultados>(`${environment.server}/edit`,datos,requestOptions)
    }
    public borrarNota(datos:any,requestOptions:any){
      return this.http.post(`${environment.server}/delete`,datos,requestOptions)
    }

    

  public getNotes(datos:any,requestOptions:any){
    return this.http.post(`${environment.server}/shownotes`,datos, requestOptions)
  }

  
  //CARPETAS
  public crearcoleccion(datos:any,requestOptions:any){
    return this.http.post(`${environment.server}/newcarpet`, datos,requestOptions)
  }

  public mostrarcoleccion(datos:any,requestOptions:any){
    return this.http.post(`${environment.server}/showcolecction`, datos,requestOptions)
  }

  public addtocarpet(datos:any,requestOptions:any){
    return this.http.post(`${environment.server}/addnote`, datos,requestOptions)
  }

  public mostrarcarpeta(datos:any,requestOptions:any){
    return this.http.post(`${environment.server}/showcarpet`, datos,requestOptions)
  }
  public borrarcarpeta(datos:any,requestOptions:any){
    return this.http.post(`${environment.server}/deletecollection`,datos,requestOptions)
  }
  

}
