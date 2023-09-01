export default interface IDialogProperty {
    title: string
    children: string, 
    open: boolean, 
    setOpen: Function, 
    onConfirm: Function
}