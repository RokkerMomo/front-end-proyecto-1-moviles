import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Router, ActivatedRoute} from "@angular/router";
import { DataService} from '../services/data.service';

@Component({
  selector: 'app-viewnote',
  templateUrl: './viewnote.page.html',
  styleUrls: ['./viewnote.page.scss'],
})
export class ViewnotePage implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private dataservice:DataService) { }

  id:any = "";

  owner:any ="";

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
    const id = this.route.snapshot.paramMap.get('_id')
    this.id=id;
    this.Dato._id=this.id;
    console.log(this.Dato._id);
    this.dataservice.mostarNota(this.Dato).subscribe((res)=>{
      this.titulo=res.titulo;
      this.contenido=res.descripcion;
      console.log(res);
    })

  }

  guardar(){
    this.cambio._id=this.id;
    this.cambio.descripcion=this.contenido;
    this.cambio.titulo=this.titulo;
    console.log(this.cambio);
    this.dataservice.editarcontenido(this.cambio).subscribe((res)=>{
      console.log(res);
    })

  }

  borrar(){
    this.eliminar._id=this.id;
    console.log(this.eliminar._id)
    this.dataservice.borrarNota(this.eliminar).subscribe((res)=>{
      console.log(res);
    })
    this.router.navigate(['/home'])
  .then(() => {
    window.location.reload();
  });
  }

  Volver(){
    this.route.queryParams.subscribe(params => {
      console.log(params);

      this.owner = params['usuario'];
    }
  );
    this.router.navigate(
      ['/home'],
      {
        queryParams: { usuario: this.owner },
        queryParamsHandling: 'merge' }
      )
      .then(() => {
    window.location.reload();
  });
  }

}
