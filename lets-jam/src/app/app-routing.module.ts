import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {CreateUploadComponent} from "./pages/create-upload/create-upload.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {AllSongsComponent} from "./pages/all-songs/all-songs.component";
import {AllMusicSheetsComponent} from './pages/all-music-sheets/all-music-sheets.component';
import {MusicSheetComponent} from './pages/music-sheet/music-sheet.component';
import {SongComponent} from "./pages/song/song.component";
import {AuthGuardService} from './services/guards/auth-guard.service';
import {ProfileComponent} from "./pages/profile/profile.component";
import {RearrangeMusicSheetComponent} from './pages/rearrange-music-sheet/rearrange-music-sheet.component';
import {ModifyProfileComponent} from "./pages/modify-profile/modify-profile.component";

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
    component: AllMusicSheetsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'songs',
    component: AllSongsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'song/:id',
    component: SongComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'create-upload',
    component: CreateUploadComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'musicSheet/:id',
    component: MusicSheetComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'modify-profile',
    component: ModifyProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'rearrangeMusicSheet/:id',
    component: RearrangeMusicSheetComponent,
    canActivate: [AuthGuardService,]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
