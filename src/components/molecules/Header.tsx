import {AppBar, Toolbar, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

type Props = {
    pageHeader: string
}

const Header = (props: Props) => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div" className="flex flex-row items-center">
                    <GitHubIcon className="pr-1"/>
                    <h2>{props.pageHeader}</h2>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header