import React, { useState } from 'react';
import './App.css'; // Assurez-vous d'avoir votre fichier CSS pour le style

function App() {
  const [isOpen, setIsOpen] = useState(false); // État pour contrôler l'ouverture de la barre latérale

  // Fonction pour basculer l'état de la barre latérale
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <header>
        <nav className="navbar">
          <figure className="logo">
            <img src="img/logoStarNoBack.png" alt="Logo" />
          </figure>

          {/* Bouton du menu */}
          <button className="menu-button" aria-label="Menu" onClick={toggleSidebar}>
            <img src="img/icons/burger-menu-svgrepo-com.svg" alt="Menu" />
          </button>

          {/* Barre de navigation */}
          <ul className={`menu ${isOpen ? 'open' : ''}`}>
            <li><a href="#">Products</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Stores</a></li>
            <li><a href="#">Contact</a></li>
            <li id="login"><a href="#">Log in</a></li>
          </ul>
        </nav>
      </header>

      {/* Votre contenu ici */}

    </div>
  );
}

export default App;
