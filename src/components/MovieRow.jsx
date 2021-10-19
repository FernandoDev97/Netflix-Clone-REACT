import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import React, { useState } from "react";
import './MovieRow.css'


export default function MovieRow ({title, items}) {
    const [scrollX, setScrollX] = useState(-730)
    
    const handleLeftArrow = () => {
        let x = scrollX + Math.round (window.innerWidth / 2)
        if(x > 0) {
            x = 0;
        }
        setScrollX(x)
    }

    const handleRigthArrow = () => {
        let x = scrollX - Math.round (window.innerWidth / 2)
        let listW = items.results.length * 200
        if((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60
        }
        setScrollX(x)
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className='movieRow-btnLeft' onClick={handleLeftArrow}>  
               <NavigateBefore style={{ fontSize: 50 }}/>
            </div>
            <div className='movieRow-btnRight' onClick={handleRigthArrow}>
                <NavigateNext style={{ fontSize: 50 }}/>
            </div>
            <div className="movieRow-listarea">
                <div className="movieRow-list" style= {{
                    marginLeft: scrollX,
                    width: items.results.length * 270
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className='movieRow-item'>   
                            <img  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.orgial_title}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}