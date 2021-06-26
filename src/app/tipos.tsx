export interface IDespesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}
