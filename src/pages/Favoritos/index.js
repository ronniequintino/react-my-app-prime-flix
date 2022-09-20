import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Favoritos(){
    const [filmes, setFilmes] = useState([]);
    
    useEffect( ()=> {
        const minhaLista = localStorage.getItem('@primeFlix');
        console.log(localStorage.getItem('@primeFlix'))
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (item) => {
            return (item.id !== id)
        });
        setFilmes(filtroFilmes);
        localStorage.setItem('@primeFlix', JSON.stringify(filtroFilmes));
        toast.success('Filme removido com sucesso!')
    }

    return(
        <div className='meus-filmes'>
            <h1>
                Meus filmes favoritos 
            </h1>

            {
                filmes.length === 0 && 
                <div>
                    Você não possue nenhum filme salvo :´( 
                </div>
            }
            {
                filmes.length > 0 &&
                <div className='contador'>
                    Você tem <strong> { filmes.length } </strong> filmes favoritados
                </div>
            }

            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>
                                {item.title}
                            </span>
                            <div>
                                <Link to={`/filme/${item.id}`}>
                                    Ver detalhes
                                </Link>
                                <button onClick={()=> excluirFilme(item.id)}>
                                    Remover
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;