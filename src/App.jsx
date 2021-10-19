import React from "react";
import "./App.css"
import { useEffect, useState } from "react";
import Tmdb from "./Tmdb"
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default function App() {

    const [movielist, setMovieList] = useState([])
    const [featuredData, setFeaturedData] = useState(null)
    const [blackHeader, setBlackHeader] = useState(false)

    useEffect(() => {
        const loadAll = async () => {
            let list = await Tmdb.getHomeList()
            setMovieList(list)

            let originals = list.filter(i => i.slug === 'originals')
            let radomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
            let chosen = originals[0].items.results[radomChosen]
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
            setFeaturedData(chosenInfo)
        }

        loadAll()
    },[])

    useEffect (() => {
        const scrollListener = () => {
            if(window.scrollY > 10) {
                setBlackHeader(true)
            } else {
                setBlackHeader(false)
            }
        }

        window.addEventListener('scroll', scrollListener)

        return () => {
            window.removeEventListener('scroll', scrollListener)
        }
    }, [])

    return (
        <div className="page">

            <Header black={blackHeader}/>
          
          {featuredData &&
            <FeaturedMovie item={featuredData}/>
          }

           <section className="lists">
            {movielist.map((item, key) => (
                <MovieRow key={key} title={item.title} items={item.items}/>
            ))}
           </section> <hr />

           <footer>
               Web site totalmento inlustrativo, com o intuito de praticar os conceitos de React.js.
              <span>Todos os direitos de imagem para <a href="https://www.netflix.com/br/" target="_blanck">Netflix</a></span>
              <span>Dados coletados a partir da API disponibilizada no site <a href="https://www.themoviedb.org/?language=pt-BR" target="_blanck">Themoviedb.org</a></span> 
              <span>Segue o link para meu GitHub <a href="https://github.com/FernandoDev97" target="_blanck">FernandoDev97</a></span>
           </footer>
        </div>
    )
}

