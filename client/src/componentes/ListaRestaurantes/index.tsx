import { Button, Paper, InputBase, IconButton, Select, MenuItem, Stack, Divider, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import IRestaurante from '../../interfaces/IRestaurante'
import IPaginacao from '../../interfaces/IPaginacao'
import Restaurante from './Restaurante'
import style from './ListaRestaurantes.module.scss'
import http from '../../http'

import { useEffect, useState } from 'react'
import { AxiosRequestConfig } from 'axios';


// esses são os possíveis parâmetros que podemos enviar para a API
interface IParametrosBusca {
  ordering?: string,
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('');

  // agora, o carregarDados recebe opcionalmente as opções de configuração do axios
  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {

    http.default
      .get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => console.log(erro))
  }

  // a cada busca, montamos um objeto de opções
  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const opcoes = {
      params: {} as IParametrosBusca
    }

    if (busca) {
      opcoes.params.search = busca
      opcoes.params.ordering = ordenacao
    }

    carregarDados('restaurantes/', opcoes)
  }

  // funcionalidade de carregar paginas de dados
  // const verMais = () => {
  //   axios
  //     .get<IPaginacao<IRestaurante>>(proximaPagina)
  //     .then(resposta => {
  //       setRestaurantes([...restaurantes, ...resposta.data.results])
  //       setProximaPagina(resposta.data.next)
  //     })
  //     .catch(erro => console.log(erro))
  // }

  useEffect(() => {
    // obter restaurantes
    carregarDados('restaurantes/')
  }, []);

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>

    <Paper onSubmit={buscar}
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 }}
    >
      <Box sx={{ m: 1 }}>
        <Button sx={{ p: '10px' }} type="submit" variant="text"><SearchIcon /></Button>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          type="text"
          placeholder="Busca Restaurantes"
          value={busca}
          onChange={evento => setBusca(evento.target.value)}
        />
      </Box>

      <Select sx={{ ml: 1, flex: 1 }}
        labelId="ordenacao-select"
        id="ordenacao-select"
        value={ordenacao}
        onChange={evento => setOrdenacao(evento.target.value)}
      >
        <MenuItem value={""}>Padrão</MenuItem>
        <MenuItem value={"id"}>Por ID</MenuItem>
        <MenuItem value={"nome"}>Por Nome</MenuItem>
      </Select>
    </Paper>

    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}

    <Button sx={{ m: 1 }}
      onClick={() => carregarDados(paginaAnterior)}
      disabled={!paginaAnterior}
      variant="contained"
      startIcon={<NavigateBeforeIcon />}> Anterior
    </Button>
    <Button
      onClick={() => carregarDados(proximaPagina)}
      disabled={!proximaPagina}
      variant="contained"
      endIcon={<NavigateNextIcon />}> Próxima
    </Button>

{/* 
    <form onSubmit={buscar}>
      <div>
        <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
      </div>
      <div>
        <select
          name="select-ordencao"
          id="select-ordencao"
          value={ordenacao}
          onChange={evento => setOrdenacao(evento.target.value)}>
          <option value="">Padrão</option>
          <option value="id">Por ID</option>
          <option value="nome" selected>Por Nome</option>
        </select>
      </div>
      <div>
        <button type='submit'>buscar</button>
      </div>
    </form>
    
    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
      Página Anterior
    </button>}
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
      Próxima página
    </button>}
 */}
  </section >)
}

export default ListaRestaurantes