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

  constructor(private dataservice:DataService, private router:Router, private route:ActivatedRoute, private alertController: AlertController, private loadingCtrl: LoadingController) { }

  notas:any = [];
  notasencarpeta:any = [];
  notascargadas:any = [];
  vacio:any = [];
  orderObj:any ={}
cargado:boolean=false;
carpeta:any="";
owner:string="";
 cargar={
  carpeta:""
 }

 addcolecc={
  "nombrecarpeta":"",
  "idnota":""
}
 cargarnotas={
  owner:""
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


    async cargarContenido(){
      const cargando = await this.loadingCtrl.create({
        message:'Cargando...',
        spinner:'bubbles',
      });
      await cargando.present();

      this.cargar.carpeta=this.carpeta;
  this.eliminar.nombre=this.cargar.carpeta;
  this.dataservice.mostrarcarpeta(this.cargar,this.requestOptions).subscribe((res)=>{
    this.notasencarpeta= [...this.notasencarpeta,res];
    if ( this.notasencarpeta[0].length==0) {
      this.cargado=false;
    }
    else{
      this.cargado=true;
    }
    
    

  })
  this.dataservice.getNotes(this.cargarnotas,this.requestOptions).subscribe((res)=>{
    this.notas= [...this.notas,res];
    console.log(this.notas[0])
    this.notascargadas=[];
    for (let i = 0; i < this.notas[0].length; i++) {
      this.notascargadas.push({
    type: 'radio',
    name : this.notas[0][i].titulo,
    label : this.notas[0][i].titulo,
    value : this.notas[0][i]._id,
  })}
  })
     

    cargando.dismiss();
 
    }

  ngOnInit() {
    this.carpeta='';
    this.notas =[];
    this.route.queryParams.subscribe(params => {
      this.carpeta = params['carpeta'];
    }
  );
  this.route.queryParams.subscribe(params => {
    this.owner = params['usuario'];
    this.cargarnotas.owner=this.owner
  }
);
  this.route.queryParams.subscribe(params => {
    this.token = params['token'];
    this.headerDict.Authorization=`Bearer ${this.token}`
  }
  
);
this.cargarContenido();
  }

  ionViewWillEnter(){
    this.carpeta='';
    this.notas =[];
    this.route.queryParams.subscribe(params => {
      this.carpeta = params['carpeta'];
    }
  );
  this.notascargadas=[]
  this.cargarContenido();

  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Eliga una nota',
      inputs: this.notascargadas,
      buttons: [{
        text: 'Agregar',
        handler: (data:string) => {
          console.log(data)
    this.addcolecc.nombrecarpeta=this.carpeta
    this.addcolecc.idnota=data
    this.dataservice.addtocarpet(this.addcolecc,this.requestOptions).subscribe((res)=>{
      this.router.navigate(['/carpetas'],
              {
                queryParams: { usuario: this.owner },
                queryParamsHandling: 'merge' }
              )
    })
        }
      }],
    });

    await alert.present();
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
