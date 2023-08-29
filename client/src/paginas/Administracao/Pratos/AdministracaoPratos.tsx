import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useEffect, useState } from "react"

import IPrato from "../../../interfaces/IPrato"
import http from "../../../http";

const AdministracaoPratos = () => {
    // obter pratos
    const [pratos, setPrato] = useState<IPrato[]>([])

    useEffect(() => {
        http.admin
            .get<IPrato[]>("pratos/")
            .then(resposta => {
                setPrato(resposta.data)
            })
            .catch(erro => console.log(erro))
    }, [])

    const excluir = (pratoASerExcluido: IPrato) => {
        http.admin
            .delete(`pratos/${pratoASerExcluido.id}/`)
            .then(() => {
                const listapratos = pratos.filter(prato => {
                    return prato.id !== pratoASerExcluido.id
                })

                setPrato([...listapratos])
            })
            .catch(erro => console.log(erro))
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Deletar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato =>
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell>[<a href={prato.imagem} target="_blank" rel="noreferrer">ver imagem</a>]</TableCell>
                            <TableCell>
                                <IconButton aria-label="editar" href={`/admin/pratos/${prato.id}`}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="deletar" onClick={() => excluir(prato)}>
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

export default AdministracaoPratos