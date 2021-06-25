import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { TelaDespesa } from "./TelaDespesas";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/despesas/:mes">
          <TelaDespesa></TelaDespesa>;
        </Route>
      </Switch>
      <Redirect to={{ pathname: "/despesas/" + obterMesAtual() }} />
    </HashRouter>
  );
}

function obterMesAtual(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
}

export default App;
