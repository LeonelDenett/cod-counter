// NextJs
import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from 'next/navigation';
// Firebase
import { auth } from "@/firebase/config";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
// Toastify
import { toastifySuccess, toastifyError } from "@/toastify/toastify";



interface AuthContextProps {
    children: ReactNode;
}

const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({children}: AuthContextProps) => {
    const [ user, setUser ] = useState<any>(null)
    const router = useRouter();
    // Login with Google
    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then(() => {
            router.push("/dashboard");
            console.log("logged with google");
        }).catch((error) => {
            console.log("Login with google error:", error)
        })
    }
    // Logout
    const logout = () => {
        signOut(auth).then(() => {
            router.push('/auth/login')
            console.log("logged out")
        }).catch((error) => {
            console.log("Logout error:", error)
        })

    }
    // Login User
    const loginUser = (email: string, password: string, name: string) => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            console.log("logged with email and password");
            router.replace("/dashboard");
        }).catch((error) => {
            console.log("Login error:", error);
            toastifyError({text:"Authentication error, please verify your email and password"})
        })
    }
    // Create User
    const createUser = (email: string, password: string, name: string, surname: string) => {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            if (user) {
                const profileData = { displayName: `${name} ${surname}`}
                updateProfile(user, profileData)
                .then(() => {
                    toastifySuccess({text:"User created successfully"})
                    router.replace("/dashboard");
                }).catch((error) => {
                    toastifyError({text:"Error updating profile"})
                });
            }
        }).catch((error) => {
            console.log("Login error:", error);
        });
    };
    // Reset Password
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(60);
    const actionCodeSettings = {
        url: 'http://localhost:3000/auth/login'
    }
    const resetPassword = (email: string) => {
        setIsButtonDisabled(true);
        sendPasswordResetEmail(auth, email, actionCodeSettings)
        .then(() => {
            toastifySuccess({text:"Email sent successfully. Please check your spam folder if you don't see it in your inbox"})
            console.log("reset password good")
            startTimer();
            router.push("/auth/signIn")
        })
        .catch(() => {
            toastifyError({text:"Oops, something went wrong while sending the email. Please double-check your email address and try again."})
            console.log("reset password bad")
        });
    }

    const startTimer = () => {
    let timer = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsButtonDisabled(false);
      setSecondsRemaining(60);
    }, 60000);
  };

    // Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Current user:", currentUser?.displayName)
            setUser(currentUser);
        });
        if (user) {
            router.replace("/dashboard")
        } else {
            router.replace("/auth/login")
        }
        return () => unsubscribe()
    }, []);

    // No Flicker Effect
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 500))
            setLoading(false)
        }
        checkAuthentication()
    }, [user]);
    useEffect(() => {
        if (user !== null) {
            setLoading(false);
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, logout, loading, loginUser, createUser, isButtonDisabled, secondsRemaining, resetPassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}