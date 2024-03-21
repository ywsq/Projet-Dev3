import React, { useState } from 'react';

function Test() {
    const [data, setData] = useState(null);

    function handleClick() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'API/article/articleID/1');
        xhr.onload = function() {
            if (xhr.status === 200) {
                setData(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    }

    return (
        <div>
            <button onClick={handleClick}>Get Data</button>
            {data ? <div>{JSON.stringify(data[0]['Name'])}</div> : <div>Loading...</div>}
        </div>
    );
}

export default Test;