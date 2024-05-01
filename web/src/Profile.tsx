import React, {useEffect, useState} from 'react';
import axios from "axios";

function Profile() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('API/client/');
                setData(response.data);
            } catch (error) {
                // Gérer les erreurs, par exemple :
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    if (data.length === 0) {
        return <div className="loader"></div>;
    }

    const name = data[0].Mail_Address.split('@')[0];

    return (
        <div>
            <ul>
                <li>Name : {name}</li>
                <li>Society Name : {data[0].Society_Name}</li>
                <li>Mail Address : {data[0].Mail_Address}</li>
                <li>Address : {data[0].Addresse}</li>
                <li>Phone Number : {data[0].Phone_Number}</li>
                <li>Country : {data[0].Country_Name}</li>
            </ul>
        </div>
    );
}

export default Profile;