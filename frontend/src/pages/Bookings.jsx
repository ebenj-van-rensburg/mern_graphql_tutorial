import React, { useState, useEffect, useContext } from 'react';
import Spinner from '../components/Spinner/Spinner';
import { AuthContext } from '../context/auth-context';
import BookingList from '../components/Bookings/BookingList/BookingList';

const BookingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [outputType, setOutputType] = useState('list');
  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
          query {
            bookings {
              _id
             createdAt
             event {
               _id
               title
               date
               price
             }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authContext.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const fetchedBookings = resData.data.bookings;
        setBookings(fetchedBookings);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const deleteBookingHandler = bookingId => {
    setIsLoading(true);
    const requestBody = {
      query: `
          mutation CancelBooking($id: ID!) {
            cancelBooking(bookingId: $id) {
            _id
             title
            }
          }
        `,
      variables: {
        id: bookingId
      }
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authContext.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        setBookings(prevBookings =>
          prevBookings.filter(booking => booking._id !== bookingId)
        );
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const changeOutputTypeHandler = outputType => {
    setOutputType(outputType);
  };

  let content = <Spinner />;
  if (!isLoading) {
    content = (
      <>
      <div className="events-control">Your Bookings</div>
        <BookingList
          bookings={bookings}
          onDelete={deleteBookingHandler}
        />
      </>
    );
  }
  return <>{content}</>;
};

export default BookingsPage;