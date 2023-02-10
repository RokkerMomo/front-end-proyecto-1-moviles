import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Router, ActivatedRoute} from "@angular/router";
import { DataService} from '../services/data.service';

const now = new Date();

@Component({
  selector: 'app-vercarpeta',
  templateUrl: './vercarpeta.page.html',
  styleUrls: ['./vercarpeta.page.scss'],
})
export class VercarpetaPage implements OnInit {

  constructor(private dataservice:DataService, private router:Router, private route:ActivatedRoute) { }

  notas:any = [];
  vacio:any = [];
  orderObj:any ={}
cargado:boolean=false;
carpeta:any="";

 cargar={
  carpeta:""
 }


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
  this.cargar.carpeta=this.carpeta;
  this.dataservice.mostrarcarpeta(this.cargar).subscribe((res)=>{
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
  this.dataservice.mostrarcarpeta(this.cargar).subscribe((res)=>{
    this.notas= [...this.notas,res];
    if ( this.notas[0].length==0) {
      this.cargado=false;
    }
    else{
      this.cargado=true;
    }
    
  })
  }

  

  


  
}
