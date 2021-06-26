import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useEffect, useState } from "react";
import { buscaDespesas } from "./backend";
import { IDespesa, IUsuario } from "./tipos";
import { useParams, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles({
  userDetails: {
    borderBottom: "1px solid rgb(224,224,224)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "8px",
    "& >*": {
      marginBottom: "8px",
    },
  },
  root: {
    flexGrow: 1,
  },
});

const meses = [
  { valor: "01", nome: "Janeiro" },
  { valor: "02", nome: "Fevereiro" },
  { valor: "03", nome: "Março" },
  { valor: "04", nome: "Abril" },
  { valor: "05", nome: "Maio" },
  { valor: "06", nome: "Junho" },
  { valor: "07", nome: "Julho" },
  { valor: "08", nome: "Agosto" },
  { valor: "09", nome: "Setembro" },
  { valor: "10", nome: "Outubro" },
  { valor: "11", nome: "Novembro" },
  { valor: "12", nome: "Dezembro" },
];

interface ITelaDespesaProps {
  onSignOut: () => void;
  user: IUsuario;
}

export function TelaDespesa(props: ITelaDespesaProps) {
  const params = useParams<{ mes: string }>();
  const history = useHistory();
  const anoMes = params.mes;
  const [ano, mes] = anoMes.split("-");

  const [despesas, setDespesas] = useState<IDespesa[]>([]);

  useEffect(() => {
    buscaDespesas(anoMes).then((despesas) => setDespesas(despesas));
  }, [anoMes]);

  let valorTotal = 0;
  for (const despesa of despesas) {
    valorTotal += despesa.valor;
  }

  function changeYearMonth(ano: string, mes: string) {
    history.push(`/despesas/${ano}-${mes}`);
  }

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Agrupamento

  return (
    <Box padding="5px 30px" justifyContent="center">
      <Box display="flex">
        <Box flex="1">
          <h3>Detalhe das Despesas</h3>
        </Box>
        <Box>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <div className={classes.userDetails}>
              <Avatar>
                <Icon>person</Icon>
              </Avatar>
              <div>{props.user.nome}</div>
              <small>{props.user.email}</small>
            </div>
            <MenuItem onClick={props.onSignOut}>Sair</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box display="flex">
        <Box flex="1">
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Ano</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={ano}
              onChange={(e) => changeYearMonth(e.target.value as string, mes)}
              label="Ano"
            >
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box flex="1">
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Mês</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={mes}
              onChange={(e) => changeYearMonth(ano, e.target.value as string)}
              label="Mês"
            >
              {meses.map((opcao) => (
                <MenuItem key={opcao.valor} value={opcao.valor}>
                  {opcao.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Box flex="1">
            <span>Total - {valorTotal.toLocaleString("PT")}</span>
          </Box>
        </Box>
      </Box>
      <Box>
        <TableContainer component="div">
          <Table size="small" aria-label="Despesas do Mês">
            <TableHead>
              <TableRow>
                <TableCell>Descrição</TableCell>
                <TableCell>Categória</TableCell>
                <TableCell align="right">Dia</TableCell>
                <TableCell align="right">Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {despesas.map((despesa) => (
                <TableRow key={despesa.id}>
                  <TableCell component="th" scope="row">
                    {despesa.descricao}
                  </TableCell>
                  <TableCell>{despesa.categoria}</TableCell>
                  <TableCell align="right">{despesa.dia}</TableCell>
                  <TableCell align="right">{despesa.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
