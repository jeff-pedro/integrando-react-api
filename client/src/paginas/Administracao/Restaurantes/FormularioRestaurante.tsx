import { Button, FormControl, FormHelperText, FormLabel, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"

const FormularioRestaurante = () => {
    const [nome, setNome] = useState('')

    const cadastrarRestaurante = () => {
        const restaurante = { nome }

        axios
            .post("http://localhost:8000/api/v2/restaurantes/", restaurante)
            .then(resposta => {
                console.log(resposta);
            })
            .catch(erro => console.log(erro))
    }

    return (
        <form onSubmit={cadastrarRestaurante}>
            <h2>Cadastro de Restaurantes</h2>
            <TextField
                label="nome"
                variant="outlined"
                type="text"
                color="secondary"
                sx={{ mb: 3 }}
                fullWidth
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <Button variant="outlined" color="secondary" type="submit">Cadastrar</Button>
        </form>
    )
}

export default FormularioRestaurante