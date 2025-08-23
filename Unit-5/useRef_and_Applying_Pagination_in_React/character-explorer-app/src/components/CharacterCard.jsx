function CharacterCard({ character }) {
    return (
        <div className="card">
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
        </div>
    );
}

export default CharacterCard;