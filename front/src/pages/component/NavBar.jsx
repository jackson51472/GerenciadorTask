import React from 'react';
import '../css/nav_bar.scssy'; // Certifique-se de que o caminho para o arquivo SCSS está correto

const NavBar = () => {
    return (
        <div className="main-head">
            <nav className="head-nav">
                <ul>
                    <li>
                        <a href="#home">
                            <svg>
                                <use xlinkHref="#facebook" />
                            </svg>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#about">
                            <svg>
                                <use xlinkHref="#googleplus" />
                            </svg>
                            <span>About</span>
                        </a>
                    </li>
                    <li>
                        <a href="#services">
                            <svg>
                                <use xlinkHref="#instagram" />
                            </svg>
                            <span>Services</span>
                        </a>
                    </li>
                    <li>
                        <a href="#contact">
                            <svg>
                                <use xlinkHref="#paper-airplane" />
                            </svg>
                            <span>Contact</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="wrap-all-the-things"></div>
        </div>
    );
};

export default NavBar;
