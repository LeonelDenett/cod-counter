// NextJs
import { useState } from "react";
// Styles
import styles from './AuthInput.module.css'
// Mui Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment  from '@mui/material/InputAdornment';
// Mui Icons
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// Formik
import { ErrorMessage, FieldProps, useFormikContext  } from "formik";

interface AuthInputProps {
    field: FieldProps['field'];
    form: FieldProps['form'];
    label: string;
    hideMessage?: boolean;
    errorMessageColor?: string;
    type: string
}

const AuthInput = ({ field, form, label, hideMessage, errorMessageColor, type, ...props }: AuthInputProps) => {
    const { name } = field;
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <Box>
            <TextField
            autoComplete="off"
            variant="outlined"
            sx={{
                "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: "#ffffff",
                    borderRadius: "1rem",
                    color: "ffffff"
                },
                padding: 0,
                }
            }}
            fullWidth
            type={name === 'password' ? (showPassword ? 'text' : 'password') : type}
            label={label}
            InputLabelProps={hideMessage && form.touched && form.errors ? { className: styles.labelError} : { className: styles.label }}
            InputProps={{
                className: styles.label,
                endAdornment: name === 'password' ?
                <InputAdornment position="start">
                    <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ?
                            <RemoveRedEyeIcon/>
                            :
                            <VisibilityOffIcon/>
                        }
                    </IconButton>
                </InputAdornment> : null,
            }}
            {...field}
            {...props}
            />
            <ErrorMessage name={name}>
                {msg => <Typography variant="overline" color={errorMessageColor? errorMessageColor : "#fe8c00"}>{msg}</Typography>}
            </ErrorMessage>
        </Box>
    );
};

export default AuthInput;