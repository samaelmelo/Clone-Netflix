const API_KEY = '314abce9999f633d69261bae3141a24e'
const API_BASE = 'https://api.themoviedb.org/3'

/*
 pegar os :
 -originais da netflix
 -recomendados (trending)
 -em alta (top rated)
 -ação
 -romance
 -terror
 -documentação
*/ 

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`)
  const json = await req.json()
  return json
}

const languageAndAPI = `language=pt-BR&api_key=${API_KEY}`


export default async function getHomeList() {
  return [
    {
      slug: 'originals',
      title: 'Originais da Netflix',
      items: await basicFetch(`/discover/tv?with_network=213&${languageAndAPI}`),
    },

    {
      slug: 'trendings',
      title: 'Recomentados para você',
      items: await basicFetch(`/trending/all/week?${languageAndAPI}`),
    },

    {
      slug: 'toprated',
      title: 'Em Alta',
      items: await basicFetch(`/movie/top_rated?${languageAndAPI}`),
    },
    {
      slug: 'Action',
      title: 'Ação',
      items: await basicFetch(`/discover/movie?with_genres=28&${languageAndAPI}`),
    },
    {
      slug: 'Comedy',
      title: 'Comédia',
      items: await basicFetch(`/discover/movie?with_genres=35&${languageAndAPI}`),
    },
    {
      slug: 'Horror',
      title: 'Terror',
      items: await basicFetch(`/discover/movie?with_genres=27&${languageAndAPI}`),
    },
    {
      slug: 'Romance',
      title: 'Romance',
      items: await basicFetch(`/discover/movie?with_genres=10749&${languageAndAPI}`),
    },
    {
      slug: 'Documentary',
      title: 'Documentario',
      items: await basicFetch(`/discover/movie?with_genres=99&${languageAndAPI}`),
    },
  ]
} 

export async function getMovieInfo(movieId,type) {
  let info = { }

  if(movieId){
     if(type === 'movie'){
        info = await basicFetch(`/movie/${movieId}?${languageAndAPI}`)
     }else if(type === 'tv'){
        info = await basicFetch(`/tv/${movieId}?${languageAndAPI}`)
     }
  }

  return  info;
}







