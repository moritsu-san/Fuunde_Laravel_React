import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { FC } from "react";

type Data = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};

type Props = {
    data: Data;
};

const AnswerCard: FC<Props> = ({ data }) => {
    const stringToColor = (string: string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    };

    const stringAvatar = (name: string) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
    };

    return (
        <Paper
            sx={{
                width: 1,
                my: 1,
                mx: "auto",
                p: 2,
            }}
        >
            <Grid container wrap="wrap" spacing={2}>
                <Grid container item spacing={1} alignItems="center">
                    <Grid item>
                        <Avatar {...stringAvatar(data.name)} />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">{data.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption">
                            @{data.username}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs zeroMinWidth sx={{ pt: 1 }}>
                    <Typography variant="h6" textAlign="center">
                        {data.company.catchPhrase}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AnswerCard;
