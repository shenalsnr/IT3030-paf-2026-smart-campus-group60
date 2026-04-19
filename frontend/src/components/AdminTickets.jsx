import { useEffect, useState } from "react";
import {
  getTickets,
  updateStatus,
  assignTechnician,
} from "../services/ticketService";

export default function ViewTickets() {
  const [tickets, setTickets] = useState([]);

  const loadTickets = async () => {
    try {
      const res = await getTickets();
      setTickets(res.data);
    } catch (err) {
      console.error(err);
      alert("Error loading tickets");
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>All Tickets</h2>

      {tickets.map((t) => (
        <div
          key={t.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            background: "#fff",
          }}
        >
          <h3>{t.description}</h3>

          <p>
            <strong>Status:</strong> {t.status}
          </p>

          <p>
            <strong>Technician:</strong>{" "}
            {t.technicianId ? t.technicianId : "Not Assigned"}
          </p>

          {/* 🔥 BUTTON SECTION */}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            
            {t.status === "OPEN" && (
              <button
                style={btnBlue}
                onClick={() =>
                  updateStatus(t.id, "IN_PROGRESS").then(loadTickets)
                }
              >
                Start
              </button>
            )}

            {t.status === "IN_PROGRESS" && (
              <button
                style={btnGreen}
                onClick={() =>
                  updateStatus(t.id, "RESOLVED").then(loadTickets)
                }
              >
                Resolve
              </button>
            )}

            {t.status === "RESOLVED" && (
              <button
                style={btnGray}
                onClick={() =>
                  updateStatus(t.id, "CLOSED").then(loadTickets)
                }
              >
                Close
              </button>
            )}

            <button
              style={btnOrange}
              onClick={() =>
                assignTechnician(t.id, "tech1").then(loadTickets)
              }
            >
              Assign Tech
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 🔷 BUTTON STYLES */
const btnBlue = {
  padding: "6px 12px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const btnGreen = {
  padding: "6px 12px",
  background: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const btnGray = {
  padding: "6px 12px",
  background: "#6b7280",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const btnOrange = {
  padding: "6px 12px",
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
