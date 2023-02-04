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

  Dato={
    "_id": "",
    }

    titulo:string="";
    contenido:string ="";

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('_id')
    this.id=id;
    this.Dato._id=this.id;
    console.log(this.Dato);
    console.log(id);
    this.dataservice.mostarNota(this.Dato).subscribe((res)=>{
      this.titulo=res.titulo;
      this.contenido=res.descripcion;
      console.log(res);
    })

  }

}
