import axios from 'axios'
import IRestaurante from '../../interfaces/IRestaurante'
import { IPaginacao } from '../../interfaces/IPaginacao'
import style from './ListaRestaurantes.module.scss'
import Restaurante from './Restaurante'
import { useEffect, useState } from 'react'

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setproximaPagina] = useState('')

  useEffect(() => {
    // obter restaurantes
    axios
      .get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setproximaPagina(resposta.data.next)
      })
      .catch(erro => console.log(erro))
  }, []);

  const verMais = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resposta => {
        setRestaurantes([...restaurantes, ...resposta.data.results])
        setproximaPagina(resposta.data.next)
      })
      .catch(erro => console.log(erro))
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={verMais}> ver mais </button>}
  </section>)
}

export default ListaRestaurantes