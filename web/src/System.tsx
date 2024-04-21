import React from 'react';
import './System.css'

function System() {
    return (
        <section className={"System"}>
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