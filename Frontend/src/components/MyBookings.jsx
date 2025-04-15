import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, AlertCircle, Car, CalendarCheck, MapPin, DollarSign } from "lucide-react";
import Navbar from "./Navbar"; // ✅ ensure this path is correct
import { useNavigate } from "react-router-dom";
import './MyBookings.css'; // Import custom CSS for styling

const MyBookings = ({ userEmail }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/book/myBookings/${userEmail}`);
        setBookings(res.data);
      } catch (err) {
        setError("Unable to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) fetchBookings();
  }, [userEmail]);

  return (
    <>
      <Navbar />
      <div className="my-bookings-container">
        <h1 className="title">My Bookings</h1>

        {loading ? (
          <div className="loader-container">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : error ? (
          <div className="error-message">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        ) : bookings.length === 0 ? (
          <p className="no-bookings-message">No bookings found for {userEmail}</p>
        ) : (
          <div className="booking-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="card-content">
                  <div className="card-item">
                    <Car size={20} />
                    <span><strong>Car:</strong> {booking.carnumber}</span>
                  </div>
                  <div className="card-item">
                    <CalendarCheck className="text-green" size={20} />
                    <span><strong>Entry:</strong> {booking.entrydate} at {booking.entrytime}</span>
                  </div>
                  <div className="card-item">
                    <CalendarCheck className="text-red" size={20} />
                    <span><strong>Exit:</strong> {booking.exitdate}</span>
                  </div>
                  <div className="card-item">
                    <MapPin className="text-purple" size={20} />
                    <span><strong>Area:</strong> {booking.area}</span>
                  </div>
                  <div className="card-item">
                    <span><strong>Slot:</strong> {booking.slot}</span>
                  </div>
                  <div className="card-item">
                    <DollarSign className="text-yellow" size={20} />
                    <span><strong>Amount:</strong> ₹{booking.amount}</span>
                  </div>
                  <div className="booking-code">
                    <strong>Booking Code:</strong> {booking.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;


