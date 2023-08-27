import axios, { AxiosRequestConfig } from 'axios'
import IRestaurante from '../../interfaces/IRestaurante'
import { IPaginacao } from '../../interfaces/IPaginacao'
import style from './ListaRestaurantes.module.scss'
import Restaurante from './Restaurante'
import { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

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

    axios
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

    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
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
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, []);

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>

    {/* <form onSubmit={buscar}>
      <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
      <button type='submit'>buscar</button>
    </form>
 */}

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
    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}> Página Anterior </button>}
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}> Próxima Página </button>}
  </section>)
}

export default ListaRestaurantes