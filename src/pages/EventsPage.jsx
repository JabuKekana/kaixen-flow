import React, { useEffect } from 'react';
import { AppLink } from '../components/AppLink';
import { pastEvents, upcomingEvents } from '../data/siteContent';

function EventCard({ currentPath, event, isPast = false, navigate }) {
  return (
    <article className={`event-card${isPast ? ' event-card--past' : ''}`}>
      <div className="event-card__media">
        <img alt={event.title} src={event.image} />
        <div className="event-card__badge">{event.date}</div>
      </div>
      <div className="event-card__body">
        <h3>{event.title}</h3>
        {event.description && <p className="event-card__description">{event.description}</p>}
        <ul>
          <li>{event.time}</li>
          <li>{event.venue}</li>
          <li>{event.price}</li>
          {event.hasDropIn && (
            <li className="event-card__drop-in">Drop-in: R{event.dropInPrice}</li>
          )}
        </ul>
        {isPast ? (
          <span className="event-card__status">Event Passed</span>
        ) : (
          <AppLink
            className="button button--primary button--small"
            currentPath={currentPath}
            href={`/book?event=${encodeURIComponent(event.title)}`}
            navigate={navigate}
          >
            Book Now
          </AppLink>
        )}
      </div>
    </article>
  );
}

function PastEvents({ currentPath, navigate }) {
  if (!pastEvents.length) {
    return null;
  }

  return (
    <section className="past-events">
      <details className="past-events__details">
        <summary className="past-events__summary">
          <span>
            <span className="eyebrow">Passed Events</span>
          </span>
          <span className="past-events__count">{pastEvents.length}</span>
        </summary>
        <div className="past-events__content">
          <div className="event-grid event-grid--past">
            {pastEvents.map((event) => (
              <EventCard
                currentPath={currentPath}
                event={event}
                isPast
                key={event.title}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </details>
    </section>
  );
}

export function EventsPage({ currentPath, navigate, search }) {
  // Check if this is a redirect from Yoco payment
  useEffect(() => {
    const params = new URLSearchParams(search);
    const sessionId = params.get('session_id');
    const paymentStatus = params.get('payment_status');
    
    // If we have session_id or payment_status, this might be a Yoco redirect
    if (sessionId || paymentStatus) {
      // Try to find booking data from localStorage
      const storedBooking = localStorage.getItem('pendingBooking');
      if (storedBooking) {
        try {
          const bookingData = JSON.parse(storedBooking);
          // Clear it so we don't keep redirecting
          localStorage.removeItem('pendingBooking');
          
          // Redirect to confirmation page with the booking data
          const confirmUrl = `/confirmation?event=${encodeURIComponent(bookingData.selectedEvent)}&name=${encodeURIComponent(bookingData.name)}&surname=${encodeURIComponent(bookingData.surname)}&email=${encodeURIComponent(bookingData.email)}&tickets=${bookingData.ticketCount}&total=${bookingData.totalPrice}&ref=${bookingData.bookingRef || 'KX-' + Date.now().toString(36).toUpperCase()}&pricing=${encodeURIComponent(bookingData.pricingLabel || 'Full Series')}`;
          
          navigate(confirmUrl);
        } catch (e) {
          console.error('Failed to parse stored booking:', e);
        }
      }
    }
  }, [search, navigate]);

  return (
    <>
      <section className="page-hero">
        <div>
          <p className="eyebrow">Upcoming</p>
          <h1>
            <em>Curated</em> experiences.
          </h1>
        </div>
      </section>

      <section className="event-grid">
        {upcomingEvents.map((event) => (
          <EventCard currentPath={currentPath} event={event} key={event.title} navigate={navigate} />
        ))}
      </section>

      <PastEvents currentPath={currentPath} navigate={navigate} />
    </>
  );
}