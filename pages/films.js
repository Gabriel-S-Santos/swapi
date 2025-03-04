import { fetchFilms, fetchFilmSequence } from '../lib/swapi';
import Link from 'next/link';
import FilmCard from '../components/FilmCard';
import { useState, useEffect } from 'react';

export default function Films({ initialFilms }) {
    const [films, setFilms] = useState(initialFilms.results);
    const [orderBy, setOrderBy] = useState('release');  
    const [characterId, setCharacterId] = useState(''); 

    useEffect(() => {
        const fetchData = async () => {
            const orderedFilms = await fetchFilmSequence(orderBy, characterId);
            setFilms(orderedFilms);
        };
        fetchData();
    }, [orderBy, characterId]);

    const handleOrderChange = (e) => {
        setOrderBy(e.target.value);
    };

    const handleCharacterIdChange = (e) => {
        setCharacterId(e.target.value);
    };

    return (
        <div className="align-items-center justify-content-center min-h-screen m-15">
            <nav className="p-4">
                <ul className="flex justify-center space-x-4">
                    <li style={{ marginRight: '10px' }}>
                        <Link href="/">
                            Personagens
                        </Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                        <Link href="/films">
                            <p className='text-blue-200 underline underline-offset-1'>Filmes</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/spaceships">
                            Naves
                        </Link>
                    </li>
                </ul>
            </nav>


            <div className='justify-self-center p-10'> 
                <h1 className='text-xl justify-self-center'>Filmes de Star Wars</h1>

                <select className="text-sm justify-self-center" value={orderBy} onChange={handleOrderChange}>
                    <option value="release">Ordem de Lançamento</option>
                    <option value="chronological">Ordem Cronológica</option>
                </select>
            </div>

            
            <div className="container mx-auto w-3/5">
                <div className='grid grid-cols-2 gap-4'>
                    {films.map(film => (
                        <FilmCard key={film.url} film={film} />
                    ))}
                </div>
            </div>
                
        </div>
    );
}

export async function getStaticProps() {
    const initialFilms = await fetchFilms();
    return {
        props: {
            initialFilms,
        },
    };
}