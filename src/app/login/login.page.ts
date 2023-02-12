import { Component, OnInit, Query } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private dataservice:DataService,private alertController: AlertController, private router:Router) { }

  usuario:string = "";
  pass:string = "";

  mensaje:string ="";

  Datos={
  "usuario": "",
  "password": "",
  }



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

  login(){
    this.Datos.usuario=this.usuario;
    this.Datos.password=this.pass;
    this.dataservice.login(this.Datos).subscribe((res)=>{
      this.router.navigate(
    ['/home'],
    {
      queryParams: { usuario: res.user._id, token:res.token },
      queryParamsHandling: 'merge' }
    );
    },(error)=>{
      this.mensaje=error.error.msg;
      this.error();
    })
  }
}