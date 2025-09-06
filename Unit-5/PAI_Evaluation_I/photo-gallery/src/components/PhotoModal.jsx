const PhotoModal = ({ photo, onClose }) => (
    <div className="modal-overlay" onClose={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={photo.url} alt={photo.title} />
            <h3>{photo.title}</h3>
            <p>Tags: {photo.tags.join(", ")}</p>
        </div>
    </div>
);
export default PhotoModal;