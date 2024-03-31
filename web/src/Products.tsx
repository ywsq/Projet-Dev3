import React, { useState } from 'react';

interface IDataItem {
    ID_Category: number;
    Category_Name: string; // Adjusted interface
    // Define other properties if needed
}

const Products: React.FC = () => {
    const [data, setData] = useState<IDataItem[] | null>(null);

    const handleClick = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'API/article/categories');
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                setData(JSON.parse(xhr.responseText));
                console.log(xhr.responseText);
            }
        };
        xhr.send();
    };

    console.log(data)

    return (
        <div>
            <button onClick={handleClick}>Get Data</button>
            {data ? (
                <div>
                    {data.map((item) => (
                        <div key={item.ID_Category}>{item.Category_Name}</div>
                    ))}
                </div>

            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Products;
