import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react"

import IRestaurante from "../../../interfaces/IRestaurante"
import http from "../../../http";

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
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


    const excluir = (restauranteAExcluir: IRestaurante) => {
        if (confirmaExclusao) {
            http.admin
                .delete(`restaurantes/${restauranteAExcluir.id}/`)
                .then(() => {
                    setRestaurantes([
                        ...restaurantes.filter(restaurante => {
                            return restaurante.id !== restauranteAExcluir.id
                        })
                    ])
                    setConfirmaExclusao(false)
                })
        }
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
                                        <IconButton aria-label="deletar" onClick={() => setConfirmaExclusao(true)}>
                                            <Delete />
                                        </IconButton>
                                        <Dialog
                                            sx={{ opacity: 0.5 }}
                                            open={confirmaExclusao}
                                            onClose={() => setConfirmaExclusao(false)}
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Excluir esse restaurante?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => setConfirmaExclusao(false)}>Cancelar</Button>
                                                <Button onClick={() => excluir(restaurante)} autoFocus>
                                                    Excluir
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
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