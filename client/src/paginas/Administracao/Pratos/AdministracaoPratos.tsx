import { Grid, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material";

import { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom";

import IPrato from "../../../interfaces/IPrato"
import http from "../../../http";

const AdministracaoPratos = () => {
    // obter pratos
    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.admin
            .get<IPrato[]>("pratos/")
            .then(resposta => setPratos(resposta.data))
    }, [])

    const remover = (pratoARemover: IPrato) => {
        http.admin
            .delete(`pratos/${pratoARemover.id}/`)
            .then(() => {
                setPratos([
                    ...pratos.filter(prato => prato.id !== pratoARemover.id)
                ])
            })
    }

    return (
        <>
            <Grid container>
                <Grid item xs>
                    <Typography component="h1" variant="h6">
                        Pratos
                    </Typography>
                </Grid>
                <Grid item>
                    <Link
                        variant="button"
                        component={RouterLink}
                        to={"/admin/pratos/novo/"}
                    >
                        Novo
                    </Link>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Tag</TableCell>
                            <TableCell>Imagem</TableCell>
                            <TableCell colSpan={2} align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pratos.map(prato =>
                            <TableRow key={prato.id}>
                                <TableCell>{prato.nome}</TableCell>
                                <TableCell>{prato.tag}</TableCell>
                                <TableCell>[<a href={prato.imagem} target="_blank" rel="noreferrer">ver imagem</a>]</TableCell>
                                <TableCell align="center">
                                    <Link
                                        variant="button"
                                        component={RouterLink}
                                        to={`/admin/pratos/${prato.id}`}
                                    >
                                        <IconButton sx={{ marginRight: 3 }} aria-label="editar">
                                            <Edit />
                                        </IconButton>
                                    </Link>
                                    <IconButton aria-label="deletar" onClick={() => remover(prato)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdministracaoPratos