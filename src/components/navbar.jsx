import React, { useContext } from "react";

import { ThemeContext } from "../context/themeContext";
import '../navbar.css'
export function NavbarComponent({searchTerm, setSearchTerm}) {

    return (
        <>
            <div className="navbarComponent">
                <p className="navbarSiteTitle">Les petits plats de julien</p>
                <img src="/src/assets/recipes/header.png" alt="siteHeaderImage" className="siteHeaderImage" />
                <p className="navbarSiteSubTitle">CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES</p>
                <div className="navbarSearchDiv">
                    <input type="text" placeholder="Rechercher une recette, un ingrédients,..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="navbarSearch" />
                    <div className="navbarSearchIcon">
                        <i class="fi fi-rr-search"></i>
                    </div>


                </div>
                

            </div>
        </>
    );
}