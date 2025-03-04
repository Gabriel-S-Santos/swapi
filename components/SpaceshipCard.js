import Link from 'next/link';

export default function SpaceshipCard({ spaceship }) {
  const shipId = spaceship.url.split('/').slice(-2, -1)[0];

  return (
    <div className="bg-gray-950 justify-items-center align-items-center p-8 rounded-[1vw] drop-shadow-2xl border-1 border-gray-800">
      <Link href={`/spaceships/${shipId}`}>
        <h3 className='text-blue-600'>{spaceship.name}</h3>
      </Link>
      <p>Modelo: {spaceship.model}</p>
      <p>Tripulação: {spaceship.crew}</p>
    </div>
  );
}