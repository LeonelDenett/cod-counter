// Styles
import styles from '../AuthForm.module.css';
// Formik
import { Formik, Form, Field, FormikHelpers  } from "formik";
// Yup
import { SignInSchema } from "@/validations/AuthValidations";
// Mui Components
import Button from '@mui/material/Button';
// Components
import AuthInput from "@/components/authInput/AuthInput";
// Context
import { UserAuth } from '@/context/AuthContext';


// SignIn
interface FormDataSignIn {
    email: string;
    password: string;
}

function AuthFormLogin() {
    const { loginUser } = UserAuth()
    // Initial Values Form
    const initialValuesSignIn: FormDataSignIn = {
        email: '',
        password: ''
    };
    // Handle Submit Form
    const handleOnSubmitSignIn = async (
        values: FormDataSignIn,
        { setSubmitting, setStatus }: FormikHelpers<FormDataSignIn>
      ) => {
        try {
            const { email, password } = values;
            await loginUser(email, password);
            setSubmitting(false)
        } catch(error) {
            setStatus({error: "Authentication error"});
            setSubmitting(false);
        }
    };
    return (
        <Formik
            initialValues={initialValuesSignIn}
            onSubmit={handleOnSubmitSignIn}
            validationSchema={SignInSchema}
        >
            <Form className={styles.formikContainer}>
                <Field type={"text"} name="email" label="email" component={AuthInput} />
                <Field name="password" label="password" component={AuthInput} />
                <Button variant="contained" sx={{borderRadius: ".5rem"}} type="submit">Log In</Button>
            </Form>
        </Formik>
    );
}

export default AuthFormLogin;

