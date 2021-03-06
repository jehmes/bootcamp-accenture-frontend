import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { MatSliderModule } from '@angular/material/slider';
import { FooterComponent } from './components/template/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './views/home/home.component';
import { NavContentComponent } from './views/nav-content/nav-content.component';
import { AboutComponent } from './views/about/about.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserComponent } from './views/user/user.component';
import { ScoreComponent } from './views/score/score.component';
import { AdmLoginComponent } from './adm/adm-login/adm-login.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { AdmCrudComponent } from './adm/adm-crud/adm-crud.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserHomeComponent } from './adm/user/user-home/user-home.component';
import {MatMenuModule} from '@angular/material/menu';
import { DepositoHomeComponent } from './adm/deposito/deposito-home/deposito-home.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { PopupConfirmComponent } from './components/popup-confirm/popup-confirm.component';
import { DepositoCreateComponent } from './adm/deposito/deposito-create/deposito-create.component';
import { DepositoUpdateComponent } from './adm/deposito/deposito-update/deposito-update.component';
import { ShopComponent } from './views/shop/shop/shop.component';
import { StoreComponent } from './views/shop/store/store.component';
import { ProductHomeComponent } from './adm/products/product-home/product-home.component';
import { ProductUpdateComponent } from './adm/products/product-update/product-update.component';
import { ProductCreateComponent } from './adm/products/product-create/product-create.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DepositosComponent } from './views/depositos/depositos.component';


  



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavContentComponent,
    AboutComponent,
    GalleryComponent,
    CadastroComponent,
    UserComponent,
    ScoreComponent,
    AdmLoginComponent,
    AdmCrudComponent,
    UserHomeComponent,
    DepositoHomeComponent,
    PopUpComponent,
    PopupConfirmComponent,
    DepositoCreateComponent,
    DepositoUpdateComponent,
    ShopComponent,
    StoreComponent,
    ProductHomeComponent,
    ProductUpdateComponent,
    ProductCreateComponent,
    DepositosComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    YouTubePlayerModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
