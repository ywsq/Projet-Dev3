import React, { useEffect, useState } from 'react';
import Banniere from "./Banniere";
import "./Store.css"


function Store() {


    function copyTextToClipboard(text:string) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    function handleClick(text:string) {
        copyTextToClipboard(text);
    }

    function openGoogleMapsBrussel() {
        window.open('https://maps.app.goo.gl/Udg5Anndv9HVXQc18', '_blank');
    }
    function openGoogleMapsMaastricht() {
        window.open('https://maps.app.goo.gl/Udg5Anndv9HVXQc18', '_blank');
    }
    function openGoogleMapsLiege() {
        window.open('https://maps.app.goo.gl/Udg5Anndv9HVXQc18', '_blank');
    }



    return (
            <section>
                <div className='components'>
                    <div className='componentsText'>
                        <div className='componentsTextTitle'>Brussel
                        </div>
                        <div onClick={() => handleClick("Bergensesteenweg 90, 1600 Sint-Pieters-Leeuw")}>
                            <div className="buttonAddress" style={{display: 'flex'}}>Bergensesteenweg 90, 1600
                                Sint-Pieters-Leeuw
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     style={{margin: '0 0 0 10px'}} viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                                </svg>
                            </div>
                            <div className="openHours">
                                Monday: 9am–7:45pm<br/>
                                Tuesday: 9am–7:45pm<br/>
                                Wednesday: 9am–7:45pm<br/>
                                Thursday: 9am–7:45pm<br/>
                                Friday: 9am–7:45pm<br/>
                                Saturday: 9am–7:45pm<br/>
                                Sunday: Closed<br/>

                            </div>
                        </div>
                        <button className='w-52 px-7 py-3 bg-white border border-gray-900 text-gray-900 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:ring-4 hover:ring-sky-200 transition duration-500 rounded-full text-center' onClick={openGoogleMapsBrussel}>GO
                            TO
                        </button>
                    </div>
                    <div className="google-map componentsImage">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40346.50729275141!2d4.288111831611529!3d50.80047040735231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c664a83816d5%3A0x7bd61460cec71ca0!2sStar%20Mobile%2C%20Grossiste%20Bruxelles!5e0!3m2!1sen!2sbe!4v1713373767082!5m2!1sen!2sbe"
                            width="450" height="360" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <div className='components'>
                    <div className="google-map componentsImage" >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d647484.6987735553!2d3.977372121630235!3d50.6598580976166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0e9b834b5a15d%3A0xacbb4a254b43f0dc!2sStar%20Mobile%20-%20iPhone%20-%20Samsung%20-%20Reparatie%20Maastricht!5e0!3m2!1sen!2sbe!4v1713375306295!5m2!1sen!2sbe"
                            width="600" height="450" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>

                    </div>
                    <div className='componentsText'>
                        <div className='componentsTextTitle'>Maastricht
                        </div>
                        <div onClick={() => handleClick("Spilstraat 11, 6211 CN Maastricht, Netherlands")}>
                            <div className="buttonAddress" style={{display: 'flex'}}>Spilstraat 11, 6211 CN Maastricht, Netherlands
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     style={{margin: '0 0 0 10px'}} viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                                </svg>
                            </div>
                            <div className="openHours">
                                Monday: 12am–6pm<br/>
                                Tuesday: 10am–6pm<br/>
                                Wednesday: 10am–6pm<br/>
                                Thursday: 10am–9pm<br/>
                                Friday: 10am–7pm<br/>
                                Saturday: 10am–7pm<br/>
                                Sunday: 12am-7pm<br/>

                            </div>
                        </div>
                        <button className='w-52 px-7 py-3 bg-white border border-gray-900 text-gray-900 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:ring-4 hover:ring-sky-200 transition duration-500 rounded-full text-center'
                                onClick={openGoogleMapsMaastricht}>GO TO
                        </button>
                    </div>
                </div>
                <div className='components'>
                    <div className='componentsText'>
                        <div className='componentsTextTitle'>Liege
                        </div>
                        <div onClick={() => handleClick("Rue Pont d'île 15, 4000 Liège")}>
                            <div className="buttonAddress" style={{display: 'flex'}}>Rue Pont d&apos;île 15, 4000 Liège
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     style={{margin: '0 0 0 10px'}} viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                                </svg>
                            </div>
                            <div className="openHours">
                                Monday: 10am–6pm<br/>
                                Tuesday: 10am–6pm<br/>
                                Wednesday: 10am–6pm<br/>
                                Thursday: 10am–6pm<br/>
                                Friday: 10am–6pm<br/>
                                Saturday: 10am–6pm<br/>
                                Sunday: Closed<br/>
                            </div>
                        </div>
                        <button className='w-52 px-7 py-3 bg-white border border-gray-900 text-gray-900 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:ring-4 hover:ring-sky-200 transition duration-500 rounded-full text-center' onClick={openGoogleMapsLiege}>GO
                            TO
                        </button>
                    </div>
                    <div className="google-map componentsImage">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d647484.6987735553!2d3.977372121630235!3d50.6598580976166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0fbafc12f9759%3A0x8e47407496bde4bf!2sStar%20Mobiles!5e0!3m2!1sen!2sbe!4v1713375386520!5m2!1sen!2sbe"
                            width="600" height="450" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <div style={{padding: '20px 0'}}></div>

            </section>
    );
}

export default Store;