import { useState } from "react";
import ColorComponent from "./component/ColorComponent";
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './component/Home'
function App(){
    //read localStorage 'pairs' 
    localStorage.clear();
   let storedPairs = localStorage.getItem('pairs');
   storedPairs = JSON.parse(storedPairs);
    //if localStorage 'pairs' exists, assign it to 'pairs' state, if not, create new 'pairs'
    const [pairs, setPairs] = useState(storedPairs || [
        {id: 0, name:'first', color:'white'},
        {id: 1, name:'second', color:'white'},
        {id: 2, name:'third', color:'white'},
        {id: 3, name:'fourth', color:'white'},
        {id: 4, name:'fifth', color:'white'},
        {id: 5, name:'sixth', color:'white'},

    ]);
    //save 'pairs' to localStorage, enable data preserve between navigations
    localStorage.setItem('pairs', JSON.stringify(pairs));
    

    //change color of the on display color component by selecting from the drop-down button
    const changeColor = (id, newColor)=>{
        const updatedPairs = pairs.map((pair) => {
            if(pair.id === id){
                return {...pair, color:newColor};
            }
            return pair;
        });
        setPairs(updatedPairs);
        //update 'pairs' to localStorage
        localStorage.setItem('pairs', JSON.stringify(pairs));
    };

    //change the name of the on display color component by typing in input bar
    const updateName = (id, newName)=>{
        const updatedPairs = pairs.map((pair) =>{
            if(pair.id === id){
                return {...pair, name: newName};
            }
            return pair;
        });
        setPairs(updatedPairs);
        //update 'pairs' to localStorage
        localStorage.setItem('pairs', JSON.stringify(pairs));
    }

    return (
       
    <div>
        <Routes>
            <Route  path='/' element={<Home name={pairs[0].name} />}/>
            <Route path='/color-component/:name' 
                element={<ColorComponent changeColor={changeColor} updateName={updateName} pairs={pairs} />}/>
            <Route path='*' element={<Navigate to="/" />} />
    </Routes>
    </div>
    );
}

export default App;