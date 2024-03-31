import React, {useState} from 'react';

interface IDataItem {
    Amount: number; // Supposons que Amount soit un nombre
    // Définissez ici d'autres propriétés de IDataItem si nécessaire
}

const Test: React.FC = () => {
    const [data, setData] = useState<IDataItem[] | null>(null);

    const handleClick = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'API/cart/1');
        xhr.onload = function () {
            if (xhr.status === 200) {
                setData(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    };

    return (
        <div>
            <button onClick={handleClick}>Get Data</button>
            {data ? (
                <div>
                    {data.map((item, index) => (
                        <div key={index}>{JSON.stringify((item as IDataItem))}</div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Test;
