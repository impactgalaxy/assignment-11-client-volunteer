import React from 'react'
import auth from '../../../firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = React.createContext(null);
export default function AuthProvider() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    React.useEffect(() => {
        const loggedUser = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => loggedUser();
    })
    const authInfo = {
        user,
        createUser,
    }

    return (
        <AuthContext.Provider value={authInfo}>

        </AuthContext.Provider>
    )
}
