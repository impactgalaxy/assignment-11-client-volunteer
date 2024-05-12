import auth from '../../../firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null);
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState("");
    const [deadlineOrder, setDeadlineOrder] = useState("");
    const [pageNumber, setPageNumber] = useState(0);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    useEffect(() => {
        const loggedUser = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => loggedUser();
    })
    console.log(user);
    const authInfo = {
        user,
        loading,
        value,
        setValue,
        deadlineOrder,
        pageNumber,
        setPageNumber,
        setDeadlineOrder,
        createUser,
        userLogin,
        logOut,
        googleLogin,

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            <Helmet>
                <title>Volunify</title>
            </Helmet>
        </AuthContext.Provider>
    )
}
AuthProvider.propTypes = {
    children: PropTypes.node
}