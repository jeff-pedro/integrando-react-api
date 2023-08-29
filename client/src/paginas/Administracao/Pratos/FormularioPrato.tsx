import { Box, Button, TextField, Typography } from "@mui/material"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import IPrato from "../../../interfaces/IPrato"
import http from "../../../http"

const FormularioPrato = () => {

    const parametros = useParams()
    const [nomePrato, setNomePrato] = useState('')
    const [tagPrato, setTagPrato] = useState('')
    const [imagemPrato, setImagemPrato] = useState('')
    const [descricaoPrato, setDescricaoPrato] = useState('')
    const [restaurante, setRestaurante] = useState('')

    useEffect(() => {
        if (parametros.id) {
            http.admin
                .get<IPrato>(`pratos/${parametros.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome)
                })
                .catch(erro => console.log(erro))
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.admin
                .put(`pratos/${parametros.id}/`, {
                    nome: nomePrato,
                    tag: tagPrato,
                    imagem: imagemPrato,
                    descricao: descricaoPrato,
                    restaurante: restaurante
                })
                .then(() => {
                    alert("Prato atualizado com sucesso!")
                })
                .catch(erro => console.log(erro))
        } else {
            http.admin
                .post("pratos/", {
                    nome: nomePrato,
                    tag: tagPrato,
                    imagem: imagemPrato,
                    descricao: descricaoPrato,
                    restaurante: restaurante
                })
                .then(() => {
                    alert("Prato cadastrado com sucesso!")
                })
                .catch(erro => console.log(erro))
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h5">Formulário de pratos</Typography>
            <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    label="Nome do prato"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={tagPrato}
                    onChange={evento => setTagPrato(evento.target.value)}
                    label="Tag do prato"
                    variant="standard"
                    fullWidth
                    required
                />
                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}

export default FormularioPrato