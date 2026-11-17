import React, { useEffect, useState } from 'react';
import { AppLink } from '../components/AppLink';
import { events } from '../data/siteContent';
import { FiCheckCircle, FiCalendar, FiMapPin, FiClock, FiMail } from 'react-icons/fi';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-ZA', {
    currency: 'ZAR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(amount);

export function ConfirmationPage({ currentPath, navigate, search }) {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(search);
    
    // Read booking data from URL parameters
    const eventTitle = params.get('event');
    const name = params.get('name');
    const surname = params.get('surname');
    const email = params.get('email');
    const tickets = params.get('tickets');
    const total = params.get('total');
    const bookingRef = params.get('ref') || 'KX-' + Date.now().toString(36).toUpperCase();

    if (eventTitle) {
      const event = events.find(e => e.title === eventTitle);
      setBookingData({
        event,
        name: name || 'Guest',
        surname: surname || '',
        email: email || 'guest@email.com',
        tickets: parseInt(tickets) || 1,
        total: parseInt(total) || 0,
        bookingRef: bookingRef,
        fullName: `${name || 'Guest'} ${surname || ''}`.trim(),
      });
    }
    setLoading(false);
  }, [search]);

  if (loading) {
    return (
      <section className="page-hero page-hero--centered">
        <div className="loader">Loading your booking...</div>
      </section>
    );
  }

  if (!bookingData || !bookingData.event) {
    return (
      <section className="page-hero page-hero--centered">
        <h1>Something went wrong</h1>
        <p>We couldn't find your booking details. Please contact us.</p>
        <AppLink className="button button--primary" currentPath={currentPath} href="/events" navigate={navigate}>
          Back to Events
        </AppLink>
      </section>
    );
  }

  const { event, fullName, tickets, total, bookingRef, email } = bookingData;

  return (
    <section className="confirmation-page">
      <div className="confirmation-success">
        <div className="confirmation-checkmark">
          <FiCheckCircle />
        </div>
        <p className="eyebrow">Booking Confirmed</p>
        <h1>
          You're in, <em>{fullName}!</em>
        </h1>
        <p className="confirmation-subtitle">
          Your spot at <strong>{event.title}</strong> is secured. We can't wait to move with you.
        </p>
      </div>

      <div className="confirmation-details">
        <div className="confirmation-details__header">
          <h2>Booking Summary</h2>
          <span className="confirmation-ref">Ref: {bookingRef}</span>
        </div>

        <div className="confirmation-details__grid">
          <div className="confirmation-detail">
            <FiCalendar />
            <div>
              <span>Event</span>
              <strong>{event.title}</strong>
            </div>
          </div>
          <div className="confirmation-detail">
            <FiCalendar />
            <div>
              <span>Date</span>
              <strong>{event.date}</strong>
            </div>
          </div>
          <div className="confirmation-detail">
            <FiClock />
            <div>
              <span>Time</span>
              <strong>{event.time}</strong>
            </div>
          </div>
          <div className="confirmation-detail">
            <FiMapPin />
            <div>
              <span>Venue</span>
              <strong>{event.venue}</strong>
            </div>
          </div>
          <div className="confirmation-detail">
            <FiMail />
            <div>
              <span>Confirmation Sent To</span>
              <strong>{email}</strong>
            </div>
          </div>
        </div>

        <div className="confirmation-tickets">
          <div className="confirmation-tickets__row">
            <span>Tickets</span>
            <strong>{tickets} × {event.title}</strong>
          </div>
          <div className="confirmation-tickets__row">
            <span>Total Paid</span>
            <strong className="confirmation-tickets__total">{formatCurrency(total)}</strong>
          </div>
          {event.hasDropIn && (
            <div className="confirmation-tickets__note">
              You chose the Drop In option for this event.
            </div>
          )}
        </div>
      </div>

      <div className="confirmation-actions">
        <AppLink 
          className="button button--primary" 
          currentPath={currentPath} 
          href="/events" 
          navigate={navigate}
        >
          View More Events
        </AppLink>
        <button 
          className="button button--secondary"
          onClick={() => window.print()}
        >
          Print This Page
        </button>
      </div>

      <div className="confirmation-continue">
        <h3>💫 Keep the Flow Going</h3>
        <p>Follow us on social media for updates and future events.</p>
        <div className="confirmation-social">
          <a href="https://www.instagram.com/kaixenflow/" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@kaixenflow_" target="_blank" rel="noreferrer">
            TikTok
          </a>
        </div>
      </div>

      <style jsx>{`
        .confirmation-page {
          max-width: 680px;
          margin: 0 auto;
          padding: 2rem 0 5rem;
        }

        .confirmation-success {
          text-align: center;
          margin-bottom: 3rem;
        }

        .confirmation-checkmark {
          width: 5rem;
          height: 5rem;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #4caf50, #66bb6a);
          display: grid;
          place-items: center;
          color: white;
          font-size: 2.5rem;
          animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .confirmation-success h1 {
          font-size: 3rem;
          margin: 0.5rem 0;
        }

        .confirmation-success h1 em {
          color: var(--color-accent);
          font-style: italic;
        }

        .confirmation-subtitle {
          font-size: 1.1rem;
          color: var(--color-muted);
        }

        .confirmation-details {
          background: rgba(255, 251, 247, 0.92);
          backdrop-filter: blur(12px);
          border-radius: 2rem;
          padding: 2rem;
          box-shadow: 0 20px 50px rgba(117, 92, 73, 0.08);
          margin-bottom: 2rem;
        }

        .confirmation-details__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(87, 72, 60, 0.08);
        }

        .confirmation-details__header h2 {
          margin: 0;
          font-family: var(--font-serif);
          font-size: 1.5rem;
        }

        .confirmation-ref {
          font-size: 0.8rem;
          color: var(--color-muted);
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .confirmation-details__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .confirmation-detail {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 0.75rem;
          background: rgba(255, 248, 242, 0.5);
        }

        .confirmation-detail svg {
          color: var(--color-accent);
          font-size: 1.3rem;
          flex-shrink: 0;
        }

        .confirmation-detail span {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-soft);
        }

        .confirmation-detail strong {
          display: block;
          font-size: 0.95rem;
        }

        .confirmation-tickets {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(87, 72, 60, 0.08);
        }

        .confirmation-tickets__row {
          display: flex;
          justify-content: space-between;
          padding: 0.3rem 0;
        }

        .confirmation-tickets__row span {
          color: var(--color-muted);
        }

        .confirmation-tickets__total {
          color: var(--color-accent);
          font-size: 1.2rem;
        }

        .confirmation-tickets__note {
          margin-top: 0.5rem;
          font-size: 0.85rem;
          color: var(--color-soft);
          background: rgba(201, 168, 160, 0.08);
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
        }

        .confirmation-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .confirmation-actions .button {
          min-width: 200px;
          justify-content: center;
        }

        .confirmation-continue {
          text-align: center;
          padding: 2rem;
          border-radius: 2rem;
          background: linear-gradient(135deg, rgba(210, 118, 62, 0.08), rgba(162, 114, 242, 0.08));
        }

        .confirmation-continue h3 {
          font-family: var(--font-serif);
          color: var(--color-accent);
          margin-bottom: 0.5rem;
        }

        .confirmation-social {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 1rem;
        }

        .confirmation-social a {
          color: var(--color-muted);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .confirmation-social a:hover {
          color: var(--color-accent);
        }

        .loader {
          text-align: center;
          padding: 3rem;
          color: var(--color-muted);
          font-size: 1.1rem;
        }

        @media print {
          .site-header,
          .site-footer,
          .confirmation-actions,
          .confirmation-continue {
            display: none !important;
          }
          
          .confirmation-page {
            padding: 0 !important;
          }
          
          .confirmation-details {
            box-shadow: none !important;
            border: 1px solid #ddd !important;
          }
        }

        @media (max-width: 700px) {
          .confirmation-details__grid {
            grid-template-columns: 1fr;
          }

          .confirmation-success h1 {
            font-size: 2.2rem;
          }

          .confirmation-actions {
            flex-direction: column;
          }

          .confirmation-actions .button {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </section>
  );
}
