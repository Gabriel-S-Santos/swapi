import { fetchPerson, fetchFilm } from '../lib/swapi';
import { useState, useEffect } from 'react';

export default function Person({ person }) {

    const [filmTitles, setFilmTitles] = useState([]);

    useEffect(() => {
        async function fetchFilmTitles() {
        if (person && person.films) {
            const titles = await Promise.all(
            person.films.map(async (filmUrl) => {
                const filmId = filmUrl.split('/').slice(-2, -1)[0];
                const film = await fetchFilm(filmId);
                return film.title;
            })
            );
            setFilmTitles(titles);
        }
        }
        fetchFilmTitles();
    }, [person]);

    if (!person) return <div>Loading...</div>;

    return (
        <div className="justify-items-center ">
            <h1 className='text-3xl mt-10 mb-5'>{person.name}</h1>
            <div className="grid grid-cols-2 gap-4">

                <div className="p-10 justify-items-center">
                
                    <div>
                        <h2 className="text-2xl mb-5">Informações Básicas:</h2>
                        <p>Data de Nascimento: {person.birth_year}</p>
                        <p>Altura: {person.height} centímetros</p>
                        <p>Peso: {person.mass}kg</p>
                        <p>Genero: {person.gender}</p>
                        <p>Cor do Cabelo: {person.hair_color}</p>
                        <p>Cor dos Olhos: {person.eye_color}</p>
                    </div>
                </div>

                <div className="p-10 justify-items-center">
                    <h2 className="text-2xl mb-5">Filmes:</h2>
                    <ul>
                        {filmTitles.map((title, index) => (
                        <li key={index}>{title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    const person = await fetchPerson(params.id);
    return {
        props: {
            person,
        },
    };
}