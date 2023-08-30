import { Box, Button, TextField, Typography } from "@mui/material"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import IRestaurante from "../../../interfaces/IRestaurante"
import http from "../../../http"
import { Method } from "axios"

const FormularioRestaurante = () => {

    const parametros = useParams()
    const navigate = useNavigate()

    const [nome, setNome] = useState('')

    useEffect(() => {
        if (parametros.id) {
            http.admin
                .get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(resposta => setNome(resposta.data.nome))
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        let url = "restaurantes/"
        let method: Method = "POST"

        if (parametros.id) {
            url += `${parametros.id}/`
            method = "PUT"
        }

        http.admin
            .request({
                url,
                method,
                data: {
                    nome
                }
            })
            .then(() => {
                navigate("/admin/restaurantes")
            })
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography component="h1" variant="h5">
                Formulário de Restaurantes
            </Typography>
            <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
                <TextField
                    required
                    value={nome}
                    onChange={evento => setNome(evento.target.value)}
                    margin="dense"
                    id="nome"
                    label="Nome"
                    type="text"
                    fullWidth
                />
                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante