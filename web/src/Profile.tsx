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
        <div className="p-10 h-screen">
            <div className="rounded-xl flex justify-center max-w-2xl bg-white shadow-lg p-10">
                <div className=" flex items-center w-1/4 text-4xl">{name}</div>
                <div className="w-3/4 space-y-5">
                    <div className="flex">
                        <p className="w-1/2">Society Name</p>
                        <p className="w-1/2">{data[0].Society_Name}</p>
                    </div>
                    <hr/>
                    <div className="flex">
                        <p className="w-1/2">Mail Address</p>
                        <p className="w-1/2">{data[0].Mail_Address}</p>
                    </div>
                    <hr/>
                    <div className="flex">
                        <p className="w-1/2">Address</p>
                        <p className="w-1/2">{data[0].Addresse}</p>
                    </div>
                    <hr/>
                    <div className="flex">
                        <p className="w-1/2">Phone Number</p>
                        <p className="w-1/2">{data[0].Phone_Number}</p>
                    </div>
                    <hr/>
                    <div className="flex">
                        <p className="w-1/2">Country</p>
                        <p className="w-1/2">{data[0].Country_Name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;