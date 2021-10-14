import React from "react";
import { useState, useEffect } from "react";
import { Character } from "../agent/Character";

export default function DashBoard(){

    const [characters, setCharacter] = useState<Character[]>([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<Character[]>([]);

    useEffect (() =>{
        // axios.get('https://rickandmortyapi.com/api/character')
        //     .then(response => response)
        //     .then(data => console.log(data))
        getMyData();
    },[]);

    const getMyData = async () => {
        // const response = await fetch('https://pokeapi.co/api/v2/type')
        const response = await fetch('https://rickandmortyapi.com/api/character')
        const data =await response.json();
        setCharacter(data.results);
    }

    useEffect(() => {
        setFilter(characters.filter(character =>{
            return character.name.toUpperCase().includes(search.toUpperCase())
        })
        )
        }, [search, characters]
    );

    
    
    return(
        <>
        <div className="container">
            <input placeholder="Digite o nome do personagem" onChange={e => {setSearch(e.target.value)}}/>
            <div className="cards">
                {filter.map(per => (
                    <div className="card" key={per.id}>
                        <p>{per.name}</p>
                        <img src={per.image} alt={per.name}></img>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}