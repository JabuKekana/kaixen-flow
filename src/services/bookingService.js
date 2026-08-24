const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyE46xlAvQgmKLUMrIh5coFWzVAjM7HsKktNjuoCjam4EWzdxq6Ss0wUDvQbMrxJxwmMQ/exec';

const YOCO_CHECKOUT_API = 'https://kaixenflow-backend.vercel.app/api/checkout';

export async function submitBooking(values) {
  console.log('=== [FRONTEND START] submitBooking ===');
  console.log('Form values passed to service:', values);

  // Generate booking reference
  const bookingRef = 'KX-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
  
  // Store booking data in localStorage before redirect
  const bookingData = {
    name: values.name,
    surname: values.surname,
    email: values.email,
    phoneNumber: values.phoneNumber,
    selectedEvent: values.selectedEvent,
    ticketCount: values.ticketCount,
    totalPrice: values.totalPrice,
    pricePerTicket: values.pricePerTicket,
    pricingLabel: values.pricingLabel || 'Full Series',
    bookingRef: bookingRef,
    timestamp: Date.now(),
  };
  
  localStorage.setItem('pendingBooking', JSON.stringify(bookingData));

  // 1. Submit form data to Google Sheets
  const formData = new FormData();
  formData.append('Name', values.name);
  formData.append('Surname', values.surname);
  formData.append('Email', values.email);
  formData.append('Phone Number', values.phoneNumber);
  formData.append('Selected Event', values.selectedEvent);
  formData.append('Number of Tickets', values.ticketCount);
  formData.append('Booking Reference', bookingRef);
  formData.append('Pricing Option', values.pricingLabel || 'Full Series');

  console.log('Submitting to Google Sheets...');
  await fetch(SCRIPT_URL, {
    method: 'POST',
    body: formData,
    mode: 'no-cors',
  });
  console.log('Google Sheets submission finished.');

  // 2. Request Yoco checkout link from Vercel backend
  console.log('Posting request to Vercel API:', YOCO_CHECKOUT_API);
  console.log('Payload body:', JSON.stringify({
    ...values,
    bookingRef,
  }));

  const response = await fetch(YOCO_CHECKOUT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...values,
      bookingRef,
    }),
  });

  console.log('Vercel HTTP Status:', response.status, response.statusText);

  const responseText = await response.text();
  console.log('Vercel Raw Response Output:', responseText);

  let data;
  try {
    data = JSON.parse(responseText);
    console.log('Parsed JSON from Vercel:', data);
  } catch (err) {
    console.error('❌ Response could not be parsed as JSON. Content received:', responseText);
    throw new Error(`Server returned non-JSON error (${response.status}): ${responseText}`);
  }

  if (data.redirectUrl) {
    console.log('✅ Redirect URL received:', data.redirectUrl);
    window.location.href = data.redirectUrl;
  } else {
    console.error('❌ Backend returned error:', data);
    throw new Error(JSON.stringify(data.error) || 'Failed to generate checkout link');
  }
}