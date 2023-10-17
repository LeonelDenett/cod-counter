// Toastify
import { toast } from "react-toastify";
// Styles
import styles from './toastify.module.css';
// Mui Icons
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

interface ToastifyProps {
    text: string
}

export const toastifySuccess = ({text}: ToastifyProps) => {
    toast.success( text, {
        className: styles.toastifySuccess,
        progressClassName: styles.toastifyBar,
        icon: <CheckRoundedIcon color="primary" />
    })
}

export const toastifyError = ({text}: ToastifyProps) => {
    toast.error( text, {
        className: styles.toastifyError,
        progressClassName: styles.toastifyBarError,
        icon: <ErrorOutlineRoundedIcon color="primary" />
    })
}