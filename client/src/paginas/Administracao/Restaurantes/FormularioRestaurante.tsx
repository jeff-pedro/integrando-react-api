import { Box, Button, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"

const FormularioRestaurante = () => {

    const parametros = useParams()
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    useEffect(() => {
        if (parametros.id) {
            axios
                .get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(resposta => {
                    setNomeRestaurante(resposta.data.nome)
                })
                .catch(erro => console.log(erro))
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            axios
                .put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
                    nome: nomeRestaurante
                })
                .then(() => {
                    alert("Restaurante atualizado com sucesso!")
                })
                .catch(erro => console.log(erro))
        } else {
            axios
                .post("http://localhost:8000/api/v2/restaurantes/", {
                    nome: nomeRestaurante
                })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!")
                })
                .catch(erro => console.log(erro))
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography component="h1" variant="h5">Formulário de Restaurantes</Typography>
            <Box component="form" onSubmit={aoSubmeterForm}>
                <TextField
                    value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    label="Nome do restaurante"
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

export default FormularioRestaurante