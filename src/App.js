import React, { useState, useEffect } from 'react'
import getHomeList from './Tmdb'
import { getMovieInfo } from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header/Header'

import './App.css'

function App() {
  const [movieList, setMovieList] = useState([])
  const [featureData, setFeatureData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)
  const [connect, setConnect] = useState('loading')

  useEffect(()=>{
    setTimeout(()=>{
      setConnect('loading desconnect')
    },2000)

  },[])

  useEffect(() => {
    const loadAll = async () => {
      let list = await getHomeList()
      setMovieList(list)

      // PEGANDO O FEATURED
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(
        Math.random() * originals[0].items.results.length - 1
      )
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await getMovieInfo(chosen.id, 'tv')
      setFeatureData(chosenInfo)
    }

    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      window.scrollY > 25 ? setBlackHeader(true) : setBlackHeader(false)
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)

    }
  }, [])

  
 

  return (
    <div className="page">
      <Header black={blackHeader} />

      {/* quando deixar de ser nulo, quando existir mostra o componente */}
      {featureData && <FeaturedMovie item={featureData} />}

      <section className="lists" >
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <p>
          Feito por
          <a href="https://samaeldev.herokuapp.com" target="blank">
            Samael Melo
          </a>
        </p>
        <p>Direitos de imagem Netflix</p>
        <p>Dados importados do site Themoviedv.org</p>
      </footer>

      {/* {movieList.length <= 0 && */}

      <div className={connect}>
        <img
          src="https://1.bp.blogspot.com/-B9juta27w6o/Xzk4GGrOziI/AAAAAAABtpE/0OMhU_0hPTY7PhayDfL3eJ5mIc2csWWWwCLcBGAsYHQ/s1600/Netflix_LoadTime.gif"
          alt="Carregando"
        />
      </div>

      {/* } */} 
    </div>
  )
}

export default App
