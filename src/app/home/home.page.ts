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
  orderObj:any ={}

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

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  ngOnInit() {
    this.owner='';
    this.cargarnotas();
  }

  cargarnotas(){
    this.route.queryParams.subscribe(params => {
        console.log(params);

        this.owner = params['usuario'];
      }
    );
    this.cargar.owner=this.owner;
    console.log(this.cargar)
    this.dataservice.getNotes(this.cargar).subscribe((res)=>{
      this.notas= [...this.notas,res];
      console.log(res);
      console.log(this.notas)
    })
  }

  salir(){
    this.router.navigate(['/login']);
  }

  nuevaNota(){
    this.route.queryParams.subscribe(params => {
      console.log(params);

      this.owner = params['usuario'];
    }
  );
  this.Dato.owner=this.owner;
    console.log(this.Dato);
    this.dataservice.crearNota(this.Dato).subscribe((res)=>{
      console.log(res);
      window.location.reload();
    })
  }

}
