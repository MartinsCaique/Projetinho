import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
    this.getFuncionarios()
  }

  isLoading: boolean = false;
  funcionarios: any = [];

  // Listar Funcionários
  getFuncionarios(){
    this.isLoading = true;
    fetch('http://localhost/empresa/funcionario/listar_funcionario.php')
    .then(response => response.json())
    .then(response => {
      this.funcionarios = response['funcionarios']
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  // Remover Funionários
  removerFuncionarios(CodFun: any){
    this.isLoading = true;
    fetch('http://localhost/empresa/funcionario/remover_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ CodFun: CodFun})
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
      console.log('excluiu');
    })
  }

  // Atualizar Funcionários
  isAtualizarOpen = false;

  setOpenAtualizar(isOpen: boolean) {
    this.isAtualizarOpen = isOpen;
  }

}
