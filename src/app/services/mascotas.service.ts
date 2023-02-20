import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IMascotas } from '../interfaces/imascotas';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Mascotas';

  constructor(public http: HttpClient) { }

  getMascotas(): Observable<IMascotas[]>{
    return this.http.get<IMascotas[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  getMascota(id : number): Observable<IMascotas>{
    return this.http.get<IMascotas>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
  deleteMascota(id : number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
  addMascota(mascota:IMascotas): Observable<IMascotas>{
    return this.http.post<IMascotas>(`${this.myAppUrl}${this.myApiUrl}`,mascota);
  }
  updateMascota(id:number, mascota:IMascotas):Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`,mascota);
  }
}
