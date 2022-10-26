import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { LogedguardService } from './header/logedguard.service';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProdutsComponent } from './produts/produts.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  { path: 'wishlist', component: WishlistComponent, canActivate:[LogedguardService]},
  { path: 'profile', component: ProfileComponent, canActivate:[LogedguardService]},
  { path: 'createprofile', component: CreateprofileComponent},
  { path: 'products', component: ProdutsComponent},


  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
