import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {

        // Original book
        List<String> reviews = new ArrayList<>();
        reviews.add("Excellent book");

        Book originalBook = new Book(
                "Clean Code",
                "Robert C. Martin",
                reviews
        );

        // Clone the book using Prototype Pattern
        Book clonedBook = originalBook.clone();

        // Modify clone only
        clonedBook.addReview("Must read for developers");

        // Display both books
        originalBook.display();
        clonedBook.display();

        // Proof that objects are different
        System.out.println(
                "Are both objects same reference? " +
                (originalBook == clonedBook)
        );
    }
}