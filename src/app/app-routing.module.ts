import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home/:_id',
    loadChildren: () => import('./viewnote/viewnote.module').then( m => m.ViewnotePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'carpetas',
    loadChildren: () => import('./carpetas/carpetas.module').then( m => m.CarpetasPageModule)
  },
  {
    path: 'vercarpeta',
    loadChildren: () => import('./vercarpeta/vercarpeta.module').then( m => m.VercarpetaPageModule)
  },
  {
    path: 'vercarpeta/:_id',
    loadChildren: () => import('./viewnoteincarpet/viewnoteincarpet.module').then( m => m.ViewnoteincarpetPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
