import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import IRestaurante from "../../../interfaces/IRestaurante"
import axios from "axios"
import { useEffect, useState } from "react"

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const AdministracaoRestaurantes = () => {
    // obter restaurantes
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios
            .get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
            .then(resposta => {
                setRestaurantes(resposta.data)
            })
            .catch(erro => console.log(erro))
    }, [])

    const excluir = (restauranteASerExcluido: IRestaurante) => {
        axios
            .delete(`http://localhost:8000/api/v2/restaurantes/${restauranteASerExcluido.id}/`)
            .then(() => {
                const listaRestaurantes = restaurantes.filter(restaurante => {
                    return restaurante.id !== restauranteASerExcluido.id
                })

                setRestaurantes([...listaRestaurantes])
            })
            .catch(erro => console.log(erro))
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Deletar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante =>
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="editar" href={`/admin/restaurantes/${restaurante.id}`}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="deletar" onClick={() => excluir(restaurante)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <IconButton aria-label="cadastrar" href="/admin/restaurantes/novo/"> 
                            <AddIcon /> Cadastrar
                        </IconButton>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes