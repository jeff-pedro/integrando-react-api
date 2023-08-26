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

  useEffect(() => {
    // obter restaurantes
    axios
      .get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => console.log(erro))
  }, []);

  const verMais = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resposta => {
        setRestaurantes([...restaurantes, ...resposta.data.results])
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => console.log(erro))
  }

  const verProximaPagina = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => console.log(erro))
  }

  const verPaginaAnterior = () => {
    axios
      .get<IPaginacao<IRestaurante>>(paginaAnterior)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => console.log(erro))
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={verMais}> ver mais </button>}
    {proximaPagina && <button onClick={verProximaPagina}> próxima página </button>}
    {paginaAnterior && <button onClick={verPaginaAnterior}> página anterior </button>}
  </section>)
}

export default ListaRestaurantes