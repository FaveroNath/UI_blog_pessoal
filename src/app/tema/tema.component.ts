import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  tema: Tema = new Tema()
  listaTemas: Tema[]
  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    //console.log(environment.token)
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }
    if(environment.tipo != 'adm') {
      this.alertas.showAertInfo('Você precisa ser adm para entrar nessa rota')
      environment.token = ''
      this.router.navigate(['/entrar'])
    }
    this.temaService.refreshToken()
    this.findAllTemas()
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp

    })
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema) =>{
      this.tema = resp
      alert('Tema cadastrado com sucesso')
      this.findAllTemas()
      this.tema = new Tema()
    })
  }

}
