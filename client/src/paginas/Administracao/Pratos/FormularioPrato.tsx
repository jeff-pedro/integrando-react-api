import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

import { useEffect, useState } from "react"
import http from "../../../http"
import ITag from "../../../interfaces/ITag"
import IRestaurante from "../../../interfaces/IRestaurante"


const FormularioPrato = () => {

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)

    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')

    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])


    useEffect(() => {
        // obter tags
        http.admin
            .get<{ tags: ITag[] }>('tags/')
            .then(resultado => setTags(resultado.data.tags))
            .catch(erro => console.log(erro))

        // obter restaurantes
        http.admin
            .get<IRestaurante[]>('restaurantes/')
            .then(resultado => setRestaurantes(resultado.data))
            .catch(erro => console.log(erro))
    }, [])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData()

        formData.append("nome", nome)
        formData.append("descricao", descricao)
        formData.append("tag", tag)
        formData.append("restaurante", restaurante)

        if (imagem) {
            formData.append("imagem", imagem)
        }

        http.admin
            .request({
                url: "pratos/",
                method: "POST",
                headers: {
                    "Content-Type": "multipart/data-form"
                },
                data: formData
            })
            .then(() => {
                alert("Prato cadastrado com sucesso!")
                
                // limpa formulário
                window.location.reload()

                // setNome('')
                // setDescricao('')
                // setTag('')
                // setRestaurante('')
            })
            .catch(erro => console.log(erro))

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

                <input type="file" onChange={selecionarArquivo}></input>

                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}

export default FormularioPrato