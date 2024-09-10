import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { VideoNewComponent } from './components/video-new/video-new.component';
import { VideoEditComponent } from './components/video-edit/video-edit.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { IdentityGuard } from './services/identity.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home/:page', component: HomeComponent },
    { path: 'signin', component: LoginComponent },
    { path: 'signout/:sure', component: LoginComponent },
    { path: 'signup', component: RegisterComponent },
    { path: 'settings', component: UserEditComponent, canActivate:[IdentityGuard] },
    { path: 'add-favorite', component: VideoNewComponent, canActivate:[IdentityGuard] },
    { path: 'edit-favorite/:id', component: VideoEditComponent, canActivate:[IdentityGuard] },
    { path: 'video/:id', component: VideoDetailComponent, canActivate:[IdentityGuard] },
    { path: 'error', component: ErrorComponent },
    { path: '**', component: ErrorComponent }
    
];
