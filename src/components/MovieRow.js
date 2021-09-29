import React, {useState} from "react";
import NavigateBefore from "@material-ui/icons/NavigateBefore"
import NavigateAfter from "@material-ui/icons/NavigateNext"

import './MovieRow.css'


export default function MovieRow({title, items}) {
  const [scrollx, setScrollx] = useState(-400)

  const handleLeftArrow = () => {
    let x = scrollx + Math.round( window.innerWidth / 2);
    
    if(x > 0){
      x = 0
    }
    setScrollx(x)

  }
  const handleRightArrow = () => {

    let x = scrollx - Math.round( window.innerWidth / 2);
    let listWidth = items.results.length * 160
    if((window.innerWidth - listWidth) > x){
      x = (window.innerWidth - listWidth) - 60
    }

    setScrollx(x)
  }


  return (
    <div className='movie-row'> 
        <h2>{title}</h2>

        <div className="movie-row-left" onClick={handleLeftArrow}>
            <NavigateBefore style={{fontSize: '2rem'}} />
        </div>
        <div className="movie-row-right" onClick={handleRightArrow}>
            <NavigateAfter style={{fontSize: '2rem'}} />
        </div>

        <div className='movie-row-list-area'>
              <div className='movieRow-list' 
                    style={
                          {
                            marginLeft: scrollx,
                            width: items.results.length * 160,
                          }
                        }>
                   {items.results.length > 0 && items.results.map( (item, key) => (

                    <div key={key} className='movie-row-item'>
                       <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>

                     </div>
                ) )}

              </div>


          

        </div>
    </div>
  )
}