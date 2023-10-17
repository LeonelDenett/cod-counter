"use client"

// Styles
import styles from './page.module.css';
// Mui Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// Components
import AuthInput from '@/components/authInput/AuthInput';
// Formik
import { Field, Form, Formik } from 'formik';
// Firebase Hooks
import { createTeam } from '@/hooks/firebase/firebase';
import ProtectedRoute from '@/app/private/private';
// Yup Validations
import { createTeamSchema } from '@/validations/FirebaseValidations';
import { UserAuth } from '@/context/AuthContext';
// Flicking Slider
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { useEffect, useState } from 'react';


interface FormData {
    team: string,
    player1: string,
    player2: string,
    player3: string,
    player4: string,
}

function NewTeam() {

    // Check if user have already 3 teams
    const [userTeams, setUserTeams] = useState([]);
    const { user } = UserAuth();

    const initialValues: FormData = {
        team: '',
        player1: '',
        player2: '',
        player3: '',
        player4: '',
    };
    const handleSubmit = async (values: FormData) => {
        // New Date
        const createdAt = new Date;

        // Crea un arreglo de jugadores solo con los nombres válidos
        const players = [values.player1, values.player2, values.player3, values.player4]
        .filter(playerName => playerName.trim() !== "");

        const limitedPlayers = players.slice(0, 4);

        const teamData = {
            id: user.email,
            team: values.team,
            players: limitedPlayers,
            createdAt: createdAt.toUTCString()
        };

        try {
            const teamId = await createTeam(teamData, teamData.team);
            console.log("Team created with ID:", teamData.team)
        } catch (error) {
            console.error("Error creating the team:", error)
            throw error;
        }
    }
    return (
        <ProtectedRoute>
            <Box className={styles.main}>
                <Box className={styles.container}>
                    <Typography component="h1" variant="h3" color="initial">New Team</Typography>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={createTeamSchema}>
                        <Form className={styles.form}>
                            <Field
                                id="team"
                                name="team"
                                label="team name"
                                errorMessageColor={"#000000DE"}
                                component={AuthInput}
                            />
                            <Field
                                id="player1"
                                name="player1"
                                label="player 1"
                                errorMessageColor={"#000000DE"}
                                component={AuthInput}
                            />
                            <Field
                                id="player2"
                                name="player2"
                                label="player 2"
                                errorMessageColor={"#000000DE"}
                                component={AuthInput}
                            />
                            <Field
                                id="player3"
                                name="player3"
                                label="player 3"
                                errorMessageColor={"#000000DE"}
                                component={AuthInput}
                            />
                            <Field
                                id="player4"
                                name="player4"
                                label="player 4"
                                errorMessageColor={"#000000DE"}
                                component={AuthInput}
                            />
                            <Button variant='contained' type="submit">Save</Button>
                            {/* <Flicking
                            align="prev"
                            circular={true}
                            >
                                <div className={`${styles.slide} ${styles.slide1}`}>1</div>
                                <div className={`${styles.slide} ${styles.slide2}`}>2</div>
                                <div className={`${styles.slide} ${styles.slide3}`}>3</div>
                            </Flicking> */}
                        </Form>
                    </Formik>
                </Box>
            </Box>
        </ProtectedRoute>
    );
}

export default NewTeam;