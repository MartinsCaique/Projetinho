import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';
import { error } from 'console';

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
  form: any = {
    codigo: '',
    nome: '',
    sobrenome: '',
    cargo: '',
    dataNasc: '',
    endereco: '',
    cidade: '',
    cep: '',
    pais: '',
    fone: '',
    salario: '',
  };



  // Listar Funcionários
  getFuncionarios(){
    this.isLoading = true;
    let funcionario = { CodFun: '123' };
    fetch('http://localhost/empresa/funcionario/listar_funcionario.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(funcionario)
    })
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
    let funcionario = { CodFun: CodFun };
    fetch('http://localhost/empresa/funcionario/remover_funcionario.php',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(funcionario)
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
      this.getFuncionarios();
    })
  }

  // Atualizar Funcionários
  isAtualizarOpen = false;

  setOpenAtualizar(isOpen: boolean, codigo: number | null) {
    this.isAtualizarOpen = isOpen;
    console.log(codigo)
    if (codigo) {
      this.pegarDados(codigo)
    }
  }


  pegarDados(codigo: number) {
    fetch(`http://localhost/empresa/funcionario/pegar_funcionario.php?codigo=${codigo}`,
    {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(dados=> {
      console.log(dados)
      this.form.codigo = dados.funcionarios[0].CodFun
      this.form.sobrenome = dados.funcionarios[0].Sobrenome
      this.form.nome = dados.funcionarios[0].Nome
      this.form.cargo = dados.funcionarios[0].Cargo
      this.form.dataNasc = dados.funcionarios[0].DataNasc
      this.form.endereco = dados.funcionarios[0].Endereco
      this.form.cidade = dados.funcionarios[0].Cidade
      this.form.cep = dados.funcionarios[0].CEP
      this.form.pais = dados.funcionarios[0].Pais
      this.form.fone = dados.funcionarios[0].Fone
      this.form.salario = dados.funcionarios[0].Salario
    })
    .catch(error=> {
      console.log(error)
    })
    .finally(()=>{
        this.isLoading = false;
        console.log('pegou');
      }
    )
  }

  enviarDados(evento: any){
    evento.preventDefault()
    fetch('http://localhost/empresa/funcionario/atualizar_funcionario.php',
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.form)
    })
   .then(response => response.json())
   .then(response =>{
    console.log(response)
   })
   .catch(error=>{
    console.log(error)
   })
   .finally(()=> {
    this.isLoading = false
    this.getFuncionarios()
    console.log('funcionou')
  })
  }

  // Inserir Funcionários
  isInserirOpen = false;

  setOpenInserir(isOpen: boolean) {
    this.isInserirOpen = isOpen;
  }

  inserirFuncionario(dados: any){
    fetch('http://localhost/empresa/funcionario/inserir_funcionario.php',
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Nome: dados.nome,
      Sobrenome: dados.sobrenome,
      Cargo: dados.cargo,
      Salario: dados.salario,
      DataNasc: dados.dataNasc,
      Cidade: dados.cidade,
      CEP: dados.cep,
      Endereco: dados.endereco,
      Fone: dados.fone,
    })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      this.isLoading = false
      this.getFuncionarios()
    })
  }
}



