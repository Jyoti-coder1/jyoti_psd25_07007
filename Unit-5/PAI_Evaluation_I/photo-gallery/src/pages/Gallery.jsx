import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import PhotoCard from "../components/PhotoCard";
import PhotoModal from "../components/PhotoModal";

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState(localStorage.getItem("search") || "");
    const [sort, setSort] = useState(localStorage.getItem("sort") || "asc");
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        const photoRef = ref(db, "photos");
        const unsubscribe = onValue(photoRef, snapshot => {
            const data = snapshot.val() ? Object.values(snapshot.val()) : [];
            setPhotos(data);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        localStorage.setItem("search", search);
        localStorage.setItem("sort", sort);
    }, [search, sort]);
    const filteredPhotos = photos.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    )
    .sort ((a, b) => sort === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

    return (
        <div className="gallery-page">
            <div className="controls">
                <input type="text" placeholder="Search.." value={search} onChange={e => setSearch(e.target.value)} />
                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="asc">Title Asc</option>
                    <option value="desc">Title Desc</option>
                </select>
            </div>

            <div className="gallery-grid">
                {filteredPhotos.map(photo => (
                    <PhotoCard key={photo.id} photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
                ))}
            </div>

            {selectedPhoto && <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
        </div> 
    );
};
export default Gallery;