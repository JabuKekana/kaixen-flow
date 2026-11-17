import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiPlus,
  FiSearch,
  FiDownload,
  FiCalendar,
  FiUsers,
  FiGrid,
  FiX,
  FiEdit2,
  FiCheck,
  FiChevronRight,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";
import { Brand } from "../components/Brand";
import { adminStorageKey, dateLabel, money, readDemo } from "../data/adminDemo";
import clubImage from "../assets/real-park-stretch.jpg";
import "./AdminPage.css";

const emptyEvent = {
  title: "",
  date: "",
  time: "09:00",
  venue: "",
  price: "",
  capacity: 30,
  status: "Draft",
  description: "",
};
const iconButton = (label, icon, action) => (
  <button
    className="admin-icon"
    type="button"
    aria-label={label}
    title={label}
    onClick={action}
  >
    {icon}
  </button>
);

export function AdminPage({ navigate }) {
  const [data, setData] = useState(readDemo);
  const [view, setView] = useState("Bookings");
  const [query, setQuery] = useState("");
  const [eventFilter, setEventFilter] = useState("All events");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [modal, setModal] = useState(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [storageError, setStorageError] = useState("");
  const [form, setForm] = useState({});
  const dialog = useRef(null);
  const opener = useRef(null);
  const eventById = useMemo(
    () => Object.fromEntries(data.events.map((event) => [event.id, event])),
    [data.events],
  );
  const active = data.bookings.filter(
    (booking) => booking.status !== "Cancelled",
  );
  const seats = (id) =>
    active
      .filter((booking) => booking.eventId === id)
      .reduce((sum, booking) => sum + booking.tickets, 0);
  const revenue = active
    .filter((booking) => booking.payment === "Paid")
    .reduce(
      (sum, booking) =>
        sum + booking.tickets * (booking.pricePerTicket ?? eventById[booking.eventId]?.price ?? 0),
      0,
    );
  const pending = active.filter(
    (booking) => booking.payment === "Pending",
  ).length;
  useEffect(() => {
    try {
      localStorage.setItem(adminStorageKey, JSON.stringify(data));
      setStorageError("");
    } catch {
      setStorageError(
        "Browser storage is unavailable. Changes will last for this session only.",
      );
    }
  }, [data]);
  useEffect(() => {
    if (!modal) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector("input, button")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setModal(null);
      if (event.key === "Tab") {
        const elements = [
          ...dialog.current.querySelectorAll("button, input, select, textarea"),
        ].filter((element) => !element.disabled);
        const first = elements[0],
          last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      opener.current?.focus();
    };
  }, [modal]);
  const open = (type, item) => {
    opener.current = document.activeElement;
    setError("");
    setForm(
      item
        ? { ...item }
        : type === "event"
          ? { ...emptyEvent }
          : {
              name: "",
              email: "",
              eventId:
                data.events.find((event) => event.status === "Published")?.id ||
                "",
              tickets: 1,
              payment: "Paid",
              status: "Confirmed",
              notes: "",
              checkedIn: false,
            },
    );
    setModal({ type, editing: !!item });
  };
  const field = (key) => ({
    value: form[key] ?? "",
    onChange: (event) =>
      setForm((current) => ({ ...current, ...(key === 'eventId' ? { pricePerTicket: undefined } : {}), [key]: event.target.value })),
  });
  const save = (event) => {
    event.preventDefault();
    setError("");
    if (modal.type === "event") {
      if (!form.title.trim() || !form.venue.trim())
        return setError("Add an event name and venue.");
      if (Number(form.capacity) < seats(form.id))
        return setError(
          "Capacity cannot be lower than the number of reserved places.",
        );
      const record = {
        ...form,
        title: form.title.trim(),
        price: Number(form.price),
        capacity: Number(form.capacity),
        id: form.id || `ev-${Date.now()}`,
      };
      setData((current) => ({
        ...current,
        events: modal.editing
          ? current.events.map((item) =>
              item.id === record.id ? record : item,
            )
          : [...current.events, record],
      }));
    } else {
      const selected = eventById[form.eventId];
      if (!form.name.trim()) return setError("Add the guest’s full name.");
      if (!selected || selected.status !== "Published")
        return setError("Select a published event.");
      const others = active
        .filter((item) => item.eventId === form.eventId && item.id !== form.id)
        .reduce((sum, item) => sum + item.tickets, 0);
      if (
        form.status !== "Cancelled" &&
        others + Number(form.tickets) > selected.capacity
      )
        return setError(
          `Only ${selected.capacity - others} places remain for this event.`,
        );
      const record = {
        ...form,
        name: form.name.trim(),
        tickets: Number(form.tickets),
        pricePerTicket: form.pricePerTicket ?? selected.price,
        checkedIn: form.status === "Cancelled" ? false : form.checkedIn,
        source: form.source || "Admin",
        created: form.created || new Date().toISOString().slice(0, 10),
        id: form.id || `KF-${Date.now().toString().slice(-7)}`,
      };
      setData((current) => ({
        ...current,
        bookings: modal.editing
          ? current.bookings.map((item) =>
              item.id === record.id ? record : item,
            )
          : [record, ...current.bookings],
      }));
    }
    setNotice(
      `${modal.type === "event" ? "Event" : "Booking"} ${modal.editing ? "updated" : "created"} successfully.`,
    );
    setModal(null);
  };
  const rows = data.bookings.filter(
    (booking) =>
      `${booking.name} ${booking.email} ${booking.id}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (eventFilter === "All events" || booking.eventId === eventFilter) &&
      (statusFilter === "All statuses" ||
        booking.payment === statusFilter ||
        booking.status === statusFilter ||
        (statusFilter === "Checked in" && booking.checkedIn)),
  );
  const exportCsv = () => {
    const escape = (value) => `"${String(value).replaceAll('"', '""')}"`;
    const contents = [
      [
        "Reference",
        "Guest",
        "Email",
        "Event",
        "Tickets",
        "Payment",
        "Status",
        "Checked in",
      ],
      ...rows.map((booking) => [
        booking.id,
        booking.name,
        booking.email,
        eventById[booking.eventId]?.title,
        booking.tickets,
        booking.payment,
        booking.status,
        booking.checkedIn ? "Yes" : "No",
      ]),
    ]
      .map((row) => row.map(escape).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([contents], { type: "text/csv;charset=utf-8;" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "kaixenflow-demo-bookings.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice(`${rows.length} bookings exported.`);
  };
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            navigate("/");
          }}
          className="brand"
        >
          <Brand />
        </a>
        <p className="admin-sidebar__label">Club management</p>
        <nav aria-label="Administration">
          {["Bookings", "Events"].map((tab) => (
            <button
              key={tab}
              className={view === tab ? "active" : ""}
              onClick={() => {
                setView(tab);
                setQuery("");
              }}
            >
              {tab === "Bookings" ? <FiUsers /> : <FiCalendar />}
              {tab}
              <span>
                {tab === "Bookings" ? data.bookings.length : data.events.length}
              </span>
            </button>
          ))}
        </nav>
        <div className="admin-sidebar__image">
          <img src={clubImage} alt="KaixenFlow outdoor Pilates" />
          <p className="script">
            a little behind
            <br />
            the feeling.
          </p>
        </div>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            navigate("/");
          }}
          className="admin-back"
        >
          <FiArrowLeft /> Back to website <FiArrowUpRight />
        </a>
        <div className="admin-profile">
          <span>KF</span>
          <div>
            Club administrator<small>KaixenFlow team</small>
          </div>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <span>
            <FiGrid /> Workspace <FiChevronRight /> {view}
          </span>
          <span className="admin-demo">Demo workspace</span>
        </header>
        <div className="admin-content">
          <div className="admin-heading">
            <div>
              <p className="eyebrow">The people. The plans. The flow.</p>
              <h1>
                {view === "Bookings"
                  ? "Your club, at a glance."
                  : "Make the next good thing."}
              </h1>
              <p>
                {view === "Bookings"
                  ? "Every name is part of the story. Keep the details in one place."
                  : "Shape the gatherings that bring your community together."}
              </p>
            </div>
            <button
              className="admin-primary"
              onClick={() => open(view === "Bookings" ? "booking" : "event")}
            >
              <FiPlus />
              {view === "Bookings" ? "Add booking" : "Create event"}
            </button>
          </div>
          <div className="admin-stats">
            <article>
              <span>
                Collected revenue <FiArrowUpRight />
              </span>
              <strong>{money(revenue)}</strong>
              <small>Paid, active bookings</small>
            </article>
            <article>
              <span>
                Reserved places <FiUsers />
              </span>
              <strong>
                {active.reduce((sum, booking) => sum + booking.tickets, 0)}
                <em>
                  {" "}
                  /{" "}
                  {data.events
                    .filter((item) => item.status === "Published")
                    .reduce((sum, event) => sum + event.capacity, 0)}
                </em>
              </strong>
              <small>Across published gatherings</small>
            </article>
            <article>
              <span>
                Awaiting payment <FiCalendar />
              </span>
              <strong>{pending.toString().padStart(2, "0")}</strong>
              <small>
                {money(
                  active
                    .filter((booking) => booking.payment === "Pending")
                    .reduce(
                      (sum, booking) =>
                        sum +
                        booking.tickets *
                          (booking.pricePerTicket ?? eventById[booking.eventId]?.price ?? 0),
                      0,
                    ),
                )}{" "}
                outstanding
              </small>
            </article>
            <article>
              <span>
                Checked in <FiCheckCircle />
              </span>
              <strong>
                {active
                  .filter((booking) => booking.checkedIn)
                  .reduce((sum, booking) => sum + booking.tickets, 0)
                  .toString()
                  .padStart(2, "0")}
              </strong>
              <small>Guest places welcomed</small>
            </article>
          </div>
          {storageError && (
            <p className="admin-error" role="alert">
              {storageError}
            </p>
          )}
          {notice && (
            <div className="admin-notice" role="status">
              <FiCheckCircle />
              {notice}
              {iconButton("Dismiss notification", <FiX />, () => setNotice(""))}
            </div>
          )}
          <div className="admin-section-title">
            <div
              className="admin-tabs"
              role="tablist"
              aria-label="Management views"
            >
              {["Bookings", "Events"].map((tab) => (
                <button
                  role="tab"
                  aria-selected={view === tab}
                  key={tab}
                  className={view === tab ? "active" : ""}
                  onClick={() => {
                    setView(tab);
                    setQuery("");
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="admin-record-count">
              {view === "Bookings"
                ? data.bookings.length + " bookings"
                : data.events.length + " gatherings"}
            </span>
          </div>
          {view === "Bookings" ? (
            <>
              <div className="admin-toolbar">
                <label className="admin-search">
                  <FiSearch />
                  <input
                    aria-label="Search bookings"
                    placeholder="Search guests, email or reference…"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </label>
                <select
                  aria-label="Filter by event"
                  value={eventFilter}
                  onChange={(event) => setEventFilter(event.target.value)}
                >
                  <option>All events</option>
                  {data.events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Filter by status"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  {[
                    "All statuses",
                    "Paid",
                    "Pending",
                    "Cancelled",
                    "Checked in",
                  ].map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
                <button className="admin-secondary" onClick={exportCsv}>
                  <FiDownload /> Export CSV
                </button>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Experience</th>
                      <th>Places</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Attendance</th>
                      <th>
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((booking) => (
                      <tr key={booking.id}>
                        <td>
                          <div className="admin-guest">
                            <span className="admin-avatar">
                              {booking.name
                                .split(" ")
                                .map((part) => part[0])
                                .slice(0, 2)
                                .join("")}
                            </span>
                            <div>
                              <button
                                className="admin-guest-name"
                                onClick={() => open("booking", booking)}
                              >
                                {booking.name}
                              </button>
                              <small>
                                {booking.id} · {booking.source}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span>
                            {eventById[booking.eventId]?.title ||
                              "Event unavailable"}
                          </span>
                          <small>
                            {eventById[booking.eventId] &&
                              dateLabel(eventById[booking.eventId].date)}
                          </small>
                        </td>
                        <td>{booking.tickets.toString().padStart(2, "0")}</td>
                        <td>
                          {money(
                            booking.tickets *
                              (booking.pricePerTicket ?? eventById[booking.eventId]?.price ?? 0),
                          )}
                        </td>
                        <td>
                          <span
                            className={`admin-badge admin-badge--${booking.status === "Cancelled" ? "cancelled" : booking.payment.toLowerCase()}`}
                          >
                            {booking.status === "Cancelled"
                              ? "Cancelled"
                              : booking.payment}
                          </span>
                        </td>
                        <td>
                          {booking.status === "Cancelled" ? (
                            <span className="admin-muted">Cancelled</span>
                          ) : (
                            <button
                              className={`admin-checkin ${booking.checkedIn ? "checked" : ""}`}
                              onClick={() => {
                                setData((current) => ({
                                  ...current,
                                  bookings: current.bookings.map((item) =>
                                    item.id === booking.id
                                      ? { ...item, checkedIn: !item.checkedIn }
                                      : item,
                                  ),
                                }));
                                setNotice(
                                  booking.checkedIn
                                    ? "Check-in undone."
                                    : `${booking.name} checked in.`,
                                );
                              }}
                            >
                              {booking.checkedIn ? (
                                <>
                                  <FiCheck /> Checked in
                                </>
                              ) : (
                                "Check in"
                              )}
                            </button>
                          )}
                        </td>
                        <td>
                          {iconButton(
                            `Edit booking for ${booking.name}`,
                            <FiEdit2 />,
                            () => open("booking", booking),
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rows.length === 0 && (
                  <div className="admin-empty">
                    <FiSearch />
                    <h3>No bookings found</h3>
                    <p>Try another name or clear your filters.</p>
                    <button
                      className="admin-secondary"
                      onClick={() => {
                        setQuery("");
                        setEventFilter("All events");
                        setStatusFilter("All statuses");
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
              <div className="admin-table-footer">
                <span>
                  Showing {rows.length} of {data.bookings.length} bookings
                </span>
                <span>All times SAST · Currency ZAR</span>
              </div>
            </>
          ) : (
            <div className="admin-event-list">
              {[...data.events]
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((event) => (
                  <article key={event.id} className="admin-event">
                    <div className="admin-date-tile">
                      <span>
                        {new Date(event.date + "T12:00:00").toLocaleDateString(
                          "en-ZA",
                          { month: "short" },
                        )}
                      </span>
                      <strong>{event.date.slice(-2)}</strong>
                    </div>
                    <div className="admin-event-info">
                      <span
                        className={`admin-badge admin-badge--${event.status === "Published" ? "paid" : "pending"}`}
                      >
                        {event.status}
                      </span>
                      <h2>{event.title}</h2>
                      <p>
                        {event.venue} · {event.time} SAST
                      </p>
                      <p>{event.description}</p>
                    </div>
                    <div className="admin-event-capacity">
                      <strong>
                        {seats(event.id)} <span>/ {event.capacity} places</span>
                      </strong>
                      <progress
                        value={seats(event.id)}
                        max={event.capacity}
                        aria-label={`${event.title} capacity`}
                      />
                      <small>{money(event.price)} per person</small>
                    </div>
                    {iconButton(`Edit ${event.title}`, <FiEdit2 />, () =>
                      open("event", event),
                    )}
                  </article>
                ))}
            </div>
          )}
          <footer className="admin-footnote">
            <span>KAIXENFLOW / Club operations</span>
            <span>Fictional demo records · Saved in this browser</span>
          </footer>
        </div>
      </main>
      {modal && (
        <div className="admin-modal-backdrop">
          <section
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-dialog-title"
            ref={dialog}
          >
            <div className="admin-modal-heading">
              <div>
                <p className="eyebrow">Club management</p>
                <h2 id="admin-dialog-title">
                  {modal.editing ? "Edit" : "New"}{" "}
                  {modal.type === "event" ? "event" : "booking"}
                </h2>
              </div>
              {iconButton("Close form", <FiX />, () => setModal(null))}
            </div>
            <form onSubmit={save} className="admin-form">
              {modal.type === "event" ? (
                <>
                  <label className="full">
                    Event name
                    <input required {...field("title")} />
                  </label>
                  <label>
                    Date
                    <input type="date" required {...field("date")} />
                  </label>
                  <label>
                    Time (SAST)
                    <input type="time" required {...field("time")} />
                  </label>
                  <label className="full">
                    Venue
                    <input required {...field("venue")} />
                  </label>
                  <label>
                    Price per person (ZAR)
                    <input
                      type="number"
                      min="0"
                      max="100000"
                      required
                      {...field("price")}
                    />
                  </label>
                  <label>
                    Capacity
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      required
                      {...field("capacity")}
                    />
                  </label>
                  <label className="full">
                    Description
                    <textarea rows="3" {...field("description")} />
                  </label>
                  <label className="full">
                    Publication
                    <select {...field("status")}>
                      <option>Draft</option>
                      <option>Published</option>
                    </select>
                  </label>
                </>
              ) : (
                <>
                  <label className="full">
                    Guest full name
                    <input required {...field("name")} />
                  </label>
                  <label className="full">
                    Email address
                    <input type="email" required {...field("email")} />
                  </label>
                  <label className="full">
                    Event
                    <select required {...field("eventId")}>
                      <option value="">Select an experience</option>
                      {data.events
                        .filter((event) => event.status === "Published")
                        .map((event) => (
                          <option key={event.id} value={event.id}>
                            {event.title} · {money(event.price)}
                          </option>
                        ))}
                    </select>
                  </label>
                  <label>
                    Number of places
                    <input
                      type="number"
                      min="1"
                      max="20"
                      required
                      {...field("tickets")}
                    />
                  </label>
                  <label>
                    Payment
                    <select {...field("payment")}>
                      <option>Paid</option>
                      <option>Pending</option>
                    </select>
                  </label>
                  <label className="full">
                    Booking status
                    <select {...field("status")}>
                      <option>Confirmed</option>
                      <option>Cancelled</option>
                    </select>
                  </label>
                  <label className="full">
                    Guest notes
                    <textarea rows="3" {...field("notes")} />
                  </label>
                  <div className="admin-form-total full">
                    <span>Booking total</span>
                    <strong>
                      {money(
                        (form.pricePerTicket ?? eventById[form.eventId]?.price ?? 0) *
                          (Number(form.tickets) || 0),
                      )}
                    </strong>
                  </div>
                </>
              )}
              {error && (
                <p role="alert" className="admin-error full">
                  {error}
                </p>
              )}
              <div className="admin-form-actions full">
                <button
                  type="button"
                  className="admin-secondary"
                  onClick={() => setModal(null)}
                >
                  Cancel
                </button>
                <button className="admin-primary" type="submit">
                  <FiCheck />
                  {modal.editing
                    ? "Save changes"
                    : modal.type === "event"
                      ? "Create event"
                      : "Add booking"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
