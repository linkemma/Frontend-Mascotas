import { AfterViewInit, Component,  ViewChild } from '@angular/core';
import { IMascotas } from 'src/app/interfaces/imascotas';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrls: ['./listado-mascotas.component.css']
})
export class ListadoMascotasComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'accion'];
  dataSource = new MatTableDataSource<IMascotas>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _mascotaService:MascotasService){}
  ngOnInit(): void{
    this.obtenerMascotas();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0){
      this.paginator._intl.itemsPerPageLabel = "Items por pagina";
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  obtenerMascotas(){
    this.loading = true;
    this._mascotaService.getMascotas().subscribe({
      next: (data) =>{
        this.loading = false;
        this.dataSource.data = data
      },
      error: (e)=> {
        this.loading = false;
        alert('Ops ha ocurrido un error con la api');
      },
      complete: () => console.info('Completo')
    })
  }
  EliminarMascota( id:number ){
    this.loading = true;
    this._mascotaService.deleteMascota(id).subscribe(()=>{
      this.mensajeExito();
      this.loading = false;
      this.obtenerMascotas();
    });
    //setTimeout(()=>{
    //  this.loading = false;
    //  this._snackBar.open('La mascota se elimino con exito','',{
    //    duration:4000,
    //    horizontalPosition:'right'
    //  });
    //},3000);
  }
  mensajeExito(){
    this._snackBar.open('La mascota se elimino con exito','',{
      duration:4000,
      horizontalPosition:'right'
    });
  }
}
