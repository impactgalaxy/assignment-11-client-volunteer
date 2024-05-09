import React from 'react'
import { AuthContext } from '../provider/AuthProvider'

export default function useAuth() {
    const auth = React.useContext(AuthContext);
    return auth;
}
