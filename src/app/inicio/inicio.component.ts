import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  tema: Tema = new Tema()
  listaTemas: Tema[]
  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  idTema: number
  user: User = new User()
  idUser = environment.id
  key = 'data'
  reverse = true
  tituloPost: string
  nomeTema: string
  constructor(
    private router: Router,
    private temaService: TemaService,
    private userSerice: UserService,
    private postagemService: PostagemService,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == '') {
      alert('Sua seção expirou, faça login novamente!')
      this.router.navigate(['entrar'])
    }
    this.findAllTemas()
    this.findAllPostagens()
    this.findByUser()
  }


  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
    this.listaTemas = resp

    })
  }


  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  findAllPostagens() {
    //this.temaService.refreshToken()
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{


      this.listaPostagens = resp
      console.log(this.listaPostagens)
    })
  }

  findByUser(){
    console.log(this.idUser)
    this.temaService.refreshToken()
    this.userSerice.getByIdUser(this.idUser).subscribe((resp: User)=>{
      this.user = resp
      console.log(this.idUser)
    })
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.user = this.user

    console.log(this.postagem)
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
    this.postagem = resp
    this.alertasService.showAlertSuccess("Postagem realizada com sucesso")
    this.postagem = new Postagem()
    this.findAllPostagens()
    })
  }

  findByTituloPostagem() {
    if (this.tituloPost == '' ) {
      this.findAllPostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listaPostagens = resp
      })
    }
  }

  findByNomeTema() {
    if (this.nomeTema == '' ) {
      this.findAllPostagens()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[])=>{
        this.listaTemas = resp
      })
    }
  }
}
