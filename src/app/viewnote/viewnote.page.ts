import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Router, ActivatedRoute} from "@angular/router";
import { DataService} from '../services/data.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.page.html',
  styleUrls: ['./viewnote.page.scss'],
})
export class ViewnotePage implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private dataservice:DataService, private alertController: AlertController ) { }

  id:any = "";

  owner:any ="";
  mensaje:string ="";
  carpeta:string="";
  token:string="";
  carpetas:any = [];
  cargado:boolean=false;

  respuesta:any={};

  headerDict = {
    'Authorization': ``
  }
  
   requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict), 
  };

  datocolecc={
    "owner":"",
  }

  addcolecc={
    "nombrecarpeta":"",
    "idnota":""
  }

  Dato={
    "_id":"",
    }

    cambio:any={
      "_id": "",
      titulo:"",
      "descripcion":""
    }

    eliminar:any={
      "_id": ""
    }

    titulo:string="";
    contenido:string ="";

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.owner = params['usuario'];
      this.token = params['token']
      this.headerDict.Authorization=`Bearer ${this.token}`
      this.datocolecc.owner=this.owner
      console.log(this.datocolecc)
      console.log(this.token)
      this.dataservice.mostrarcoleccion(this.datocolecc,this.requestOptions).subscribe((res)=>{
        this.carpetas= [...this.carpetas,res];
        if ( this.carpetas[0].length==0) {
          this.cargado=false;
        }
        else{
          this.cargado=true;
        }
        console.log(this.cargado)
        console.log(this.carpetas[0].length)
        console.log(this.carpetas)
      })
     
    }
  );


  
    const id = this.route.snapshot.paramMap.get('_id')
    this.id=id;
    this.Dato._id=this.id;
    console.log('aqui')
    console.log(this.requestOptions)
    this.dataservice.mostarNota(this.Dato,this.requestOptions).subscribe((res)=>{
      this.respuesta=res;
      this.titulo=this.respuesta.titulo;
      this.contenido=this.respuesta.descripcion;
      if (!this.respuesta.carpeta) {
        this.carpeta="Agregar a carpeta"
      }
      else{
        this.carpeta=this.respuesta.carpeta
      }
      
    })

  }


  async guardarcambio (){
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: `${this.mensaje}` ,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.router.navigate(
            ['/home'],
            {
              queryParams: { usuario: this.owner },
              queryParamsHandling: 'merge' }
            )
        },
      }],
    });

    await alert.present();
    let navTransition = alert.onDidDismiss()

    navTransition.then(()=>{
      this.router.navigate(['/home'],
            {
              queryParams: { usuario: this.owner },
              queryParamsHandling: 'merge' }
            )
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
            this.eliminar._id=this.id;
            this.dataservice.borrarNota(this.eliminar,this.requestOptions).subscribe((res)=>{
            })
            this.route.queryParams.subscribe(params => {
              this.owner = params['usuario'];
            }
          );
            this.router.navigate(['/home'],
            {
              queryParams: { usuario: this.owner },
              queryParamsHandling: 'merge' }
            )
          },
        },
      ],
    });

    await alert.present();
  }

  guardar(){
    this.cambio._id=this.id;
    this.cambio.descripcion=this.contenido;
    this.cambio.titulo=this.titulo;
    this.dataservice.editarcontenido(this.cambio,this.requestOptions).subscribe((res)=>{
      this.mensaje='Guardado con exito'
      this.guardarcambio();
     
    },(error)=>{
      this.mensaje=error.error.msg;
      this.guardarcambio();
    })

  }

  borrar(){
    this.presentAlert();
  }

  Volver(){
    this.route.queryParams.subscribe(params => {
      this.owner = params['usuario'];
    }
  );
    this.router.navigate(
      ['/home'],
      {
        queryParams: { usuario: this.owner },
        queryParamsHandling: 'merge' }
      )
  }

  addtocarpet(x:any){
    console.log(x.detail.value)
    this.addcolecc.nombrecarpeta=x.detail.value
    this.addcolecc.idnota=this.id
    console.log(this.addcolecc)
    this.dataservice.addtocarpet(this.addcolecc,this.requestOptions).subscribe((res)=>{

    })
  }
 
}
