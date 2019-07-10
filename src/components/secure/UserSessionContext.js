import React from 'react';

const UserSessionContext = React.createContext({
    fetchAccessToken: () => {},
    userInfo: {},
});

export default UserSessionContext;
