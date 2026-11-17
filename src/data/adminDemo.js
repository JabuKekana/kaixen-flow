export const adminStorageKey = "kaixenflow-admin-demo-v1";
export const money = (amount) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);
export const dateLabel = (value) =>
  new Date(`${value}T12:00:00+02:00`).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Johannesburg",
  });

export function createDemo() {
  const events = [
    {
      id: "ev-1",
      title: "Summer in Flow",
      date: "2026-11-28",
      time: "09:00",
      venue: "Truffles on the Park, Sandton",
      price: 550,
      capacity: 40,
      status: "Published",
      description:
        "A morning of Pilates, a seasonal brunch and good company. Bring your mat and a little sunshine.",
    },
    {
      id: "ev-2",
      title: "The Sunday Reset",
      date: "2026-12-06",
      time: "08:30",
      venue: "Mushroom Farm Park, Sandton",
      price: 250,
      capacity: 30,
      status: "Published",
      description:
        "An outdoor flow with breathwork and mindful movement to reset for the week ahead.",
    },
    {
      id: "ev-3",
      title: "A Very Kaixen Christmas",
      date: "2026-12-19",
      time: "09:00",
      venue: "The Artistry, Sandton",
      price: 695,
      capacity: 45,
      status: "Draft",
      description:
        "Our end-of-year gathering. Movement, a beautiful table and a celebration of our community.",
    },
  ];
  const names = [
    "Naledi Mokoena",
    "Thandiwe Nkosi",
    "Lerato Molefe",
    "Ayesha Patel",
    "Zanele Dlamini",
    "Chantelle Jacobs",
    "Boitumelo Seboko",
    "Priya Naidoo",
    "Nomsa Khumalo",
    "Megan van der Merwe",
    "Refilwe Modise",
    "Sibongile Ndlovu",
    "Fatima Ismail",
    "Palesa Masemola",
    "Kgomotso Radebe",
    "Nandi Mthembu",
    "Sarah Williams",
    "Lindiwe Mahlangu",
  ];
  const bookings = names.map((name, i) => ({
    id: `KF-${String(26041 + i)}`,
    name,
    email: `${name.toLowerCase().replaceAll(" ", ".")}@example.com`,
    eventId: i % 3 === 0 ? "ev-2" : "ev-1",
    tickets: i % 5 === 0 ? 2 : 1,
    pricePerTicket: i % 3 === 0 ? 250 : 550,
    payment: i === 4 || i === 12 ? "Pending" : "Paid",
    status: i === 9 ? "Cancelled" : "Confirmed",
    checkedIn: false,
    created: `2026-11-${String(17 - Math.floor(i / 3)).padStart(2, "0")}`,
    notes:
      i === 0
        ? "Attending with a friend. Vegetarian brunch requested."
        : i === 3
          ? "First KaixenFlow session."
          : "",
    source: i % 4 === 0 ? "Admin" : "Online",
  }));
  return { events, bookings };
}

export function readDemo() {
  try {
    const saved = JSON.parse(localStorage.getItem(adminStorageKey));
    if (saved && Array.isArray(saved.events) && Array.isArray(saved.bookings))
      return saved;
  } catch {
    /* A fresh demo is safe when browser storage is unavailable. */
  }
  return createDemo();
}
