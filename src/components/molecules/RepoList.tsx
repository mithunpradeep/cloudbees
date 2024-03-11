import {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import BookIcon from '@mui/icons-material/Book';
import Chip from '@mui/material/Chip';

type Props = {
    username: string
}
const RepoList = ({username}: Props) => {
    const [repo, setRepo] = useState<Array<any>>([])

    useEffect(() => {
        const url = `https://api.github.com/users/${username}/repos`
        fetch(url).then((res) => res.json()).then((res) => setRepo(res)).catch(() => console.log("Error getting Repo"))
    }, [username]);

    return (
        <>
            <div className="flex flex-row m-auto flex-wrap">
                {!!repo.length && repo.map((repo: any, index: number) => (
                    <Card key={repo.id} className="w-[47%] flex flex-col justify-between h-36 m-2 p-2 box-border">
                        {repo.name && <div className="pt-3 text-xl"><BookIcon/> {repo.name}
                            <Chip variant="outlined" className="ml-3"
                                  label={repo.visibility}/></div>}
                        {repo.language && <div className="pt-3 font-extralight"><Chip
                            label={repo.language}/></div>}
                    </Card>
                ))}
            </div>
        </>
    )
}

export default RepoList