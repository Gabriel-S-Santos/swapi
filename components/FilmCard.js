import Link from 'next/link';

export default function FilmCard({ film }) {
  const filmId = film.url.split('/').slice(-2, -1)[0];

  function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className="bg-gray-950 justify-items-center align-items-center p-8 rounded-[1vw] drop-shadow-2xl border-1 border-gray-800">
      <Link href={`/films/${filmId}`}>
        
          <h3 className='text-blue-600'>{film.title}</h3>
        
      </Link>
      <p>Episódio: {film.episode_id}</p>
      <p>Data de lançamento: {formatarData(film.release_date)}</p>
    </div>
  );
}