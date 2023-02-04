import { Component } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Router } from "@angular/router";
import { DataService} from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private dataservice:DataService, private router:Router) { }

  notas:any = [];

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  ngOnInit() {
    this.dataservice.getNotes().subscribe((res)=>{
      this.notas= [...this.notas,res];
      console.log(res);
      console.log(this.notas)
    })
  }

  salir(){
    this.router.navigate(['/login']);
  }

}
