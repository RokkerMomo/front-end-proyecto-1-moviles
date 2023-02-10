import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Router, ActivatedRoute} from "@angular/router";
import { DataService} from '../services/data.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private dataservice:DataService,private actionSheetCtrl: ActionSheetController,private alertController: AlertController) { }

  id:string="";
  result:string="";

  Dato={
    "_id":"",
    }

    nombre:string="";
    apellido:string="";
    password:string="";
    usuario:string="";


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['usuario'];
    });
    this.Dato._id=this.id
    this.dataservice.MostrarPerfil(this.Dato).subscribe((res)=>{
      this.nombre=res.nombre;
      this.apellido=res.apellido
      this.password=res.password
      this.usuario=res.usuario
    })

  }

  async alerta (){
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: `El usuario fue borrado con exito` ,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Estas a punto de borrar tu cuenta',
      subHeader: 'Seguro que desea continuar ?',
      buttons: [{
        text: 'Borrar Cuenta',
        role: 'destructive',
        handler:()=>{
          this.dataservice.BorrarUsuario(this.Dato).subscribe((res)=>{
            this.alerta();
            this.router.navigate(['/login'])
          })
        }
      },
      {
        text: 'Cancelar',
      }],
    })

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
  }

}
