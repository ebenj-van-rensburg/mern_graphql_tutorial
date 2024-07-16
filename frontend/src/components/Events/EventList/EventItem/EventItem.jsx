import React from 'react';
import './EventItem.css';

const EventItem = ({ eventId, title, price, date, userId, creatorId, onDetail }) => (
  <li className="events__list-item">
    <div>
      <h1>{title}</h1>
      <h2>
        ${price} - {new Date(date).toLocaleDateString()}
      </h2>
    </div>
    <div>
      {userId === creatorId ? (
        <p>You are the owner of this event.</p>
      ) : (
        <button className="btn" onClick={() => onDetail(eventId)}>
          View Details
        </button>
      )}
    </div>
  </li>
);

export default EventItem;