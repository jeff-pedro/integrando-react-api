import axios from 'axios'
import IRestaurante from '../../interfaces/IRestaurante'
import { IPaginacao } from '../../interfaces/IPaginacao'
import style from './ListaRestaurantes.module.scss'
import Restaurante from './Restaurante'
import { useEffect, useState } from 'react'

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const verMais = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resposta => {
        setRestaurantes([...restaurantes, ...resposta.data.results])
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => console.log(erro))
  }

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
  
  useEffect(() => {
    // obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, []);

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}> Próxima Página </button>}
    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}> Página Anterior </button>}
  </section>)
}

export default ListaRestaurantes