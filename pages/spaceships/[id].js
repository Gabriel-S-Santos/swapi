import { fetchSpaceship } from '../../lib/swapi';

export default function SpaceshipDetails({ spaceship }) {
  if (!spaceship) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-items-center">
      <h1 className='text-3xl mt-10 mb-5'>{spaceship.name}</h1>
      <p>Modelo: {spaceship.model}</p>
      <p className="pt-5">Fabricante: {spaceship.manufacturer}</p>
      <p className="pt-5">Comprimento: {spaceship.length}</p>
      <p className="pt-5">Tripulação: {spaceship.crew}</p>
      <p className="pt-5">Passageiros: {spaceship.passengers}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const spaceship = await fetchSpaceship(params.id);
  return {
    props: {
      spaceship,
    },
  };
}