import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { GalleryComponent } from './views/gallery/gallery.component'
import { CadastroComponent } from './views/cadastro/cadastro.component'
import { UserComponent } from './views/user/user.component'
import { ScoreComponent } from './views/score/score.component'


const routes: Routes = [
  {path: '', component: HomeComponent}, 
  {path: 'about', component: AboutComponent},
  {path: 'gallery', component: GalleryComponent },
  {path: 'cadastro', component: CadastroComponent },
  {path: 'user', component: UserComponent},
  {path: 'score', component:ScoreComponent},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
