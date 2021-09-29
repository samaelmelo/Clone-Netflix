import React from "react";
import './FeaturedMovie.css';
export default function FeaturedMovie({item}){
  

  let firstDate = new Date(item.first_air_date)
 
  let genres = item.genres.map( item => item.name)
  
  let description = item.overview
  if(description.length > 250){
    description = description.substring(0, 200)+'...'
  }

  return(
    <section className='featured' style={{
      backgroundImage: `url(http://image.tmdb.org/t/p/original${item.backdrop_path})`
    }}>
        <div className='featured-vertical'>
          <div className="featured-horizontal">
              <h1 className="featured-name">{item.original_name}</h1>
              <div className="featured-info">
                  <span className="featured-points">
                    {item.vote_average} pontos
                  </span>
                  <span className="featured-year">{firstDate.getFullYear()}</span>
                  <span className="featured-seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</span>
              </div>

              <h3 className="featured-description" >{description}</h3>

              <div className="featured-buttons">
                <a href={`/watch/${item.id}`} className='featured-watchButton'>► Assitir</a>
                <a href={`/list/add/${item.id}`} className='featured-MyListButton'>+ Minha Lista</a>
              </div>

              <span className="featured-genres">
                <strong>Gêneros:</strong> {genres.join(', ')}
              </span>
          </div>

        </div>
    </section>
  )
}