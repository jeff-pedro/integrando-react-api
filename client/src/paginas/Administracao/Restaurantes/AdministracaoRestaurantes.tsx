import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import IRestaurante from "../../../interfaces/IRestaurante"
import axios from "axios"
import { useEffect, useState } from "react"

import Link from '@mui/material/Link'

const AdministracaoRestaurantes = () => {
    // obter restaurantes
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios
            .get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
            .then(resposta => {
                setRestaurantes(resposta.data)
            })
            .catch(erro => console.log(erro))
    }, [])

    const deletaRestaurante = (id: number) => {
        // axios
        //  .delete(`http://localhost:8000/api/v2/pratos/${id}/`)
        //  .then(resposta => {
        //     console.log(resposta);
        //  })
        //  .catch(erro => console.log(erro))
        console.log(id);
        
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante =>
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            {/* <Button variant="contained" onClick={() => { deletaRestaurante(restaurante.id) }}>
                                Deletar
                            </Button> */}
                        </TableRow>
                    )}
                    <Link href="/admin/restaurantes/novo">Cadastrar</Link>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes