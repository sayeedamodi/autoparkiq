import Book from "../model/book.model.js";

export const getBookingsByEmail = async (req, res) => {
  const { email } = req.params;
  console.log("Received Email:", email);
  try {
    const bookings = await Book.find({ Email: email }); // Capital 'E' to match your DB
    console.log("Found bookings:", bookings);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};
