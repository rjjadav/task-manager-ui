import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
    return <>
        <Header></Header>
        <div className="p-4">
            <Outlet/>
        </div>
    </>
}

export default Layout;