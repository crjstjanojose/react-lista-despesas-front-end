import { IDespesa } from "./tipos";

export function buscaDespesa(anoMes: string): Promise<IDespesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${anoMes}&_sort=dia`).then(
    (response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    }
  );
}
