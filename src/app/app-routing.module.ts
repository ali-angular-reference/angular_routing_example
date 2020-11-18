import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerResolver } from './servers/server/server-resolver.service';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

// handle all the routing 
const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'users', component: UsersComponent,children:[
      { path: ':id/:name', component: UserComponent}, 
    ]},
    // making children routes or nested routing
    // Can only go servers child route only if AuthGuard returns true (if logged in)
    { path: 'servers',
        // canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: ServersComponent,
        children:[ 
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}}, // there's now a server property in the data property
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}, // the guard will run whenever we try to leave the path
    ]},
    // { path: 'not-found', component: PageNotFoundComponent},
    { path: 'not-found', component: ErrorPageComponent, data: {message:'Page not found'}},
    { path: '**', redirectTo: '/not-found'} // catch all unknown paths (has to be at the end)
];

@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, {useHash: true}) // configure the route setup
        RouterModule.forRoot(appRoutes) // configure the route setup
    ],
    // if I add to the imports of another module what should be accessable to that module
    exports: [RouterModule]
})

export class AppRoutingModule{}