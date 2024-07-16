import React from 'react';
import EventItem from './EventItem/EventItem.jsx';
import './EventList.css';

const EventList = ({ events, authUserId, onViewDetail }) => (
  <ul className="event__list">
    {events.map(event => (
      <EventItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        price={event.price}
        date={event.date}
        userId={authUserId}
        creatorId={event.creator._id}
        onDetail={onViewDetail}
      />
    ))}
  </ul>
);

export default EventList;
