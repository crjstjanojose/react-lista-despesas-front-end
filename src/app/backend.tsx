import { IDespesa, IUsuario } from "./tipos";

export function buscaDespesas(anoMes: string): Promise<IDespesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${anoMes}&_sort=dia`, {
    credentials: "include",
  }).then(handleResponse);
}

export function checkUser(): Promise<IUsuario> {
  return fetch(`http://localhost:3001/sessao/usuario`, {
    credentials: "include",
  }).then(handleResponse);
}

export function signIn(email: string, senha: string): Promise<IUsuario> {
  return fetch(`http://localhost:3001/sessao/criar`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  }).then(handleResponse);
}

export function singOut(): Promise<IUsuario> {
  return fetch(`http://localhost:3001/sessao/finalizar`, {
    method: "POST",
    credentials: "include",
  }).then(handleResponse);
}

function handleResponse(response: Response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
}
