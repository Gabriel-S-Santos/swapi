import axios from 'axios';

const url = 'https://swapi.dev/api/';

export async function fetchPeople(page = 1) {
    const response = await axios.get(`${url}people/?page=${page}`);
    return response.data;
}

export async function fetchPerson(id) {
    const response = await axios.get(`${url}people/${id}/`);
    return response.data;
}

export async function fetchFilms(page = 1) {
    const response = await axios.get(`${url}films/?page=${page}`);
    return response.data;
}

export async function fetchFilm(id) {
    const response = await axios.get(`${url}films/${id}/`);
    return response.data;
}

export async function fetchSpaceships(page = 1) {
    const response = await axios.get(`${url}starships/?page=${page}`);
    return response.data;
}

export async function fetchSpaceship(id) {
    const response = await axios.get(`${url}starships/${id}/`);
    return response.data;
}

export async function fetchFilteredPeople(gender) {
    const response = await axios.get(`${url}people/`);
    const filteredPeople = response.data.results.filter(person => person.gender === gender);
    return filteredPeople;
}

export async function fetchFilmSequence(type, characterId) {
    const filmsResponse = await fetchFilms();
    const films = filmsResponse.results;

    if (type === 'chronological') {
        return films.sort((a, b) => a.episode_id - b.episode_id);
    } else if (type === 'release') {
        const chronologicalOrder = [4, 5, 6, 1, 2, 3, 7, 8, 9];
        return chronologicalOrder.map(id => films.find(film => film.episode_id === id)).filter(Boolean);
    }
    return films;
}