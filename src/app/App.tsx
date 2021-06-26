import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { TelaDespesa } from "./TelaDespesas";
import { useEffect, useState } from "react";
import { checkUser, singOut } from "./backend";
import { IUsuario } from "./tipos";
import { Login } from "./Login";

function App() {
  const [user, setUser] = useState<IUsuario | null>(null);
  useEffect(() => {
    checkUser().then(
      (user) => {
        setUser(user);
      },
      () => setUser(null)
    );
  }, [user]);

  function onSignOut() {
    singOut();
  }

  if (user) {
    return (
      <HashRouter>
        <Switch>
          <Route path="/despesas/:mes">
            <TelaDespesa onSignOut={onSignOut} user={user}></TelaDespesa>;
          </Route>
        </Switch>
        <Redirect to={{ pathname: "/despesas/" + obterMesAtual() }} />
      </HashRouter>
    );
  } else {
    return <Login onSign={(user) => setUser(user)} />;
  }
}

function obterMesAtual(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
}

export default App;
