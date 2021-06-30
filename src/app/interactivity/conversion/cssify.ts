import { cssType } from "../../resources/css";

export const propCssify = (prop: string) => {
    let result = "";
    for (let i = 0; i < prop.length; i++) {
        const char = prop.charAt(i);
        if (char === char.toUpperCase()) {
            result += `-${char.toLowerCase()}`;
        } else {
            result += char;
        }
    }
    return result;
};

export const getProp = (cssProps: cssType, type: string, prop: string) => {
    let result: string | undefined = "";
    switch (prop) {
        case "color":
            result = cssProps[type].props.color;
            break;
        case "textDecoration":
            result = cssProps[type].props.textDecoration;
            break;
        case "fontFamily":
            result = cssProps[type].props.fontFamily;
            break;
        case "fontWeight":
            result = cssProps[type].props.fontWeight;
            break;
        default:
            break;
    }
    console.log(type, prop, result);
    return result ? result : "";
};

export default function encodeCss(cssProps: cssType) {
    let result = "";
    Object.keys(cssProps).forEach((type) => {
        result += `${cssProps[type].tag} {\n`;
        Object.keys(cssProps[type].props).forEach((prop) => {
            const value = getProp(cssProps, type, prop);
            if (value !== "") {
                result += `${propCssify(prop)}: ${value};\n`;
            }
        });
        result += "}\n";
    });
    return result;
}