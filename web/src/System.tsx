import React, { useState, useEffect } from 'react';
import './System.css'

function System() {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    // Fonction pour obtenir l'heure actuelle sous forme de chaîne HH:MM:SS
    function getCurrentTime() {
        const date = new Date();
        return (
            padWithZero(date.getHours()) +
            ':' +
            padWithZero(date.getMinutes()) +
            ':' +
            padWithZero(date.getSeconds())
        );
    }

    // Fonction pour ajouter un zéro devant les chiffres inférieurs à 10
    function padWithZero(number: number) {
        return number < 10 ? '0' + number : number;
    }

    // Mettre à jour l'heure toutes les secondes
    useEffect(() => {
        const timerID = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 500);

        // Nettoyer le timer lors du démontage du composant
        return () => clearInterval(timerID);
    }, []);

    return (
        <section className={"System"}>
            <div className={"Time"}>{currentTime}</div>
            <div className="solar-system">
                <div id="sun"></div>

                <div className="orbit mercury-orbit"></div>
                <div className="mercury-spin">
                    <div id="mercury"></div>
                </div>

                <div className="orbit venus-orbit"></div>
                <div className="venus-spin">
                    <div id="venus"></div>
                </div>

                <div className="orbit earth-orbit"></div>
                <div className="earth-spin">
                    <div className="orbit moon-orbit"></div>
                    <div className="moon-spin">
                        <div id="moon"></div>
                    </div>

                    <img id="earth"
                         src="https://raw.githubusercontent.com/everdimension-personal/codepen-assets/master/earth_small_150.jpg"/>
                </div>

                <div className="orbit mars-orbit"></div>
                <div className="mars-spin">
                    <div id="mars"></div>
                </div>
            </div>
        </section>
    );
}

export default System;