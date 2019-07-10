import React, {useEffect, useState} from 'react';
import UserSessionContext from './UserSessionContext';
import {withAuth} from "@okta/okta-react";

const UserSession = ({auth, children}) => {
    const [accessToken, setAccessToken] = useState("");
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        auth.getAccessToken().then(setAccessToken).catch(() => setAccessToken(''));
    }, [auth]);

    useEffect(() => {
        console.info('Fetching user info due to access token change.');
        auth.getUser().then(setUserInfo);

    }, [auth, accessToken]);

    // Might need a catch here???  Not sure yet
    const fetchAccessToken = async () => {
        let token = await auth.getAccessToken();
        setAccessToken(token);
        return token;
    };

    return (
        <UserSessionContext.Provider value={{fetchAccessToken, userInfo}}>
            {userInfo && userInfo.given_name && (
                <>
                    {children}
                </>
            )}
            {!userInfo.given_name && (
                <p><em>Loading...</em></p>
            )}
            {/*{children}*/}
        </UserSessionContext.Provider>
    )
};

export default withAuth(UserSession);
