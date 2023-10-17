import { auth, db } from "@/firebase/config";
import { collection, addDoc, doc, onSnapshot, query, where, getDocs, setDoc, DocumentData, getDoc, limit, orderBy, updateDoc } from "firebase/firestore";
// User Context
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toastifyError, toastifySuccess } from "@/toastify/toastify";


// User structure
export interface User {
    name: string,
    email: string
}

// Team structure
export interface Team {
    id: string;
    team: string;
    players: any[];
}

// Games
export interface Game {
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

// Create User
export const registerUser = async (userData: User) => {
    // 1. Obtener una referencia a la colección de equipos
    const usersRef = collection(db, "users");

    try {
        // 1. Agregar un nuevo documento a la colección de equipos
        const docRef = await setDoc(doc(usersRef, userData.email), userData);
        return userData.email;
    } catch (error) {
        console.error("Error creating a new user:", error);
        throw error;
    }
};
// Create Team
export const createTeam = async (teamData: Team, userId: string) => {
    // 1. Obtener una referencia a la colección de equipos
    const usersRef = collection(db, "users");

    try {
        // 2. Verificar si el equipo ya existe
        const teamName = teamData.team;
        const userId = teamData.id;
        const userIdTeamsQuery = query(collection(usersRef, userId, "teams"), where("team", "==", teamName));
        const queryIdSnapshot = await getDocs(userIdTeamsQuery);
        
        if (!queryIdSnapshot.empty) {
            toastifyError({text: "Ya tienes un equipo con el mismo nombre."})
            throw new Error("Ya tienes un equipo con el mismo nombre.");
        }
        // 3. Verificar si el usuario ya tiene tres equipos
        const userTeamsQuery = query(collection(usersRef, userId, "teams"));
        const querySnapshot = await getDocs(userTeamsQuery);
        const userTeams: Team[] = [];

        querySnapshot.forEach((doc) => {
            const team = doc.data() as Team;
            userTeams.push(team);
        });

        if (userTeams.length >= 3) {
            toastifyError({text: "Ya tienes tres equipos y no puedes crear más."})
            throw new Error("Ya tienes tres equipos y no puedes crear más.");
        }
        // 4. Agregar un nuevo documento a la colección de equipos
        const teamDocRef = doc(collection(usersRef, userId, 'teams'), teamName);
        await setDoc(teamDocRef, teamData);
        toastifySuccess({text: "New team created successfully"})
        // 5. Finally
        return teamName;
    } catch (error) {
        throw error;
    }
};
// Function to fetch the teams and call the update function
async function getTeams(teamsRef: any, onTeamsUpdate: (teams: Team[]) => void) {
    const q = query(teamsRef, orderBy("createdAt", "desc"), limit(3))
    const querySnapshot = await getDocs(q);
    const userTeams: Team[] = [];
    querySnapshot.forEach((doc) => {
        const teamData = doc.data();
        if (typeof teamData === 'object' && teamData !== null) {
            userTeams.push({ id: doc.id, ...teamData } as Team);
        }
    });

    onTeamsUpdate(userTeams);
};
// Register Kills
export const registerKills = async (gameData: Game, userId: string, teamId: string) => {
    
    const usersRef = collection(db, "users");

    try {
        // Funciona
        const userId = gameData.gameId;
        const gameDocRef = doc(collection(usersRef, userId, 'teams', teamId, "games" ));

        await setDoc(gameDocRef, gameData);

        const id = gameDocRef.id;
        console.log("game id:", id)
        return id;
    } catch (error) {
        console.error("Error creating a new team:", error);
        throw error;
    }
};
