// Styles
import styles from '../AuthForm.module.css';
// Formik
import { Formik, Form, Field, FormikHelpers, FieldAttributes  } from "formik";
// Yup
import { SignUpSchema } from "@/validations/AuthValidations";
// Mui Components
import Button from '@mui/material/Button';
// Components
import AuthInput from "@/components/authInput/AuthInput";
import { UserAuth } from '@/context/AuthContext';
import { registerUser } from '@/hooks/firebase/firebase';

// SignUp
interface FormDataSignUp {
    name: string;
    surname: string;
    email: string;
    password: string;
}

interface User {
    email: string,
    name: string
}

function AuthFormRegister() {
    const { createUser, logout } = UserAuth()
    console.log()
    // Initial Values Form
    const initialValuesSignUp: FormDataSignUp = {
        name: '',
        surname: '',
        email: '',
        password: ''
    };
    // Handle Submit Form
    const handleOnSubmitSignUp = async (
        values: FormDataSignUp,
        { setSubmitting, setStatus }: FormikHelpers<FormDataSignUp>
        ) => {
        try {
            const { email, password, name, surname } = values;
            await createUser(email, password, name, surname);

            const userData : User = {
                email,
                name
            }
            await registerUser(userData);
            setSubmitting(false)
        } catch(error) {
            setStatus({error: "Authentication error"});
            setSubmitting(false);
        }
    };
    return (
        <Formik
            initialValues={initialValuesSignUp}
            onSubmit={handleOnSubmitSignUp}
            validationSchema={SignUpSchema}
        >
            <Form className={styles.formikContainer}>
                <Field type={"text"} name="name" label="name" component={(props: FieldAttributes<any>) => <AuthInput {...props} hideMessage />} />
                <Field type={"text"} name="surname" label="surname" component={(props: FieldAttributes<any>) => <AuthInput {...props} hideMessage />} />
                <Field name="email" label="email" component={(props: FieldAttributes<any>) => <AuthInput {...props} hideMessage />} />
                <Field name="password" label="password" component={(props: FieldAttributes<any>) => <AuthInput {...props} hideMessage />} />
                <Button variant="contained" sx={{borderRadius: ".5rem"}} type="submit">Submit</Button>
            </Form>
        </Formik>
    );
}

export default AuthFormRegister;

