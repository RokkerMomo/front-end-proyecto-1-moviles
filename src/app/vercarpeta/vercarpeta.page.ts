import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Router, ActivatedRoute} from "@angular/router";
import { DataService} from '../services/data.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
const now = new Date();

@Component({
  selector: 'app-vercarpeta',
  templateUrl: './vercarpeta.page.html',
  styleUrls: ['./vercarpeta.page.scss'],
})
export class VercarpetaPage implements OnInit {

  constructor(private dataservice:DataService, private router:Router, private route:ActivatedRoute, private alertController: AlertController) { }

  notas:any = [];
  vacio:any = [];
  orderObj:any ={}
cargado:boolean=false;
carpeta:any="";
owner:string="";
 cargar={
  carpeta:""
 }

 eliminar={
  nombre:""
 }

 token:string="";

  headerDict = {
   'Authorization': ``
 }
 
  requestOptions = {                                                                                                                                                                                 
   headers: new HttpHeaders(this.headerDict), 
 };


  Dato={
    owner:"",
    titulo:"Nueva Nota",
    descripcion:"",
    fecha:now.toLocaleString()
    }


  ngOnInit() {
    this.carpeta='';
    this.notas =[];
    this.route.queryParams.subscribe(params => {
      this.carpeta = params['carpeta'];
    }
  );
  this.route.queryParams.subscribe(params => {
    this.token = params['token'];
    this.headerDict.Authorization=`Bearer ${this.token}`
  }
);
  this.cargar.carpeta=this.carpeta;
  this.eliminar.nombre=this.cargar.carpeta;
  this.dataservice.mostrarcarpeta(this.cargar,this.requestOptions).subscribe((res)=>{
    this.notas= [...this.notas,res];
    if ( this.notas[0].length==0) {
      this.cargado=false;
    }
    else{
      this.cargado=true;
    }
    
  })
  }

  ionViewWillEnter(){
    this.carpeta='';
    this.notas =[];
    this.route.queryParams.subscribe(params => {
      this.carpeta = params['carpeta'];
    }
  );
  this.cargar.carpeta=this.carpeta;
  this.dataservice.mostrarcarpeta(this.cargar,this.requestOptions).subscribe((res)=>{
    this.notas= [...this.notas,res];
    if ( this.notas[0].length==0) {
      this.cargado=false;
    }
    else{
      this.cargado=true;
    }
    
  })
  }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: `Seguro que quieres borrar esta nota ?` ,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
           
          },
        },
        {
          text: 'Continuar',
          role: 'confirm',
          handler: () => {
            this.dataservice.borrarcarpeta(this.eliminar,this.requestOptions).subscribe((res)=>{
              this.route.queryParams.subscribe(params => {
                this.owner = params['usuario'];
              }
            );
              this.router.navigate(['/carpetas'],
              {
                queryParams: { usuario: this.owner },
                queryParamsHandling: 'merge' }
              )
            })
          },
        },
      ],
    });

    await alert.present();
  }

  borrar(){
    this.presentAlert();
  }


  
}
