import { Button, Paper, InputBase, IconButton } from '@mui/material'
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

    {/* <form onSubmit={buscar}>
      <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
      <button type='submit'>buscar</button>
    </form>*/
    }

    <Paper onSubmit={buscar}
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }}> <SearchIcon /> </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        type="text"
        placeholder="Busca Restaurantes"
        value={busca}
        onChange={evento => setBusca(evento.target.value)}
      />
    </Paper>

    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}

    <Button
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

  </section>)
}

export default ListaRestaurantes