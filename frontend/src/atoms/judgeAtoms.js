import{atom} from "recoil";


const createAtom = (key, defaultValue) => atom({
key: key,
default: defaultValue,
});