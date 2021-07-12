import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }

  getAllTema(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://blogpessoalnathalia.herokuapp.com/tema', this.token)
  }

  getByIdTema(id: number): Observable<Tema>{
    return this.http.get<Tema>(`https://blogpessoalnathalia.herokuapp.com/tema/${id}`, this.token)
  }

  postTema(tema: Tema): Observable<Tema>{
    console.log(this.token)
    return this.http.post<Tema>('https://blogpessoalnathalia.herokuapp.com/tema', tema, this.token)
  }

  putTema(tema: Tema, id: number): Observable<Tema>{
    return this.http.put<Tema>(`https://blogpessoalnathalia.herokuapp.com/tema/update/${id}`, tema, this.token)
  }

  deleteTema(id: number) {
    return this.http.delete(`https://blogpessoalnathalia.herokuapp.com/tema/delete/${id}`, this.token)
  }
}
