import React, {useContext} from 'react';
import UserSession from "./UserSession";
import UserSessionContext from "./UserSessionContext";

const Secure = () => {
    return (
        <div className="container">
            <UserSession>
                <MyComp/>
            </UserSession>
        </div>
    )
};

const MyComp = () => {
    const session = useContext(UserSessionContext);
    return (
        <div>{session.userInfo.given_name}</div>
    )
};

export default Secure;