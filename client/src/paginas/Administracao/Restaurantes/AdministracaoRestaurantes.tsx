import { Grid, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react"

import IRestaurante from "../../../interfaces/IRestaurante"
import http from "../../../http";
import ConfirmDialog from "../../../componentes/ConfirmDialog";

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restauranteAExcluir, setRestauranteAExcluir] = useState<IRestaurante>()
    const [confirmaExclusao, setConfirmaExclusao] = useState(false)

    useEffect(() => {
        // obter restaurantes
        http.admin
            .get<IRestaurante[]>("restaurantes/")
            .then(resposta => {
                setRestaurantes(resposta.data)
            })
            .catch(erro => console.log(erro))
    }, [])


    const excluir = () => {
        if (confirmaExclusao) {
            http.admin
                .delete(`restaurantes/${restauranteAExcluir?.id}/`)
                .then(() => {
                    setRestaurantes([
                        ...restaurantes.filter(restaurante => {
                            return restaurante.id !== restauranteAExcluir?.id
                        })
                    ])

                    setConfirmaExclusao(false)
                })
        }

        setConfirmaExclusao(false)
    }

    const abreBotaoExcluir = (restaurante: IRestaurante) => {
        setConfirmaExclusao(true)
        setRestauranteAExcluir(restaurante)
    }

    return (
        <>
            <Grid container>
                <Grid item xs>
                    <Typography component="h1" variant="h6">
                        Restaurantes
                    </Typography>
                </Grid>
                <Grid item>
                    <Link
                        variant="button"
                        component={RouterLink}
                        to="/admin/restaurantes/novo"
                    >
                        Novo
                    </Link>
                </Grid>
            </Grid>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell colSpan={2} align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurantes?.map(restaurante => (
                                <TableRow key={restaurante.id}>
                                    <TableCell>
                                        {restaurante.nome}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton sx={{ marginRight: 3 }} aria-label="editar" href={`/admin/restaurantes/${restaurante.id}`}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton aria-label="deletar" onClick={() => abreBotaoExcluir(restaurante)}>
                                            <Delete />
                                        </IconButton>
                                        <ConfirmDialog
                                            title="Excluir Restaurante?"
                                            children={`Tem certeza que quer excluir o restaurante ${restauranteAExcluir?.nome}?`}
                                            open={confirmaExclusao}
                                            setOpen={setConfirmaExclusao}
                                            onConfirm={excluir}
                                        ></ConfirmDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default AdministracaoRestaurantes