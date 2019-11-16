import { auth, provider } from '../firebase';
import { useState, useEffect } from 'react';

export function GoogleAuthentication() {

    const [authenticated, setAuthenticated] = useState('loading');

    const login = () => auth.signInWithPopup(provider);

    const logout = () => {
        auth.signOut()
            .then(function() {
                // Sign-out successful.
            })
            .catch(function(error) {
                // An error happened.
            });
    }

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            (user) ? setAuthenticated(user): setAuthenticated();
        }, (error) => console.log(error))
    }, [])

    return {
        login,
        logout,
        loggedIn: authenticated
    }
}