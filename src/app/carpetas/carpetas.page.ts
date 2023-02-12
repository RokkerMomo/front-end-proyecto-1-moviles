import { Component, OnInit } from '@angular/core';
import { DataService} from '../services/data.service';
import { Router, ActivatedRoute} from "@angular/router";
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-carpetas',
  templateUrl: './carpetas.page.html',
  styleUrls: ['./carpetas.page.scss'],
})
export class CarpetasPage implements OnInit {

  constructor(private dataservice:DataService,private router:Router, private route:ActivatedRoute, private alertController: AlertController) {}

  carpetas:any = [];

  carpeta={
    "owner":"",
    "nombre":""
  }
  dato={
    "owner":"",
  }

  token:string="";

  headerDict = {
   'Authorization': ``
 }
 
  requestOptions = {                                                                                                                                                                                 
   headers: new HttpHeaders(this.headerDict), 
 };

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.dato.owner = params['usuario'];
    });
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.headerDict.Authorization=`Bearer ${this.token}`
    }
  );
    this.dataservice.mostrarcoleccion(this.dato,this.requestOptions).subscribe((res)=>{
      this.carpetas= [...this.carpetas,res];
    })
  }

  ionViewWillEnter(){
    this.carpetas=[]
    this.route.queryParams.subscribe(params => {
      this.dato.owner = params['usuario'];
    });
    this.dataservice.mostrarcoleccion(this.dato,this.requestOptions).subscribe((res)=>{
      this.carpetas= [...this.carpetas,res];
    })
  }

  mostrar(x:any){
    console.log(x)
    this.router.navigate(
      ['/vercarpeta'],
      {
        queryParams: { carpeta: x },
        queryParamsHandling: 'merge' }
      );
      }

      async presentAlert() {
        const alert = await this.alertController.create({
          header: 'Nueva carpeta',
          message: `Ingresar el nombre de la carpeta` ,
          inputs: [
            {
              name:'input1',
              placeholder: 'Name',
            },
          ],
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
              handler: (alertData) => {
                this.crear(alertData.input1);
              },
            },
          ]
        });
    
        await alert.present();
      }
  
      agregar(){
        this.presentAlert()
      }

      crear(x:any){
        this.carpeta.owner=this.dato.owner
        this.carpeta.nombre=x
        this.dataservice.crearcoleccion(this.carpeta,this.requestOptions).subscribe((res)=>{
          this.router.navigate(
            ['/vercarpeta'],
            {
              queryParams: { carpeta: x },
              queryParamsHandling: 'merge' }
            );
        })
      }

}
