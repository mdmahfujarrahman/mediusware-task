import axios from "axios";
const API = axios.create({ baseURL: "https://contact.mediusware.com/api/" });

const getAllContactsReq = (payload) => {
    if (payload?.search && payload?.page) {
        return API.get(
            `/contacts/?search=${payload?.search}&page=${payload?.page}`
        );
    } else if (payload?.search && !payload?.page) {
        return API.get(`/contacts/?search=${payload?.search}`);
    } else {
        return API.get(`/contacts/?page=${payload?.page}`);
    }
};
const getUSCountryReq = (payload) => {
    if (payload?.search && payload?.page) {
        API.get(
            `/country-contacts/United States/?search=${payload?.search}&page=${payload?.page}`
        );
    } else if (payload?.search && !payload?.page) {
        API.get(`/country-contacts/United States/?search=${payload?.search}`);
    } else {
        API.get(`/country-contacts/United States/?page=${payload?.page}`);
    }
};

export const AppService = {
    getAllContactsReq,
    getUSCountryReq,
};
