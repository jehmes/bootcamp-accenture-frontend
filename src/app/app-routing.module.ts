import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { GalleryComponent } from './views/gallery/gallery.component'
import { CadastroComponent } from './views/cadastro/cadastro.component'
import { UserComponent } from './views/user/user.component'
import { ScoreComponent } from './views/score/score.component'
import { AdmLoginComponent } from './adm/adm-login/adm-login.component'
import { AdmCrudComponent } from './adm/adm-crud/adm-crud.component'
import { UserHomeComponent } from './adm//user/user-home/user-home.component'
import { DepositoHomeComponent } from './adm/deposito/deposito-home/deposito-home.component'
import { DepositoCreateComponent } from './adm/deposito/deposito-create/deposito-create.component'
import { DepositoUpdateComponent } from './adm/deposito/deposito-update/deposito-update.component'
import { ShopComponent } from './views/shop/shop/shop.component'
import { StoreComponent } from './views/shop/store/store.component'
import { ProductHomeComponent } from './adm/products/product-home/product-home.component'
import { ProductUpdateComponent } from './adm/products/product-update/product-update.component'
import { ProductCreateComponent } from './adm/products/product-create/product-create.component'

import { AuthGuardUserNotLog } from './guard/authUserNotLog.guard';
import { AuthGuardUserLog } from './guard/authUserLog.guard';
import { AuthAdmNotLogGuard } from './guard/authAdmNotLog.guard';
import { AuthAdmLogGuard } from './guard/authAdmLog.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  {
    path: 'cadastro', component: CadastroComponent,
    canActivate: [AuthGuardUserNotLog]
  },
  { path: 'edit-user', canActivate: [AuthAdmNotLogGuard, AuthGuardUserLog], component: UserComponent },
  { path: 'score', component: ScoreComponent },
  {
    path: 'administrador', component: AdmLoginComponent,
    canActivate: [AuthGuardUserNotLog, AuthAdmNotLogGuard]
  },
  {
    path: 'adm-crud', component: AdmCrudComponent, canActivate: [AuthAdmLogGuard], children: [
      { path: 'home-user', canActivate: [AuthAdmLogGuard], component: UserHomeComponent },
      { path: 'home-deposito', canActivate: [AuthAdmLogGuard], component: DepositoHomeComponent },
      { path: 'create-deposito', canActivate: [AuthAdmLogGuard], component: DepositoCreateComponent },
      { path: 'upgrade-deposito', canActivate: [AuthAdmLogGuard], component: DepositoUpdateComponent },
      { path: 'home-product', canActivate: [AuthAdmLogGuard], component: ProductHomeComponent},
      { path: 'upgrade-product', canActivate: [AuthAdmLogGuard], component: ProductUpdateComponent},
      { path: 'create-product', canActivate: [AuthAdmLogGuard], component: ProductCreateComponent},
    ]
  },
  { path: 'shop', component: ShopComponent },
  { path: 'store', component: StoreComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
