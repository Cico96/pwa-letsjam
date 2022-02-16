import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {CreateUploadComponent} from "./pages/create-upload/create-upload.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {AllSongsComponent} from "./pages/all-songs/all-songs.component";
import { AllMusicSheetsComponent } from './pages/all-music-sheets/all-music-sheets.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'musicsheets',
    component: AllMusicSheetsComponent
  },
  {
    path: 'songs',
    component: AllSongsComponent
  },
  {
    path: 'create-upload',
    component: CreateUploadComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
