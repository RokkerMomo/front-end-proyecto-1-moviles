import { Component } from '@angular/core';
import { LoadingController, RefresherCustomEvent } from '@ionic/angular';
import { Router, ActivatedRoute} from "@angular/router";
import { DataService} from '../services/data.service';
import { HttpHeaders } from '@angular/common/http';

const now = new Date();




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {
  constructor(private dataservice:DataService, private router:Router, private route:ActivatedRoute, private loadingCtrl: LoadingController) { }

  notas:any = [];
  vacio:any = [];
  orderObj:any ={}
cargado:boolean=false;
 owner:any="";

respuesta:any={}


 cargar={
  owner:""
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

     
  this.dataservice.getNotes(this.cargar,this.requestOptions).subscribe((res)=>{
    this.notas= [...this.notas,res];
    if ( this.notas[0].length==0) {
      this.cargado=false;
    }
    else{
      this.cargado=true;
    }
    cargando.dismiss();
  })
    }


  ngOnInit() {
    this.owner='';
    this.notas =[];
    this.route.queryParams.subscribe(params => {
      this.owner = params['usuario'];
    }
  );
  this.route.queryParams.subscribe(params => {
    this.token = params['token'];
    this.headerDict.Authorization=`Bearer ${this.token}`
  }
);
  this.cargar.owner=this.owner;
    this.cargarContenido();
    
  }

  ionViewWillEnter(){
    this.owner='';
    this.notas =[];
    this.route.queryParams.subscribe(params => {
      this.owner = params['usuario'];
    }
  );
  this.route.queryParams.subscribe(params => {
    this.token = params['token'];
    this.headerDict.Authorization=`Bearer ${this.token}`
  }
);
  this.cargar.owner=this.owner;
    this.cargarContenido();

  }



  salir(){
    this.owner='';
    this.notas =[];
    this.router.navigate(['/login'])
  }

  perfil(){
    this.route.queryParams.subscribe(params => {
      this.owner = params['usuario'];
    }
  );
    this.router.navigate(
      ['/perfil'],
      {
        queryParams: { usuario: this.owner, token:this.token },
        queryParamsHandling: 'merge' }
      )
  }


  showcarpets(){
    this.route.queryParams.subscribe(params => {
      this.owner = params['usuario'];
    }
  );
    this.router.navigate(
      ['/carpetas'],
      {
        queryParams: { usuario: this.owner },
        queryParamsHandling: 'merge' }
      )
  }

  nuevaNota(){
    this.route.queryParams.subscribe(params => {
      this.owner = params['usuario'];
    }
  );
  this.Dato.owner=this.owner;
    this.dataservice.crearNota(this.Dato,this.requestOptions).subscribe((res)=>{
      this.respuesta=res;
      this.router.navigate([`home/${this.respuesta._id}`],
      {
        queryParams: { usuario: this.owner },
        queryParamsHandling: 'merge' })
    })
  }

}
