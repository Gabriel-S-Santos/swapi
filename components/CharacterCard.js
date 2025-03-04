import Link from 'next/link';

export default function CharacterCard({ character }) {
    return (
        <div>
            <div className="bg-gray-950 justify-items-center align-items-center p-8 rounded-[1vw] drop-shadow-2xl border-1 border-gray-800">
                <Link href={`/${character.url.split('/').slice(-2, -1)[0]}`}>
                    
                        <h3 className='text-blue-600'>{character.name}</h3>
                
                </Link>
                <p>Altura: {character.height}cm</p>
                <p>Peso: {character.mass}kg</p>
            
            </div>
        </div>

        
    );
}