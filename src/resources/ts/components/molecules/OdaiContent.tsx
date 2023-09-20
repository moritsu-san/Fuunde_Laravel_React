import { Box, ListItem } from "@mui/material";
import OdaiCardSkeleton from "./skeleton/OdaiCardSkeleton";
import { FC } from "react";
import { Data } from "../../models/Thread";
import OdaiCard from "./OdaiCard";
import Retry from "../atoms/Retry";

type Props = {
    isFetching: boolean;
    data?: Data[];
    statusCode?: number;
};

const OdaiContent: FC<Props> = ({ isFetching, data, statusCode }) => {
    const isData = (data?.length as number) >= 1;

    if (isFetching) {
        return <OdaiCardSkeleton cardNum={10} />;
    } else if (isData) {
        return (
            <Box>
                {data?.map((data) => {
                    return (
                        <ListItem key={data.id} sx={{ width: 1, p: 0 }}>
                            <OdaiCard data={data} />
                        </ListItem>
                    );
                })}
            </Box>
        );
    } else {
        return <Retry />;
    }
};

export default OdaiContent;
