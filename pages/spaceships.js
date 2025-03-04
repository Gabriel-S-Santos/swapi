import { fetchSpaceships } from '../lib/swapi';
import Link from 'next/link';
import SpaceshipCard from '../components/SpaceshipCard';
import { useState, useEffect } from 'react';

export default function Spaceships({ initialSpaceships }) {
    const [spaceships, setSpaceships] = useState(initialSpaceships);
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        const sortedSpaceships = { ...initialSpaceships };
        sortedSpaceships.results.sort((a, b) => {
            if (sortBy === 'length' || sortBy === 'crew' || sortBy === 'passengers') {
                const valueA = parseInt(a[sortBy].replace(',', '')) || 0;
                const valueB = parseInt(b[sortBy].replace(',', '')) || 0;
                return valueA - valueB;
            }
            return a.name.localeCompare(b.name);
        });
        setSpaceships(sortedSpaceships);
    }, [sortBy, initialSpaceships]);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="align-items-center justify-content-center min-h-screen m-15">

            <nav className='p-4'>
                <ul className='flex justify-center space-x-4'>
                    <li style={{ marginRight: '10px' }}>
                        <Link href="/">
                            Personagens
                        </Link>
                    </li>
                    <li style={{ marginRight: '10px' }}>
                        <Link href="/films">
                            Filmes
                        </Link>
                    </li>
                    <li>
                        <Link href="/spaceships">
                            <p className='text-blue-200 underline underline-offset-1'>Naves</p>
                        </Link>
                    </li>
                </ul>
            </nav>
            
            <div className="justify-self-center p-10">

                <h1 className='text-xl justify-self-center'>Naves de Star Wars</h1>
                
                <select className="text-sm justify-self-center" value={sortBy} onChange={handleSortChange}>
                    <option value="name">Name</option>
                    <option value="length">Length</option>
                    <option value="crew">Crew</option>
                    <option value="passengers">Passengers</option>
                </select>
            </div>

            <div className="container mx-auto w-3/5">
                <div className='grid grid-cols-2 gap-4'>
                    {spaceships.results.map(spaceship => (
                        <SpaceshipCard key={spaceship.url} spaceship={spaceship} />
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export async function getStaticProps() {
    const initialSpaceships = await fetchSpaceships();
    return {
        props: {
            initialSpaceships,
        },
    };
}