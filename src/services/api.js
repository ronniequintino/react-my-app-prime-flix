import axios from "axios";

// Base da URL - http://api.themoviedb.org/3/
// http://api.themoviedb.org/3/movie/now_playing?api_key=ae481757bbf58fc6e8f12db4fc4298fe&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;