import { fetchFilm } from '../../lib/swapi';

export default function FilmDetails({ film }) {
  if (!film) {
    return <div>Loading...</div>;
  }

  function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className="justify-items-center ">

      <h1 className="text-3xl mt-10 mb-5'">{film.title}</h1>
      <div className="grid items-start grid-cols-2 gap-4 w-5/6 pt-10">

        <div >

          <p>Número do Episódio: {film.episode_id}</p>
          <p className="pt-5">Diretor: {film.director}</p>
          <p className="pt-5">Produtor: {film.producer}</p>
          <p className="pt-5">Data de Lançamento: {formatarData(film.release_date)}</p>
        
        </div>
        
        <div>
          <p className="text-lg">Frase de Abertura:</p>
          <p className="text-yellow-400">{film.opening_crawl}</p>
        </div>
      </div>

    </div>
  );
}

export async function getServerSideProps({ params }) {
  const film = await fetchFilm(params.id);
  return {
    props: {
      film,
    },
  };
}