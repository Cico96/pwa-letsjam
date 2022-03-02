import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HomeComponent } from './pages/home/home.component';
import { MusicSheetCardComponent } from './components/music-sheet-card/music-sheet-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BASE_PATH } from './services/configuration-api/variables';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AllMusicSheetsComponent } from './pages/all-music-sheets/all-music-sheets.component';
import { AllSongsComponent } from './pages/all-songs/all-songs.component';
import { CreateUploadComponent } from './pages/create-upload/create-upload.component';
import { MusicSheetComponent } from './pages/music-sheet/music-sheet.component';
import { SongComponent } from './pages/song/song.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SongCardComponent } from './components/song-card/song-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { FlatComponent } from './components/flat/flat.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProfileComponent } from './pages/profile/profile.component';
import { RearrangeMusicSheetComponent } from './pages/rearrange-music-sheet/rearrange-music-sheet.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MusicSheetCardComponent,
    RegisterComponent,
    LoginComponent,
    AllMusicSheetsComponent,
    AllSongsComponent,
    CreateUploadComponent,
    MusicSheetComponent,
    SongComponent,
    AboutUsComponent,
    SongCardComponent,
    UserCardComponent,
    FlatComponent,
    ProfileComponent,
    RearrangeMusicSheetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'it',
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: environment.BASE_PATH
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
