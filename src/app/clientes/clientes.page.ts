import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage {

  isLoading: boolean = false;
  clientes: any;

  getClientes(){
    this.isLoading = true;
    fetch('http://localhost/api/clientes/listar.php')
      .then(resp => resp.json())
      .then(dados => {
        this.clientes = dados['clientes']
      })
      .catch(error =>{
        console.log(error)
      })
      .finally(() => {
        this.isLoading = false;
        console.log('Processo Finalizado')
      })
  }

  removerCliente(CodCLi: any){
    this.isLoading = true;
    fetch('http://localhost/api/clientes/remover.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ CodCli: CodCLi})
    })
      .then(resp => resp.json())
      .then(dados => {
        console.log(dados)
      })
      .catch(error =>{
        console.log(error)
      })
      .finally(() => {
        this.isLoading = false;
        console.log('Processo Finalizado Excluido')
      })
  }

}
