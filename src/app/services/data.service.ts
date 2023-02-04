import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

export interface resultados{
  id:string,
  owner:string,
  titulo:string,
  descripcion:string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {  }


  public registrarse(datos:any){
      return this.http.post(`http://localhost:3000/signup`, datos)
    }

    public login(datos:any){
      return this.http.post(`http://localhost:3000/signin`, datos)
    }
    
    public crearNota(datos:any){
      return this.http.post(`http://localhost:3000/newnote`, datos)
    }

    public mostarNota(datos:any):Observable<resultados>{
      return this.http.post<resultados>(`http://localhost:3000/showdetails`, datos)
    }

  public getNotes():Observable<resultados>{
    return this.http.get<resultados>(`http://localhost:3000/shownotes`)
  }

  

}
