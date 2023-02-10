import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Router, ActivatedRoute} from "@angular/router";
import { DataService} from '../services/data.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-viewnoteincarpet',
  templateUrl: './viewnoteincarpet.page.html',
  styleUrls: ['./viewnoteincarpet.page.scss'],
})
export class ViewnoteincarpetPage implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private dataservice:DataService, private alertController: AlertController ) { }

  id:any = "";

  owner:any ="";
  mensaje:string ="";
  carpeta:string="";

  carpetas:any = [];

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
      this.datocolecc.owner=this.owner
      console.log(this.datocolecc)
      this.dataservice.mostrarcoleccion(this.datocolecc).subscribe((res)=>{
        this.carpetas= [...this.carpetas,res];
        console.log(this.carpetas)
      })
    }
  );


  
    const id = this.route.snapshot.paramMap.get('_id')
    this.id=id;
    this.Dato._id=this.id;
    this.dataservice.mostarNota(this.Dato).subscribe((res)=>{
      this.titulo=res.titulo;
      this.contenido=res.descripcion;
      if (!res.carpeta) {
        this.carpeta="Agregar a carpeta"
      }
      else{
        this.carpeta=res.carpeta
      }
      
    })

  }


  async guardarcambio (){
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: `${this.mensaje}` ,
      buttons: ['OK'],
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
            this.eliminar._id=this.id;
            this.dataservice.borrarNota(this.eliminar).subscribe((res)=>{
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
    this.dataservice.editarcontenido(this.cambio).subscribe((res)=>{
      this.mensaje=res.msg;
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
      ['/vercarpeta'],
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
    this.dataservice.addtocarpet(this.addcolecc).subscribe((res)=>{

    })
  }
 
}
