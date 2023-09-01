import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import IDialogProperty from "../../interfaces/IDialogProperty"

const ConfirmDialog = (props: IDialogProperty) => {
    const { title, children, open, setOpen, onConfirm } = props

    return (
        <Dialog
            sx={{ opacity: 0.5 }}
            open={open}
            onClose={() => setOpen(false)}
            aria-describedby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    autoFocus
                    onClick={() => setOpen(false)}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                        setOpen(false)
                        onConfirm()
                    }}
                >
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog