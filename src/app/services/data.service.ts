import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {  }


  public registrarse(datos:any){
      return this.http.post(`${environment.server}/signup`, datos)
    }

    public login(datos:any):Observable<resultados>{
      return this.http.post<resultados>(`${environment.server}/signin`, datos)
    }
    
    public crearNota(datos:any):Observable<resultados>{
      return this.http.post<resultados>(`${environment.server}/newnote`, datos)
    }

    public mostarNota(datos:any):Observable<resultados>{
      return this.http.post<resultados>(`${environment.server}/showdetails`, datos)
    }

    public editarcontenido(datos:any):Observable<resultados>{
      return this.http.post<resultados>(`${environment.server}/edit`,datos)
    }

    public borrarNota(datos:any){
      return this.http.post(`${environment.server}/delete`,datos)
    }

    public MostrarPerfil(datos:any):Observable<resultados>{
      return this.http.post<resultados>(`${environment.server}/finduser`,datos)
    }

  public getNotes(datos:any):Observable<resultados>{
    return this.http.post<resultados>(`${environment.server}/shownotes`,datos)
  }

  public BorrarUsuario(datos:any):Observable<resultados>{
    return this.http.post<resultados>(`${environment.server}/deleteuser`,datos)
  }

  public crearcoleccion(datos:any):Observable<resultados>{
    return this.http.post<resultados>(`${environment.server}/newcarpet`, datos)
  }

  public mostrarcoleccion(datos:any){
    return this.http.post(`${environment.server}/showcolecction`, datos)
  }

  public addtocarpet(datos:any):Observable<resultados>{
    return this.http.post<resultados>(`${environment.server}/addnote`, datos)
  }

  public mostrarcarpeta(datos:any){
    return this.http.post(`${environment.server}/showcarpet`, datos)
  }

  

}
