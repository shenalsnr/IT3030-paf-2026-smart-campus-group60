import { useEffect, useState } from "react";
import { getTickets } from "../services/ticketService";
import { Link } from "react-router-dom";

export default function UserTickets() {
  const [tickets, setTickets] = useState([]);

  const load = async () => {
    const res = await getTickets();

    // 🔥 filter only current user
    const userTickets = res.data.filter(t => t.userId === "user1");

    setTickets(userTickets);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>My Tickets</h2>

      {/* ✅ CREATE BUTTON (FIXED LOCATION) */}
      <Link to="/tickets/create">
        <button style={{ marginBottom: "20px", padding: "8px 12px" }}>
          + Report New Issue
        </button>
      </Link>

      {tickets.length === 0 ? (
        <p>No tickets yet</p>
      ) : (
        tickets.map((t) => (
          <div key={t.id} style={card}>
            <h3>{t.description}</h3>
            <p>Status: {t.status}</p>
            <p>Technician: {t.technicianId || "Not Assigned"}</p>
          </div>
        ))
      )}
    </div>
  );
}

const card = {
  border: "1px solid #ccc",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "6px",
};