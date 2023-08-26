import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import IRestaurante from "../../../interfaces/IRestaurante"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import DeleteIcon from '@mui/icons-material/Delete';

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

    const deletarRestaurante = (idRestaurante: number) => {
        axios
            .delete(`http://localhost:8000/api/v2/restaurantes/${idRestaurante}/`)
            .then(() => {
                alert('Restaurante deletado com sucesso!')
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
                                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link> ]
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" onClick={() => deletarRestaurante(restaurante.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes