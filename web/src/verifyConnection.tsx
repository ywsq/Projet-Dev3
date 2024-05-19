import {useEffect, useState} from "react";
import axios from "axios";

const auth_token = localStorage.getItem("auth_token");
const refresh_auth_token = localStorage.getItem("refresh_auth_token");

export function verifyConnect() {
    if (auth_token) {
        return !!refresh_auth_token;
    }
    return false;
}

export function useAdminConnect() {
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (auth_token) {
                    const response = await axios.get('API/admin/manage-accounts/admin');
                    setAdminData(response.data[0].admin);
                }
            } catch (error) {
                // Gérer les erreurs, par exemple :
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, [auth_token]);

    // Vérification des tokens et retour des données
    if (auth_token && refresh_auth_token && (adminData || (adminData == 4))) {
        return adminData;
    }

    return null;
}