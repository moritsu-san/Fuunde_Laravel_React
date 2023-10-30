import { stringToColor } from "./stringToColor";

export const cardAvatarProps = (
    name: string,
    size: number = 40,
    fontsize: number = 20
) => {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: `${size}px`,
            height: `${size}px`,
            fontSize: `${fontsize}px`,
        },
        children: `${name.split(" ")[0][0]}`,
    };
};
