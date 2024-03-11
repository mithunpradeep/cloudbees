import Header from "../molecules/Header";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PlaceIcon from '@mui/icons-material/Place';
import GroupIcon from '@mui/icons-material/Group';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserList from "../molecules/UserList";
import RepoList from "../molecules/RepoList";


type Props = {}
const UsersDetails = (props: Props) => {
    const {username} = useParams();
    const [userDetails, setUserDetails] = useState<any>(false)
    const [value, setValue] = useState('0');


    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`).then((res) => res.json()).then(res => setUserDetails(res)).catch(() => console.log("Error getting users details"))
        setValue('0')
    }, [username])


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        console.log(newValue)
        setValue(newValue);
    };

    return (
        <>
            <Header pageHeader="Users Details"></Header>
            <div className="flex flex-row justify-center m-auto flex-wrap">
                {!!userDetails && <Card className="w-3/4 m-3 p-3 box-border">
                    <div className="!flex !flex-row !justify-around !items-start">
                        <div className="!flex !flex-col">
                            <CardMedia
                                className="!w-96"
                                component="img"
                                image={userDetails.avatar_url}
                                loading="lazy"
                                alt={userDetails.login}
                            />
                            {userDetails.name && <p className="pt-3 text-2xl font-extrabold">{userDetails.name}</p>}
                            {
                                userDetails.login &&
                                <p className="pt-3 text-xl font-extralight">{userDetails.login}</p>}
                            {userDetails.location && <p className="pt-3">
                                <PlaceIcon/> {userDetails.location}
                            </p>}
                            {userDetails.company && <p className="pt-3">
                                <CorporateFareIcon/> {userDetails.company}
                            </p>}
                            {userDetails.followers && <p className="pt-3">
                                <GroupIcon/> {userDetails.followers} followers
                                : {userDetails.following} following
                            </p>}
                        </div>
                        <CardContent className="w-2/3">
                            <Typography gutterBottom variant="h5" component="div">
                                <Box sx={{width: '100%', typography: 'body1'}}>
                                    <TabContext value={value}>
                                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                <Tab label="Repository" value="1"/>
                                                <Tab label="Followers" value="2"/>
                                                <Tab label="Following" value="3"/>
                                            </TabList>
                                        </Box>
                                        <TabPanel value="1"><RepoList
                                            username={userDetails.login}></RepoList></TabPanel>
                                        <TabPanel value="2"><UserList user={userDetails.login}
                                                                      followers={true}></UserList></TabPanel>
                                        <TabPanel value="3"><UserList user={userDetails.login}
                                                                      followers={false}></UserList></TabPanel>
                                    </TabContext>
                                </Box>
                            </Typography>
                        </CardContent>
                    </div>
                </Card>}
            </div>
        </>
    )
}

export default UsersDetails