import { stringToColor } from "./stringToColor";

export const inputAvatar = (name: string) => {
    return {
        sx: {
            width: 30,
            height: 30,
            fontSize: "20px",
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}`,
    };
};
