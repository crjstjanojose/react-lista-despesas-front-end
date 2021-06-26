import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useState } from "react";
import { signIn } from "./backend";
import { IUsuario } from "./tipos";

const useStyles = makeStyles({
  error: {
    backgroundColor: "rgba(255,223,222)",
    padding: "6px;",
    marginTop: "8px",
    color: "rgb(255,0,0)",
    borderRadius: "3px",
  },
});

interface ILogin {
  onSign: (user: IUsuario) => void;
}

export function Login(props: ILogin) {
  const classes = useStyles();
  const [email, setEmail] = useState("usuario@email.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  function singIn(evt: React.FormEvent) {
    evt.preventDefault();
    signIn(email, password).then(
      (user) => {
        props.onSign(user);
      },
      (e) => {
        setError("E-mail não encontrado ou senha inválida");
      }
    );
  }

  return (
    <Container maxWidth="sm">
      <h1>Minhas Despesas</h1>
      <p>
        Digite e-mail e senha para entrar no sistema, Para testar, use o e-mail{" "}
        <kbd>usuario@email.com</kbd> e a senha <kbd>1234</kbd>.
      </p>
      <form onSubmit={singIn}>
        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          type="text"
          margin="dense"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="dense"
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box marginTop="10px" textAlign="right">
          <Button variant="contained" color="primary" type="submit">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
