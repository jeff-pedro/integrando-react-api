import { AppBar, Link, Container, Toolbar, Typography, Box, Button, Paper } from "@mui/material"
import { Outlet, Link as RouterLink } from "react-router-dom"

const PaginaBaseAdmin = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">Administração</Typography>
                        <Box sx={{ display: "flex", flexGrow: 1 }}>
                            <Link component={RouterLink} to="/admin/restaurantes/">
                                <Button sx={{ m: 2, color: "white" }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos/">
                                <Button sx={{ m: 2, color: "white" }}>
                                    Pratos
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        {/* conteúdo das páginas */}
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default PaginaBaseAdmin