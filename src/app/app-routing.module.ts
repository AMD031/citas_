import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './services/guards/authguard/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: SigninComponent },
  { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard] },
  { path: '**', component: SigninComponent,  pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
