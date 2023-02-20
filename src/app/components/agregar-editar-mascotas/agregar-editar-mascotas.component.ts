import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IMascotas } from 'src/app/interfaces/imascotas';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-agregar-editar-mascotas',
  templateUrl: './agregar-editar-mascotas.component.html',
  styleUrls: ['./agregar-editar-mascotas.component.css']
})
export class AgregarEditarMascotasComponent {
  loading: boolean = false;
  form: FormGroup;
  id: number;
  tituloPagina: string = 'Agregar Mascota';

  constructor(private fb: FormBuilder,
                      private _mascotaServise: MascotasService,
                      private _snackBar: MatSnackBar,
                      private router: Router,
                      private aRoute: ActivatedRoute){
    this.form = this.fb.group({
      nombre: ['',Validators.required],
      raza: ['',Validators.required],
      color: ['',Validators.required],
      edad: ['',Validators.required],
      peso: ['',Validators.required],
    })
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void{
    if(this.id != 0){
      this.tituloPagina = 'Editar Mascota';
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id:number){
    this._mascotaServise.getMascota(this.id).subscribe({
      next: (data) =>{
        this.loading = false;
        this.form.setValue({ //patchValue no obliga a todos los campos vs setValue ese si
          nombre : data.nombre,
          raza : data.raza,
          color : data.color,
          edad : data.edad,
          peso : data.peso
        })
      },
      error: (e)=> {
        this.loading = false;
        alert('Ops ha ocurrido un error con la api');
      },
      complete: () => console.info('Completo')
    })
  }

  AgregarEditarMascota(){
    const mascota: IMascotas = {
      nombre : this.form.value.nombre,
      raza : this.form.value.raza,
      color : this.form.value.color,
      edad : this.form.value.edad,
      peso : this.form.value.peso
    }
    if(this.id != 0){
      this.EditarMascota(this.id,mascota);
    }else{
      this.AgregarMascota(mascota);
    }
  }
  EditarMascota(id:number, mascota:IMascotas){
    mascota.id = this.id;
    this._mascotaServise.updateMascota(id, mascota).subscribe(data =>{
      this.mensajeExito("Edito");
      this.router.navigate(['ListaMascotas']);
    })
  }
  AgregarMascota(mascota: IMascotas){
    // Se envia el objeto al Backend
    this._mascotaServise.addMascota(mascota).subscribe(data =>{
      this.mensajeExito("Agrego");
      this.router.navigate(['ListaMascotas']);
    });
  }
  mensajeExito(Accion: string){
    this._snackBar.open(`La mascota se  ${Accion}  con exito`,'',{
      duration:4000,
      horizontalPosition:'right'
    });
  }
}
