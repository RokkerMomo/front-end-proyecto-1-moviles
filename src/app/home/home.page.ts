import { Component } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Router, ActivatedRoute} from "@angular/router";
import { DataService} from '../services/data.service';

const now = new Date();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {
  constructor(private dataservice:DataService, private router:Router, private route:ActivatedRoute) { }

  notas:any = [];
  vacio:any = [];
  orderObj:any ={}
cargado:boolean=false;
 owner:any="";

 cargar={
  owner:""
 }


  Dato={
    owner:"",
    titulo:"Nueva Nota",
    descripcion:"",
    fecha:now.toLocaleString()
    }


  ngOnInit() {
    this.owner='';
    this.notas =[];
    this.route.queryParams.subscribe(params => {
      this.owner = params['usuario'];
    }
  );
  this.cargar.owner=this.owner;
  this.dataservice.getNotes(this.cargar).subscribe((res)=>{
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
    this.owner='';
    this.notas =[];
    this.route.queryParams.subscribe(params => {
      this.owner = params['usuario'];
    }
  );
  this.cargar.owner=this.owner;
  this.dataservice.getNotes(this.cargar).subscribe((res)=>{
    this.notas= [...this.notas,res];
    if ( this.notas[0].length==0) {
      this.cargado=false;
    }
    else{
      this.cargado=true;
    }
    
  })

  }



  salir(){
    this.owner='';
    this.notas =[];
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });;
  }

  perfil(){
    this.route.queryParams.subscribe(params => {
      this.owner = params['usuario'];
    }
  );
    this.router.navigate(
      ['/perfil'],
      {
        queryParams: { usuario: this.owner },
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
    this.dataservice.crearNota(this.Dato).subscribe((res)=>{
      this.router.navigate([`home/${res._id}`],
      {
        queryParams: { usuario: this.owner },
        queryParamsHandling: 'merge' })
    })
  }

}
