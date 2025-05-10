import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/themeContext";

import '../filters.css';
export function FiltersComponent({ recipes, filteredRecipes, setFilteredRecipes, searchTerm }) {
    const [ingredientsIsOpen, setIngredientsIsOpen] = useState(false);
    const [devicesIsOpen, setDevicesIsOpen] = useState(false);
    const [utensilsIsOpen, setUtensilsIsOpen] = useState(false);
    const [listTags, setListTags] = useState([])

    


    const [ingredientList, setIngredientList] = useState([])
    const [searchIngredients, setSearchIngredients] = useState("")
    
    const [deviceList, setDeviceList] = useState([])
    const [searchDevices, setSearchDevices] = useState("")

    const [utensilList, setUtensilList] = useState([])
    const [searchUtensils, setSearchUtensils] = useState("")


    //Fonction permettant de déterminer l'état des filtres (liste de filtres ouverte ou fermée)
    const handleIngredientsCheckboxChange = () => {
        setIngredientsIsOpen(!ingredientsIsOpen);
    };
    const handleDevicesCheckboxChange = () => {
        setDevicesIsOpen(!devicesIsOpen);
    };
    const handleUtensilsCheckboxChange = () => {
        setUtensilsIsOpen(!utensilsIsOpen);
    };

    // UseEffect permettant l'actualisation de la liste de recettes via la fonction filterRecipesBySearchAndFilter
    useEffect(() => {
        filterRecipesBySearchAndFilter()
        

    }, [searchTerm, listTags])

    // UseEffect permettant l'actualisation des 3 listes de filtres lors de recherches d'un ingredients, appareil ou ustensiles
    useEffect(() => {
        getIngredientsList()
    }, [searchIngredients])
    useEffect(() => {
        getDevicesList()
    }, [searchDevices])
    useEffect(() => {
        getUtensilsList()
    }, [searchUtensils])
    
    
    
    

    // Fonction permettant le filtrage de la liste de recettes via la barre de recherche de la navbar et des filtres d'ingrédients, appareils et ustensiles
    function filterRecipesBySearchAndFilter() {
        // Filtres sur la recherche de la navbar
        const lowerSearchTerm = searchTerm.toLowerCase();
        const tagItems = listTags.map(tag => tag.item.toLowerCase());

        const filtered = recipes.filter(recipe => {
            
            var searchMatch = []
            if(searchTerm.length >= 3 ){
                searchMatch = recipe.name.toLowerCase().includes(lowerSearchTerm) ||
                                    recipe.description.toLowerCase().includes(lowerSearchTerm) ||
                                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerSearchTerm));
            }
            
            // Vérifier que tous les tags sont présents (nom, description, ingrédients)
            const tagsMatch = tagItems.every(tag =>
                recipe.name.toLowerCase().includes(tag) ||
                recipe.description.toLowerCase().includes(tag) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag)) ||
                recipe.appliance.toLowerCase().includes(tag) ||
                recipe.utensils.some(utensil => utensil.toLowerCase().includes(tag))
            );

            return searchMatch && tagsMatch; // Filtre uniquement si searchTerm et tous les tags correspondent
        });
        
        
        if(searchTerm.length >= 3 || listTags.length > 0){
            // Dans le cas ou il y a une recherche ou des tags on définie les recettes sur la liste filtrée
            setFilteredRecipes(filtered);
        }
        else{
            // Dans le cas contraire on définie sur la liste initiale
            setFilteredRecipes(recipes)
        }
        

    }

    

    
    // Fonction permettant l'actualisation de la liste des ingrédients en fonction de la liste de recettes actuelles ainsi que de la recherches d'ingrédients 
    function getIngredientsList() {
        var datas = []

        const recipesArray = (filteredRecipes.length > 0) ? filteredRecipes : recipes         
        recipesArray.map((recipe, index) => (
            (recipe).ingredients.map((ingredient, index) => (
                datas.push(ingredient.ingredient)
            ))

        ))
        datas = [...new Set(datas)]
        if(searchIngredients != ""){
            datas = datas.filter(data => data.toLowerCase().includes(searchIngredients.toLowerCase()))
        }
        return(datas)
        
    }
    // Fonction permettant l'actualisation de la liste des appareils en fonction de la liste de recettes actuelles ainsi que de la recherches d'appareils 
    function getDevicesList() {
        var datas = []
        const recipesArray = (filteredRecipes.length > 0) ? filteredRecipes : recipes         
        recipesArray.map((recipe, index) => (
            datas.push(recipe.appliance)
        ))
        datas = [...new Set(datas)]
        if(searchDevices != ""){
            datas = datas.filter(data => data.toLowerCase().includes(searchDevices.toLowerCase()))
        }
        return (
            datas
        )
    }
    // Fonction permettant l'actualisation de la liste des ustensiles en fonction de la liste de recettes actuelles ainsi que de la recherches d'ustensiles 
    function getUtensilsList() {
        var datas = []
        const recipesArray = (filteredRecipes.length > 0) ? filteredRecipes : recipes         
        recipesArray.map((recipe, index) => (
            recipe.utensils.map((utensil, index) => (
                datas.push(utensil)
            ))
        ))
        datas = [...new Set(datas)]
        if(searchUtensils != ""){
            datas = datas.filter(data => data.toLowerCase().includes(searchUtensils.toLowerCase()))
        }
        return (
            datas
        )
    }
    // Fonction permettant d'ajouter des élements de filtres dans la listes de tags (nom du filtres et catégorie du filtres (ingrédients, appareils et ustensiles))
    function addItemToTags(item, listName){
        listTags.push({ item: item, listName: listName });
    
        // Suppression des doublons avec Set
        const datas = [...new Set(listTags.map(JSON.stringify))].map(JSON.parse);
        setListTags(datas);
        
    }
    // Fonction permettant la suppression d'un filtre de la liste des tags
    function deleteFromTagsList(index){
        const newList = listTags.filter((_, i) => i !== index);
       
        setListTags(newList);
    }

    // Fonction permettant d'afficher la listes des ingrédients, appareils et ustensiles disponibles filtrer grâce au fonction de filtre et à la liste de recettes actuelle
    function listShow(list, listName) {
        return (
            <>
                {list.map((item, index) => (
                    <li onClick={() => addItemToTags(item, listName)}>{item}  </li>
                ))}
            </>
        )
    }

    return (
        <>

            <div className="filtersComponent">
                <div className="filtersList">

                    <div className="filter">
                        <div className="checkboxDiv">
                            <input
                                type="checkbox"
                                id="ingredientsDropdown"
                                onChange={handleIngredientsCheckboxChange}
                                checked={ingredientsIsOpen}
                            />
                            <label htmlFor="ingredientsDropdown" className="filterTitle">Ingrédients {ingredientsIsOpen ? <i className="fi fi-rr-angle-small-up"></i> : <i className="fi fi-rr-angle-small-down"></i>}</label>
                        </div>

                        {ingredientsIsOpen && (
                            <div className="filterContent">
                                <input type="text" placeholder="Chercher un Ingrédient" className="filterSearch" onChange={(e) => setSearchIngredients(e.target.value)}/>
                                <div className="filterList">
                                    <ul>
                                        {listShow(getIngredientsList(), "Ingredients")}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="filter">
                        <div className="checkboxDiv">
                            <input
                                type="checkbox"
                                id="devicesDropdown"
                                onChange={handleDevicesCheckboxChange}
                                checked={devicesIsOpen}
                            />
                            <label htmlFor="devicesDropdown" className="filterTitle">Appareils {devicesIsOpen ? <i className="fi fi-rr-angle-small-up"></i> : <i className="fi fi-rr-angle-small-down"></i>}</label>
                        </div>

                        {devicesIsOpen && (
                            <div className="filterContent">
                                <input type="text" placeholder="Chercher un Appareil" className="filterSearch" onChange={(e) => setSearchDevices(e.target.value)}/>

                                <div className="filterList">
                                    <ul>
                                    {listShow(getDevicesList(), "Devices")}
                                    </ul>
                                </div>
                            </div>)}
                    </div>
                    <div className="filter">
                        <div className="checkboxDiv">
                            <input
                                type="checkbox"
                                id="utensilsDropdown"
                                onChange={handleUtensilsCheckboxChange}
                                checked={utensilsIsOpen}
                            />
                            <label htmlFor="utensilsDropdown" className="filterTitle">Ustensiles {utensilsIsOpen ? <i className="fi fi-rr-angle-small-up"></i> : <i className="fi fi-rr-angle-small-down"></i>}</label>
                        </div>
                        {utensilsIsOpen && (
                            <div className="filterContent">
                                <input type="text" placeholder="Chercher un Ustensile" className="filterSearch" onChange={(e) => setUtensilSearch(e.target.value)}/>

                                <div className="filterList">
                                    <ul>
                                        
                                    {listShow(getUtensilsList(), "Utensils")}
                                    </ul>
                                </div>
                            </div>)}
                    </div>
                </div>


                

            </div>
            <div className="filtersTagsDiv">
                    <ul className="filterTagsList">
                        {listTags.map((tag,index) => (
                            <li onClick={()=>deleteFromTagsList(index)} className={"filterTags" + tag.listName}>{tag.item}</li>
                        ))}
                    
                    </ul>
                </div>
        </>
    );
}