import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMascotas } from 'src/app/interfaces/imascotas';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-ver-mascotas',
  templateUrl: './ver-mascotas.component.html',
  styleUrls: ['./ver-mascotas.component.css']
})
export class VerMascotasComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  id!: number;
  mascota!: IMascotas;
  routeSub!: Subscription;
  constructor(private _mascotaService: MascotasService,
                private aRoute: ActivatedRoute){
                  //this.id = +this.aRoute.snapshot.paramMap.get('id')!;// el mas es para volverlo un numero
                }
  ngOnInit():void{
    this.routeSub = this.aRoute.params.subscribe(data =>{
      this.id = data['id'];
      this.obtenerMascota();
    })
  }

  ngOnDestroy(): void{
    this.routeSub.unsubscribe();
  }

  obtenerMascota(){
    this._mascotaService.getMascota(this.id).subscribe({
      next: (data) =>{
        this.loading = false;
        this.mascota = data;
      },
      error: (e)=> {
        this.loading = false;
        alert('Ops ha ocurrido un error con la api');
      },
      complete: () => console.info('Completo')
    })
  }
}
