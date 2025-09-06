const PhotoCard = ({ photo, onClick }) => (
    <div className="photo-card" onClick={onClick}>
        <img src={photo.url} alt={photo.title} />
        <div className="photo-title">{photo.title}</div>
    </div>
);

export default PhotoCard;