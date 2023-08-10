import { stringToColor } from "./stringToColor";

export const cardAvatar = (name: string) => {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}`,
    };
};
