const mongoose = require("mongoose");
const Movie = require("./Movie");

const reviewSchema = new mongooose.Schema({
    user: { type: mongooose.Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: mongooose.Schema.Types.ObjectId, ref: "Movie", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
}, { timestamps: true });

async function updateAverageRating(movieId) {
    const agg = await Review.aggregate([
        { $match: { movie: movieId } },
        { $group: { _id: "$movie", avgRating: { $avg: "$rating" } } }
    ]);
    await Movie.findByIdAndUpdate(movieId, { averageRating: agg[0] ? agg[0].avgRating : 0 });
}

reviewSchema.post("save", async function () {
    await updateAverageRating(this.movie);
});

reviewSchema.post("findOneAndUpdate", async function (doc) {
    if (doc) await updateAverageRating(doc.movie);
});

reviewSchema.post("findOneAndDelete", async function (doc) {
    if (doc) await updateAverageRating(doc.movie);
});

const Review = mongoose/model("Review", reviewSchema);
module.exports = Review;