import * as Yup from 'yup';

export const createTeamSchema = Yup.object().shape({
    team: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too Long')
        .required('required'),
    player1: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too Long')
        .required('required'),
    player2: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too Long')
        .required('required'),
    player3: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too Long'),
    player4: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too Long')
  });