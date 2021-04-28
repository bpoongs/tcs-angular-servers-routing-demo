import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { ServersComponent } from './servers/servers.component'
import { ServerComponent } from './servers/server/server.component'
import { EditServerComponent } from './servers/edit-server/edit-server.component'
import { UsersComponent } from './users/users.component'
import { UserComponent } from './users/user/user.component'
import { ErrorPageComponent } from './error-page/error-page.component'
import { AuthGuard } from './auth-guard.service';
import { ServerResolver } from './servers/server/server-resolver.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'servers',
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent, resolve: { server: ServerResolver }
      },
      {
        path: ':id/edit',
        component: EditServerComponent, canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  {
    path: 'users',
    component: UsersComponent  ,
    children:[
      {
        path:'user',
        component:UserComponent
      }
    ] 
  }, 
  {
    path: 'server',
    component: ServerComponent  
  },  
  {
    path: 'not-found',
    component: ErrorPageComponent, data: { message: 'Page not found!' }
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
