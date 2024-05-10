import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider'

export default function useAuth() {
    const Auth = useContext(AuthContext);
    return Auth;
}
