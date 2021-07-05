import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  tema: Tema =new Tema()
  listaTemas : Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

    findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
    this.listaTemas = resp

    })
  }

  ngOnInit() {
    if(environment.token == '') {
      alert('Sua seção expirou, faça login novamente!')
      this.router.navigate(['entrar'])
    }
    this.findAllTemas()
  }

}
