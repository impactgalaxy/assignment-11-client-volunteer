import React from 'react'
import { AuthContext } from '../provider/AuthProvider'

export default function useAuth() {
    const Auth = React.useContext(AuthContext);
    return Auth;
}
