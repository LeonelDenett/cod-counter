import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    surname: Yup.string()
      .min(3, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(7, 'Too Short')
        .max(50, 'Too Long')
        .required('Required'),
  });

export const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(7, 'Too Short')
        .max(50, 'Too Long')
        .required('Required'),
});

export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
      .email('Invalid email')
      .required('Required'),
});