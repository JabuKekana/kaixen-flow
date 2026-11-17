import React, { useEffect, useState } from 'react';
import { bookingOptions, upcomingEvents, socialLinks } from '../data/siteContent';
import { FiArrowUpRight } from 'react-icons/fi';
import { submitBooking } from '../services/bookingService';

const initialState = {
  email: '',
  name: '',
  phoneNumber: '',
  selectedEvent: '',
  surname: '',
  ticketCount: '1',
  selectedPricing: 'full', // 'full' or 'dropin' for bootcamp
};

const eventOptionsByTitle = Object.fromEntries(upcomingEvents.map((event) => [event.title, event]));

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-ZA', {
    currency: 'ZAR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(amount);

export function BookPage({ search }) {
  const [formState, setFormState] = useState(initialState);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const email = params.get('email');
    const selectedEvent = params.get('event');

    setFormState((current) => ({
      ...current,
      email: email || current.email,
      selectedEvent:
        selectedEvent && eventOptionsByTitle[selectedEvent] ? selectedEvent : current.selectedEvent,
    }));
  }, [search]);

  const updateField = (field) => (event) => {
    setFormState((current) => ({ ...current, [field]: event.target.value }));
  };

  const selectedEvent = eventOptionsByTitle[formState.selectedEvent];
  const ticketCount = Number(formState.ticketCount) || 0;
  
  // Calculate price based on selected pricing option
  let pricePerTicket = selectedEvent?.priceAmount || 0;
  let pricingLabel = 'Full Series';
  
  if (selectedEvent?.hasDropIn && formState.selectedPricing === 'dropin') {
    pricePerTicket = selectedEvent.dropInPrice || 0;
    pricingLabel = 'Drop In';
  }
  
  const totalPrice = pricePerTicket * ticketCount;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!totalPrice || totalPrice <= 0) {
      setStatus({
        type: 'error',
        message: 'Please select a valid event and pricing option before proceeding.',
      });
      return;
    }

    setStatus({ type: 'idle', message: '' });
    setIsSubmitting(true);

    try {
      await submitBooking({
        ...formState,
        totalPrice,
        pricePerTicket,
        pricingOption: selectedEvent?.hasDropIn ? formState.selectedPricing : 'full',
        pricingLabel,
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'We could not submit the booking right now. Please try again.',
      });
      setIsSubmitting(false);
    }
  };

  // Check if selected event has drop-in option
  const showPricingOptions = selectedEvent?.hasDropIn;

  return (
    <section className="booking-shell">
      <div className="booking-intro">
        <p className="eyebrow">Book a Class</p>
        <h1>
          Join the <em>Flow.</em>
        </h1>
        <p>Secure your place in the next Pilates-inspired experience.</p>
      </div>

      {upcomingEvents.length === 0 ? <div className="booking-empty"><p className="script">let’s find your flow</p><h2>Something<br /><em>just for you.</em></h2><p>Our next event dates are taking shape. In the meantime, chat to us about a private session, a group gathering or your next wellness experience.</p><a className="button button--primary" href={socialLinks[2].href} target="_blank" rel="noreferrer">Enquire on WhatsApp <FiArrowUpRight /></a></div> : <form className="booking-form" onSubmit={handleSubmit}>
        <div className="booking-form__grid">
          <label>
            <span>Name</span>
            <input onChange={updateField('name')} required type="text" value={formState.name} />
          </label>
          <label>
            <span>Surname</span>
            <input onChange={updateField('surname')} required type="text" value={formState.surname} />
          </label>
          <label>
            <span>Email</span>
            <input onChange={updateField('email')} required type="email" value={formState.email} />
          </label>
          <label>
            <span>Phone Number</span>
            <input onChange={updateField('phoneNumber')} required type="tel" value={formState.phoneNumber} />
          </label>
          <label className="booking-form__full">
            <span>Select Event</span>
            <select onChange={updateField('selectedEvent')} required value={formState.selectedEvent}>
              <option value="">Choose an experience...</option>
              {bookingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          {/* Pricing Options - Only shown for events with drop-in */}
          {showPricingOptions && (
            <div className="booking-form__full booking-form__pricing">
              <span className="booking-form__pricing-label">Choose Your Package</span>
              <div className="pricing-toggle">
                <button
                  type="button"
                  className={`pricing-toggle__option ${formState.selectedPricing === 'full' ? 'pricing-toggle__option--active' : ''}`}
                  onClick={() => setFormState(prev => ({ ...prev, selectedPricing: 'full' }))}
                >
                  <span className="pricing-toggle__option-title">Full Series</span>
                  <span className="pricing-toggle__option-price">{formatCurrency(selectedEvent.priceAmount)}</span>
                  <span className="pricing-toggle__option-desc">All 4 weeks</span>
                </button>
                <button
                  type="button"
                  className={`pricing-toggle__option ${formState.selectedPricing === 'dropin' ? 'pricing-toggle__option--active' : ''}`}
                  onClick={() => setFormState(prev => ({ ...prev, selectedPricing: 'dropin' }))}
                >
                  <span className="pricing-toggle__option-title">Drop In</span>
                  <span className="pricing-toggle__option-price">{formatCurrency(selectedEvent.dropInPrice)}</span>
                  <span className="pricing-toggle__option-desc">Single session</span>
                </button>
              </div>
            </div>
          )}

          <label className="booking-form__full">
            <span>Number of Tickets</span>
            <input
              max="10"
              min="1"
              onChange={updateField('ticketCount')}
              required
              type="number"
              value={formState.ticketCount}
            />
          </label>
          
          <div className="booking-form__full booking-form__total">
            <div className="booking-form__total-row">
              <span>Total Price</span>
              <span className="booking-form__total-amount">
                {totalPrice ? formatCurrency(totalPrice) : 'Select an event'}
              </span>
            </div>
            {showPricingOptions && selectedEvent && (
              <div className="booking-form__total-row booking-form__total-breakdown">
                <span>
                  {formState.selectedPricing === 'full' ? 'Full Series' : 'Drop In'} × {ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'}
                </span>
                <span>{formatCurrency(pricePerTicket)} each</span>
              </div>
            )}
          </div>
        </div>

        <button className="button button--primary button--block" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Redirecting to Payment...' : 'Continue to Payment'}
        </button>
        <p className="booking-payment-note">Secure online payments powered by Yoco.</p>
        <p className="booking-payment-note">You will be redirected to Yoco to complete payment.</p>

        {status.message ? (
          <p className={`booking-status booking-status--${status.type}`}>{status.message}</p>
        ) : null}
      </form>}
    </section>
  );
}
