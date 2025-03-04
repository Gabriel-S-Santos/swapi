import Link from 'next/link';
import { fetchPeople, fetchFilteredPeople } from '../lib/swapi';
import CharacterCard from '../components/CharacterCard';
import { useState, useEffect } from 'react';

export default function Home({ initialPeople }) {
    const [people, setPeople] = useState(initialPeople);
    const [genderFilter, setGenderFilter] = useState('');

    useEffect(() => {
        if (genderFilter) {
            fetchFilteredPeople(genderFilter).then(filteredPeople => setPeople({ results: filteredPeople }));
        } else {
            setPeople(initialPeople);
        }
    }, [genderFilter, initialPeople]);

    const handleGenderChange = (e) => {
        setGenderFilter(e.target.value);
    };

    return (
        <div className="align-items-center justify-content-center min-h-screen m-15">

            <nav className="p-4">
                <ul className="flex justify-center space-x-4">
                    <li>
                        <Link href="/">
                            <p className='text-blue-200 underline underline-offset-1'>Personagens</p>
                        </Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                        <Link href="/films">
                            Filmes
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
                <h1 className='text-xl justify-self-center'>Personagens de Star Wars</h1>

                <select className="text-sm justify-self-center" value={genderFilter} onChange={handleGenderChange}>
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="n/a">N/A</option>
                </select>
            </div>

            <div className="container mx-auto w-3/5">
                <div className='grid grid-cols-3 gap-4 '>
                    {people.results.slice(0, 10).map(character => (
                        <CharacterCard key={character.url} character={character} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const initialPeople = await fetchPeople();
    return {
        props: {
            initialPeople,
        },
    };
}