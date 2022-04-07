import {Fragment, useEffect} from "react";
import { useCookies } from "react-cookie";
import { v1 as uuidv1 } from "uuid";

export default function PersistCookie({children}) {
    const [cookie, setCookie] = useCookies(["playerId"])
    useEffect(() => {
        // Run every time the component is rendered. 
        // Check if cookie already exsist
        // otherwise create a new cookie to persist user informaiton
        if (!(cookie && cookie.playerId)) {
            const uuid = uuidv1()
            setCookie("playerId", uuid)
        }
    }, []);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
}