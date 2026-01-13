import java.util.ArrayList;
import java.util.List;

public class Book {

    private String title;
    private String author;
    private List<String> reviews;

    // Constructor
    public Book(String title, String author, List<String> reviews) {
        this.title = title;
        this.author = author;
        this.reviews = reviews;
    }

    // Prototype clone method (DEEP COPY)
    @Override
    public Book clone() {
        // Create deep copy of mutable list
        List<String> reviewsCopy = new ArrayList<>(this.reviews);

        return new Book(this.title, this.author, reviewsCopy);
    }

    // Helper method to add review
    public void addReview(String review) {
        reviews.add(review);
    }

    // Display book details
    public void display() {
        System.out.println("Book Details");
        System.out.println("Title   : " + title);
        System.out.println("Author  : " + author);
        System.out.println("Reviews : " + reviews);
        System.out.println("----------------------");
    }
}