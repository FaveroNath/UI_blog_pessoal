import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPostagem: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
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
  }

  findByIdPostagem(id: number) {
    this.postagemService.getIdPostagem(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }

  apagar() {
    this.postagemService.deletePostagem(this.idPostagem).subscribe(()=>{
      this.alertasService.showAlertSuccess("Postagem apagada com sucesso!")
      this.router.navigate(['/inicio'])
    })
  }
  
}
