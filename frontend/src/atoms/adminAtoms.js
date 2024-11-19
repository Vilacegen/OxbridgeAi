import{atom} from "recoil";


// eslint-disable-next-line no-unused-vars
const createAtom = (key, defaultValue) => atom({
key: key,
default: defaultValue,
});