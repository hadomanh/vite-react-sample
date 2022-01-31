import {
    Outlet,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import useWallet from "./hooks/useWallet";

function Layout() {

    useWallet();

    return (
    <>
        <NavBar />
        <Outlet />
    </>
    )
}

export default Layout;
