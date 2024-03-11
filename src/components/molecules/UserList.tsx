import Card from "@mui/material/Card";
import {Button, CardActionArea, TextField} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


type Props = {
    user?: string
    followers?: boolean
    details?: boolean
}
const UserList = ({user, followers, details}: Props) => {

    const [users, setUsers] = useState<Array<any>>([])
    const [username, setUsername] = useState("")
    const [location, setLocation] = useState("")
    const [queryParam, setQueryParam] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        let url = ""
        if (user && followers) {
            url = `https://api.github.com/users/${user}/followers`
        } else if (user && !followers) {
            url = `https://api.github.com/users/${user}/following`
        } else if (queryParam) {
            url = `https://api.github.com/search/users?${queryParam}`
        } else {
            url = `https://api.github.com/users`
        }
        fetch(url).then((res) => res.json()).then((res) => {
            if (queryParam) {
                setUsers(res['items'])
            } else {
                setUsers(res)
            }
        }).catch(() => console.log("Error getting Users"))
    }, [user, followers, queryParam])

    const getUserDetails = (user: any) => {
        navigate(`/details/${user.login}`)
    }

    const getUserBySearchCriteria = () => {
        if (username || location) {
            setQueryParam(`q=${username}+location:${location}`)
        } else {
            setQueryParam("")
        }

    }

    return (
        <>
            {! details && <div className="flex flex-row p-3 justify-center m-auto">
                <TextField id="outlined-basic" label="Username" variant="outlined"
                           onChange={(e) => setUsername(e.target.value)}/>
                <TextField id="outlined-basic" label="Location" variant="outlined"
                           onChange={(e) => setLocation(e.target.value)}/>
                <Button variant="contained" onClick={getUserBySearchCriteria}>Search</Button>
            </div>}
            <div className="flex flex-row justify-center m-auto flex-wrap">
                {!!users.length && users.map((user: any, index: number) => (
                    <Card onClick={() => getUserDetails(user)} key={user.login} className="w-[40%] m-3 p-3 box-border">
                        <CardActionArea className="!flex !flex-row !justify-stretch">
                            <CardMedia
                                className="!w-1/4"
                                component="img"
                                image={user.avatar_url}
                                loading="lazy"
                                alt={user.login}
                            />
                            <CardContent className="w-2/3">
                                <Typography gutterBottom variant="h5" component="div">
                                    {user.login}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default UserList