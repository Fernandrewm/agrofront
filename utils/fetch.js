import { getToken, hasExperiedToken } from "../api/token";

//Para peticiones donde el usuario este logueado
export async function authFetch(url, params, logout) {
    const token = getToken();
    if(!token){
        //Usuario no logueado
        logout();
    } else {
        if(hasExperiedToken(token)){
            //Token caducado
            logout();
        } else {
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                },
            };
            try {
                const response = await fetch(url, paramsTemp);
                const result = await response.json();
                return result;
            } catch (error) {
                return error;
            }
        }
    }
}