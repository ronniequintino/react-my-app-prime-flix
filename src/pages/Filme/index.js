import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme.css';
import { toast } from 'react-toastify';

function Filme(){
    const { id } = useParams();
    const navigation = useNavigate();
    const [ filme, setFilme ] = useState({});
    const [ loading, setLoading ] = useState(true);
    
    useEffect( ()=> {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: 'ae481757bbf58fc6e8f12db4fc4298fe',
                    language: 'pt-BR',
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
                console.log(response.data)
            })
            .catch(()=>{
                console.log('Filme não encontrado');
                navigation('/', { replace:true });
                return;
            })
        }
        loadFilme();

        return () => {
            console.log('Desmontado')
        };

    }, [navigation, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeFlix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id );

        if(hasFilme){
            toast.warning('Este filme já esta na sua lista!');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeFlix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso...');

    }

    if(loading){
        return(
            <div className='filme-info'>
                Carregando detalhes...
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>
                {filme.title}
            </h1>
            <img alt={filme.title} src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}/>
            <h3>
                Sinopse
            </h3>
            <p>
                {filme.overview}
            </p>
            <strong>
                Avaliação: {filme.vote_average} / 10
            </strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme} className='button'>
                    Salvar
                </button>
                <a target='blank' rel='external' className='button' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
            </div>
        </div>
    )
}

export default Filme;