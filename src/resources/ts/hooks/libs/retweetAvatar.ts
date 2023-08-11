import { stringToColor } from "./stringToColor";

export const retweetAvatar = (name: string) => {
    return {
        sx: {
            width: 20,
            height: 20,
            fontSize: "12px",
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}`,
    };
};
