import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Router, ActivatedRoute} from "@angular/router";
import { DataService} from '../services/data.service';
import { ActionSheetController } from '@ionic/angular';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
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

    edicion={
      "_id":"",
      "nombre":"",
      "apellido":"",
      "usuario":"",
    }

    editpass={
      "_id":"",
      "actual":"",
      "nueva":""
    }

    nombre:string="";
    apellido:string="";
    password:string="";
    usuario:string="";

    respuesta:any={}
    token:string="";

    headerDict = {
      'Authorization': ``
    }

    errorres:any={

    }
    
     requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.headerDict), 
    };

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['usuario'];
    });
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.headerDict.Authorization=`Bearer ${this.token}`
    }
  );
    this.Dato._id=this.id
    this.dataservice.MostrarPerfil(this.Dato,this.requestOptions).subscribe((res)=>{
      this.respuesta=res
      this.nombre=this.respuesta.nombre
      this.apellido=this.respuesta.apellido
      this.password=this.respuesta.password
      this.usuario=this.respuesta.usuario
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
          this.dataservice.BorrarUsuario(this.Dato,this.requestOptions).subscribe((res)=>{
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


  async guardarcambio (){
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: `Guardado correctamente` ,
      buttons: ['OK'],
    });

    await alert.present();
  }

  editarusuario(){
    this.edicion._id=this.id
    this.edicion.nombre=this.nombre
    this.edicion.apellido=this.apellido
    this.edicion.usuario=this.usuario
    this.dataservice.editarUsuario(this.edicion,this.requestOptions).subscribe((res)=>{
      this.guardarcambio();
      this.route.queryParams.subscribe(params => {
        this.id = params['usuario'];
      }
    );
      this.router.navigate(
        ['/home'],
        {
          queryParams: { usuario: this.id },
          queryParamsHandling: 'merge' }
        )
    })
  }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Nueva Contrase??a',
      inputs: [
        {
          type:"password",
          name:'input1',
          placeholder: 'Contrase??a Actual',
        },
        {
          type:"password",
          name:'input2',
          placeholder: 'Contrase??a Nueva',
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
            this.editpass._id=this.id
            this.editpass.actual=alertData.input1
            this.editpass.nueva=alertData.input2
        this.dataservice.editarpass(this.editpass,this.requestOptions).subscribe((res)=>{
          this.route.queryParams.subscribe(params => {
            this.id = params['usuario'];
          }
        );
          this.router.navigate(
            ['/home'],
            {
              queryParams: { usuario: this.id },
              queryParamsHandling: 'merge' }
            )
        },(error)=>{
          this.errorres=error
          this.error()
        })
          },
        },
      ]
    });

    await alert.present();
  }


  async error (){
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: `${this.errorres.error.msg}` ,
      buttons: ['OK'],
    });

    await alert.present();
  }

  changepass(){
    this.presentAlert()
  }

}
