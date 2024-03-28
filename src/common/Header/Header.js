import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom";

const Header = () => {
    return <>
        <AppBar position="static">
            <Toolbar>
                <Link to={"/"}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Task Manager
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    </>
}

export default Header;