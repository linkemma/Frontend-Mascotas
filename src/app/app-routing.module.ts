import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarMascotasComponent } from './components/agregar-editar-mascotas/agregar-editar-mascotas.component';
import { ListadoMascotasComponent } from './components/listado-mascotas/listado-mascotas.component';
import { VerMascotasComponent } from './components/ver-mascotas/ver-mascotas.component';

const routes: Routes = [
  { path: '', redirectTo: 'ListaMascotas', pathMatch: 'full'},
  {path:'ListaMascotas', component: ListadoMascotasComponent},
  {path:'AgregarMascota', component: AgregarEditarMascotasComponent},
  {path:'VerMascota/:id', component: VerMascotasComponent},
  {path:'EditarMascota/:id', component: AgregarEditarMascotasComponent},
  {path: '**', redirectTo: 'ListaMascotas', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
