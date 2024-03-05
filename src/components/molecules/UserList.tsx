import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


type Props = {
    user?: string
    followers?: boolean
}
const UserList = ({user, followers}: Props) => {

    const [users, setUsers] = useState<Array<any>>([])
    const navigate = useNavigate();

    useEffect(() => {
        let url = ""
        if (user && followers) {
            url = `https://api.github.com/users/${user}/followers`
        } else if (user && !followers) {
            url = `https://api.github.com/users/${user}/following`
        } else {
            url = `https://api.github.com/users`
        }
        fetch(url).then((res) => res.json()).then((res) => setUsers(res)).catch(() => console.log("Error getting Users"))
    }, [user, followers])

    const getUserDetails = (user: any) => {
        navigate(`/details/${user.login}`)
    }

    return (
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
    )
}

export default UserList