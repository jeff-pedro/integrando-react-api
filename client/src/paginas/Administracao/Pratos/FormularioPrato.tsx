import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

import { useEffect, useState } from "react"
import http from "../../../http"
import ITag from "../../../interfaces/ITag"
import IRestaurante from "../../../interfaces/IRestaurante"
import { useNavigate, useParams } from "react-router-dom"
import { Method } from "axios"


const FormularioPrato = () => {

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)
    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')

    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    const parametros = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        // obter tags
        http.admin
            .get<{ tags: ITag[] }>('tags/')
            .then(resultado => setTags(resultado.data.tags))

        // obter restaurantes
        http.admin
            .get<IRestaurante[]>('restaurantes/')
            .then(resultado => setRestaurantes(resultado.data))

        // obter prato
        if (parametros.id) {
            http.admin
                .get(`pratos/${parametros.id}/`)
                .then(resultado => {
                    setNome(resultado.data.nome)
                    setDescricao(resultado.data.descricao)
                    setTag(resultado.data.tag)
                    setRestaurante(resultado.data.restaurante)
                })
        }
    }, [parametros])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        let url = "pratos/"
        let method: Method = "POST"

        // atualização de pratos
        if (parametros.id) {
            method = "PUT"
            url += `${parametros.id}/`
        }

        // trata dados do formulário
        const formData = new FormData()

        formData.append("nome", nome)
        formData.append("descricao", descricao)
        formData.append("tag", tag)
        formData.append("restaurante", restaurante)

        if (imagem) {
            formData.append("imagem", imagem)
        }

        // faz a requisição
        http.admin
            .request({
                url,
                method,
                headers: {
                    "Content-Type": "multipart/data-form"
                },
                data: formData
            })
            .then(() => {
                navigate('/admin/pratos/')
            })
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h5">Formulário de pratos</Typography>
            <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={nome}
                    onChange={evento => setNome(evento.target.value)}
                    label="Nome do Prato"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <TextField
                    value={descricao}
                    onChange={evento => setDescricao(evento.target.value)}
                    label="Descrição do Prato"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                            {tag.value}
                        </MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                        {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                            {restaurante.nome}
                        </MenuItem>)}
                    </Select>
                </FormControl>

                <input type="file" id="update-imagem" onChange={selecionarArquivo}></input>

                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}

export default FormularioPrato