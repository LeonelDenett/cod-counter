"use client"

// NextJs
import { useEffect, useState } from 'react';
// Styles
import styles from './page.module.css'
// Mui Components
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// Mui Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Context
import { UserAuth } from '@/context/AuthContext';
import ProtectedRoute from '../private/private';
// Formik
import { Field, Form, Formik, useFormikContext } from 'formik';
// Firebase Functions
import { Team, registerKills } from "@/hooks/firebase/firebase";
import { getDocs,collection, orderBy, limit, query, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';


// React Flicking
import Flicking from '@egjs/react-flicking';
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { AnimatePresence, motion } from 'framer-motion';
import AuthInput from '@/components/authInput/AuthInput';
import { ListSubheader } from '@mui/material';



interface FormData {
    player1Kills: number | string;
    player2Kills: number | string;
    player3Kills: number | string;
    player4Kills: number | string;
}

export interface Game {
    teamId: string,
    gameId: string,
    createdAt: any; // Puedes ajustar este tipo según el formato de fecha y hora que estés utilizando
    topKiller: string;
    totalKills: number;
    players: {
        player1: {
          name: string;
          kills: number;
          currentKills: number;
        };
        player2: {
          name: string;
          kills: number;
          currentKills: number;
        };
        player3?: {
          name: string;
          kills: number;
          currentKills: number;
        };
        player4?: {
          name: string;
          kills: number;
          currentKills: number;
        };
    };
}

function Dashboard() {
    const { user } = UserAuth();

    const initialValues: FormData = {
        player1Kills: "",
        player2Kills: "",
        player3Kills: "",
        player4Kills: "",
    };

    const [currentKills, setCurrentKills] = useState({
        player1: 0,
        player2: 0,
        player3: 0,
        player4: 0,
    });

    const [currentTopKiller, setCurrentTopKiller] = useState("");

    // Submit
    const formik = useFormikContext();

    const handleSubmit = async (values: FormData) => {
        const createdAt = new Date;
        const userId = user.email;

        // Calcula las nuevas `currentKills` sumando las anteriores y las nuevas kills
        const newCurrentKills = {
            player1: currentKills.player1 + Number(values.player1Kills),
            player2: currentKills.player2 + Number(values.player2Kills),
            player3: currentKills.player3 + Number(values.player3Kills) || 0,
            player4: currentKills.player4 + Number(values.player4Kills) || 0,
        };

        setCurrentKills(newCurrentKills);

        const gameData = {
            gameId: user.email,
            players: {
                player1: {
                    name: selectedPlayerNames[0],
                    kills: Number(values.player1Kills),
                    currentKills: newCurrentKills.player1,
                },
                player2: {
                    name: selectedPlayerNames[1],
                    kills: Number(values.player2Kills),
                    currentKills: newCurrentKills.player2,
                },
                // Verificar si hay un tercer jugador antes de crearlo
                ...(selectedPlayerNames[2] && values.player3Kills !== undefined
                    ? {
                        player3: {
                            name: selectedPlayerNames[2],
                            kills: Number(values.player3Kills),
                            currentKills: newCurrentKills.player3,
                        },
                    }
                    : null),
                // Verificar si hay un cuarto jugador antes de crearlo
                ...(selectedPlayerNames[3] && values.player4Kills !== undefined
                    ? {
                        player4: {
                            name: selectedPlayerNames[3],
                            kills: Number(values.player4Kills),
                            currentKills: newCurrentKills.player4,
                        },
                    }
                    : null),
            },
            topKiller: "",
            totalKills:
                newCurrentKills.player1 + newCurrentKills.player2 + newCurrentKills.player3 + newCurrentKills.player4,
            createdAt: createdAt.toUTCString(),
        };

        // Encontrar al jugador con más kills
        const players = [
            gameData.players.player1,
            gameData.players.player2,
            gameData.players.player3,
            gameData.players.player4,
        ];

        let maxKills = -1;
        let topKillerName = "";

        players.forEach((player) => {
            if (player && player.kills > maxKills) {
                maxKills = player.kills;
                topKillerName = player.name;
            }
        });

        // Asignar el nombre del jugador con más kills a topKiller
        gameData.topKiller = topKillerName;
        setCurrentTopKiller(topKillerName);

        try {
            await registerKills(gameData, userId, teamId).then(() => {
                values.player1Kills = "";
                values.player2Kills = "";
                values.player3Kills = "";
                values.player4Kills = "";
            })

        } catch (error) {
            console.error("Error creating the game:", error)
            throw error;
        }
    }

    // Team Selection
    const [userTeams, setUserTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState("");

    const teamId = selectedTeam;

    // Cuando se selecciona un equipo, actualiza el estado con los jugadores del equipo seleccionado
    const [selectedPlayerNames, setSelectedPlayerNames] = useState<string[]>([]);

    // Get Teams
    useEffect(() => {
        const getTeams = async () => {
            try {
                const teamsRef = collection(db, "users", user.email, "teams");
                const querySnapshot = await getDocs(teamsRef);
                const userTeamsData: Team[] = [];

                querySnapshot.forEach((doc) => {
                    console.log("magia:", doc.id, " => ", doc.data());
                    const teamData = doc.data();
                    if (typeof teamData === 'object' && teamData !== null) {
                        userTeamsData.push({ id: doc.id, ...teamData } as Team);
                    }
                });
                setUserTeams(userTeamsData);
            } catch (error) {
                console.error("Error trying to get teams", error)
            }
        }
        getTeams();
    }, []);

    // Handle Team Selection
    const handleTeamSelection = async (teamId: string) => {
        setSelectedTeam(teamId);
        const selectedTeamData = userTeams.find((team) => team.team === teamId);
        if (selectedTeamData) {
            setSelectedPlayerNames(selectedTeamData.players);
            setAccordionOpen(false);
        }
    };
    useEffect(() => {
        console.log("team selected:", selectedTeam);
        console.log("player selected:", selectedPlayerNames);
    }, [selectedTeam, selectedPlayerNames]);

    // Get Last Game
    const [recentGames, setRecentGames] = useState<Game[]>([]);

    useEffect(() => {
        if (selectedTeam) {
            const gamesRef = collection(db, "users", user.email, "teams", selectedTeam, "games");

            try {
                const gamesQuery = query(gamesRef, orderBy("createdAt", "desc"), limit(1))
                const unsubscribe = onSnapshot(gamesQuery, (querySnapshot) => {
                    const gameHistoryData: Game[] = [];
                    querySnapshot.forEach((doc) => {
                        const gameData = doc.data();
                        gameHistoryData.push({ gameId: doc.id, ...gameData } as Game);
                    });

                    setRecentGames(gameHistoryData);
                });

                return () => {
                    unsubscribe();
                };
            } catch (error) {
                console.error("Error fetching game history:", error);
            }
        }
    }, [selectedTeam]);

    // Accordion Handler
    const [isAccordionOpen, setAccordionOpen] = useState(false);
    console.log("acordion:", isAccordionOpen)
    const handleAccordionClick = () => {
      setAccordionOpen(!isAccordionOpen);
    };

    // Reset Counter
    const resetGame = async () => {
        try {
            const userId = user.email;
            const teamData = userTeams.find((team) => team.team === selectedTeam);
    
            if (teamData) {
                const gameData = {
                    gameId: user.email,
                    players: {
                        player1: {
                            name: selectedPlayerNames[0],
                            kills: 0, // Resetea las kills a 0
                            currentKills: 0, // Resetea las kills actuales a 0
                        },
                        player2: {
                            name: selectedPlayerNames[1],
                            kills: 0,
                            currentKills: 0,
                        },
                        // Verificar si hay un tercer jugador antes de crearlo
                        ...(selectedPlayerNames[2]
                            ? {
                                  player3: {
                                      name: selectedPlayerNames[2],
                                      kills: 0,
                                      currentKills: 0,
                                  },
                              }
                            : {}),
                        // Verificar si hay un cuarto jugador antes de crearlo
                        ...(selectedPlayerNames[3]
                            ? {
                                  player4: {
                                      name: selectedPlayerNames[3],
                                      kills: 0,
                                      currentKills: 0,
                                  },
                              }
                            : {}),
                    },
                    topKiller: "",
                    totalKills: 0, // Resetea el total de kills a 0
                    createdAt: new Date().toUTCString(),
                };
    
                await registerKills(gameData, userId, teamId);
                // Actualiza el estado con los datos reseteados
                setCurrentKills({
                    player1: 0,
                    player2: 0,
                    player3: 0,
                    player4: 0,
                });
                setCurrentTopKiller("");
            }
        } catch (error) {
            console.error("Error resetting the game:", error);
        }
    };

    return (
        <ProtectedRoute>
            <main>
            <Box className={styles.main} sx={{paddingX : {xs: "1rem", sm:"2rem", md:"5rem", lg:"10rem"}}}>
                <Typography component={"h1"} variant='h3' my={2} color="primary">Cod Counter</Typography>
                {/* Dashboard */}
                <Grid container spacing={2} mb={2}>
                    {/* Team & Form & Reset */}
                    <Grid item xs={12} lg={6}>
                        <Grid container rowSpacing={2}>
                            {/* Select Team */}
                            <Grid item xs={12} lg={12}>
                                <Box className={styles.accordionContainer}>
                                    <Accordion expanded={isAccordionOpen} sx={{backgroundColor:"transparent", borderRadius:"1rem"}} elevation={0}>
                                        <AccordionSummary
                                            expandIcon={
                                                    <ExpandMoreIcon />
                                            }
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            onClick={handleAccordionClick}
                                        >
                                            <Typography variant="h6" >Select your team</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Flicking hideBeforeInit={true} align="prev" deceleration={0.01} bound={true}>
                                                {
                                                    userTeams.map((team) => (
                                                        <Box key={team.team} className={styles.teamsItems} onClick={() => handleTeamSelection(team.team)}>
                                                            <Typography variant="h4" color="primary">{team.team}</Typography>
                                                        </Box>
                                                    ))
                                                }
                                            </Flicking>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Grid>
                            {/* Form with names and kills counter */}
                            {selectedTeam && (
                            <Grid item xs={12} lg={12}>
                                <Paper elevation={4} sx={{backgroundColor: "transparent", borderRadius:"2rem", display: "flex", flexGrow:1}}>
                                    <Box className={styles.formContainer}>
                                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                            <Form>
                                                {userTeams
                                                    .find((team) => team.team === selectedTeam)
                                                    ?.players.map((player, index) => (
                                                    <div key={index}>
                                                        <Typography my={2} color="primary">{player}</Typography>
                                                        <Field
                                                            name={`player${index + 1}Kills`}
                                                            label="kills"
                                                            component={AuthInput}
                                                            type={"number"}
                                                            style={{color:"white"}}
                                                        />
                                                    </div>
                                                ))}
                                                <Button sx={{marginY: "1rem", width: "100%"}} variant="contained" type="submit">
                                                    Save
                                                </Button>
                                            </Form>
                                        </Formik>
                                    </Box>
                                </Paper>
                                <Paper elevation={4} sx={{backgroundColor: "transparent", borderRadius:"2rem"}}>
                                    <Box className={styles.resetContainer}>
                                        <Typography>Reset Counter?</Typography>
                                        <Button onClick={resetGame} sx={{marginY: "1rem", display:"block"}} variant="contained">
                                            Reset Counter
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                            )}
                        </Grid>
                    </Grid>
                    {/* Game History */}
                    <Grid item xs={12} lg={6}>
                        <Paper elevation={4} sx={{borderRadius:"2rem", backgroundColor:"transparent", height:"100%"}}>
                            <Box className={styles.currentHistory}>
                                <Typography variant="h5" my={2}>Current stats</Typography>
                                {recentGames.map((game, index) => (
                                    <Box sx={{width:"100%"}} key={index}>
                                <TableContainer key={index} sx={{width:"100%", borderRadius:"1rem", backgroundColor:"transparent"}} component={Paper}>
                                    <Table sx={{backgroundColor:"#00000066"}}>
                                        <TableHead sx={{backgroundColor:"#00000066"}}>
                                            <TableRow>
                                                <TableCell sx={{color:"#fe8c00"}}>Players</TableCell>
                                                <TableCell sx={{color:"#fe8c00"}} align="right">Kills</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell sx={{color:"#eeeeee"}}>{game.players.player1.name}</TableCell>
                                                <TableCell align='right' sx={{color:"#eeeeee"}}>{game.players.player1.currentKills}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{color:"#eeeeee"}}>{game.players.player2.name}</TableCell>
                                                <TableCell sx={{color:"#eeeeee"}} align='right'>{game.players.player2.currentKills}</TableCell>
                                            </TableRow>
                                            {
                                                game.players.player3?
                                                <TableRow>
                                                    <TableCell sx={{color:"#eeeeee"}}>{game.players.player3.name}</TableCell>
                                                    <TableCell sx={{color:"#eeeeee"}} align='right'>{game.players.player3.currentKills}</TableCell>
                                                </TableRow> : null
                                            }
                                            {
                                                game.players.player4?
                                                <TableRow>
                                                    <TableCell sx={{color:"#eeeeee"}}>{game.players.player4.name}</TableCell>
                                                    <TableCell sx={{color:"#eeeeee"}} align='right'>{game.players.player4.currentKills}</TableCell>
                                                </TableRow> : null
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box className={styles.extraDetails}>
                                    <Typography variant="body1">Total Kills: <span style={{color:"#fe8c00"}}>{game.totalKills}</span></Typography>
                                    <Typography>Top Killer: <span style={{color:"#fe8c00"}}>{currentTopKiller}</span> </Typography>
                                </Box>
                                </Box>
                                    // <Box key={index} className={styles.gameHistoryItem}>

                                    //     {/* <Grid container>
                                    //         <Grid item lg={6} columnSpacing={6}>
                                    //             <List>
                                    //                 <ListSubheader sx={{backgroundColor: "red", textAlign:"left"}}>Players</ListSubheader>
                                    //                 <ListItem>
                                    //                     <Typography variant="body1">{game.players.player1.name}</Typography>
                                    //                 </ListItem>
                                    //                 <ListItem>
                                    //                     <Typography variant="body1">{game.players.player2.name}</Typography>
                                    //                 </ListItem>
                                    //             </List>
                                    //         </Grid>
                                    //         <Grid item lg={6}>
                                    //             <List>
                                    //                 <ListSubheader sx={{backgroundColor: "red", textAlign:"left"}}>Kills</ListSubheader>
                                    //                 <ListItem>
                                    //                     <Typography sx={{textAlign:"right"}} variant="body1">{game.players.player1.currentKills}</Typography>
                                    //                 </ListItem>
                                    //                 <ListItem>
                                    //                     <Typography sx={{textAlign:"right", backgroundColor:"red"}} variant="body1">{game.players.player2.currentKills}</Typography>
                                    //                 </ListItem>
                                    //                 <ListItem>
                                    //                     <Typography variant="body1">{game.players.player3?.currentKills}</Typography>
                                    //                 </ListItem>
                                    //                 <ListItem>
                                    //                     <Typography variant="body1">{game.players.player4?.currentKills}</Typography>
                                    //                 </ListItem>
                                    //             </List>
                                    //         </Grid>
                                    //         <Grid item lg={6}>
                                    //             <Typography variant="body1">Total Kills: {game.totalKills}</Typography>
                                    //             <Typography>Top Killer: {currentTopKiller} </Typography>
                                    //         </Grid>
                                    //     </Grid> */}
                                    // </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            </main>
        </ProtectedRoute>
    );
}

export default Dashboard;