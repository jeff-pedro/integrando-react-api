import axios from 'axios'
import IRestaurante from '../../interfaces/IRestaurante'
import { IPaginacao } from '../../interfaces/IPaginacao'
import style from './ListaRestaurantes.module.scss'
import Restaurante from './Restaurante'
import { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')
  const [busca, setBusca] = useState('')

  // const verMais = () => {
  //   axios
  //     .get<IPaginacao<IRestaurante>>(proximaPagina)
  //     .then(resposta => {
  //       setRestaurantes([...restaurantes, ...resposta.data.results])
  //       setProximaPagina(resposta.data.next)
  //     })
  //     .catch(erro => console.log(erro))
  // }

  const carregarDados = (url: string) => {
    axios
      .get<IPaginacao<IRestaurante>>(url)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => console.log(erro))
  }

  const buscaRestaurantes = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    axios
      .get<IPaginacao<IRestaurante>>(`http://localhost:8000/api/v1/restaurantes/?search=${busca}`)
      .then((resposta) => {
        setRestaurantes(resposta.data.results)
      })
      .catch(erro => console.log(erro))
  }

  useEffect(() => {
    // obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, []);

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>

    <Paper onSubmit={buscaRestaurantes}
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }}> <SearchIcon /> </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Busca Restaurantes"
        value={busca}
        onChange={evento => setBusca(evento.target.value)}
      />
    </Paper>

    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}> Próxima Página </button>}
    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}> Página Anterior </button>}
  </section>)
}

export default ListaRestaurantes