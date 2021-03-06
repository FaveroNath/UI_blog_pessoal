import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  idPostagem: number
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alertasService: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == '') {
      this.alertasService.showAertInfo('Sua seção expirou, faça login novamente!')
      this.router.navigate(['entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.idPostagem = id
    this.findAllTemas()
  }

  findByIdPostagem(id: number) {
    this.postagemService.getIdPostagem(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }
  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }
  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }
  atualizar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.idPostagem ,this.postagem).subscribe((resp:Postagem)=>{
      this.postagem = resp
      this.alertasService.showAlertSuccess('Postagem atualizada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }
}
