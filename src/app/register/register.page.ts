import { Component, OnInit } from '@angular/core';
import { DataService } from "src/app/services/data.service";
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private dataservice:DataService,private alertController: AlertController, private router:Router) { }

  variable= null;

 id="";


nombre:string= "";
apellido:string="";
usuario:string = "";
pass:string = "";

  Datos={
    "nombre":"",
    "apellido":"",
  "usuario": "",
  "password": "",
  }

  token={
    "request_token":""
  }

  mensaje="";

  ngOnInit() {
  }

  async error (){
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: `${this.mensaje}` ,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async respuesta (){
    const alert = await this.alertController.create({
      header: 'Registro Completado',
      message: 'El usuario fue registrado con exito' ,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async registar (){
    this.Datos.nombre=this.nombre;
    this.Datos.apellido=this.apellido;
    this.Datos.usuario=this.usuario;
    this.Datos.password=this.pass;
    this.dataservice.registrarse(this.Datos).subscribe((res)=>{
      console.log(res);
      this.respuesta();
      this.router.navigate(['/login']);
    },(error)=>{
      this.mensaje=error.error.msg;
      this.error();
    })
  }

}
