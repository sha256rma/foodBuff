import React from 'react';
import { NavbarStyle, Title, Authentication, LoginButton } from './Navbar-Style';

export const Navbar = ({login, logout, loggedIn}) => {
    
    return (
        <NavbarStyle>

            <Title>
                foodBuff
            </Title>

            <Authentication>
                {
                loggedIn !== "loading" ? (

                    <>
                    {
                    loggedIn ? ( 
                        `Welcome back ${(loggedIn.displayName)}` 
                        ) : (
                         "" 
                        )
                    }
                            
                    {
                    loggedIn ? ( 
                        <LoginButton onClick={logout}> | Log out</LoginButton>
                        ) : (
                        <LoginButton onClick={login}>Log in | Sign up</LoginButton>
                        )
                    }
                    </>

                    ) : (
                    "loading..."
                    )   
                }
            </Authentication>

        </NavbarStyle>
    );
}