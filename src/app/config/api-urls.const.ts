import { environment } from "../../environments/environment.development";

const baseUrl = environment.baseUrl;

export const apiUrls = {
    register: `${baseUrl}register`,
    login: `${baseUrl}login`,
    logout: `${baseUrl}logout`,
    user: `${baseUrl}user`,

    location: {
        getLocations: `${baseUrl}locations`,
        getDivisions: `${baseUrl}divisions`,
        getDistricts: `${baseUrl}districts`,
        getThanas: `${baseUrl}thanas`,
        getLocation: `${baseUrl}get-location`,
        setLocation: `${baseUrl}set-location`,
        storeUserLocation: `${baseUrl}store-user-location`,
        getStoredLocations: `${baseUrl}get-stored-location`,
        deleteStoredLocation: `${baseUrl}delete-stored-location`,
        activateStoredLocation: `${baseUrl}activate-stored-location`,
    },

    profile: {
        updateAccount: `${baseUrl}update-account`,
        updateProfile: `${baseUrl}update-profile`,
        updatePhoto: `${baseUrl}update-photo`,
    },
};
