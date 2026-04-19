import { useState } from "react";
import { createTicket } from "../services/ticketService";

export default function CreateTicket() {
  const [form, setForm] = useState({
    description: "",
    category: "",
    priority: "",
    userId: "user1",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTicket(form);
    alert("Ticket Created!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Report Issue</h2>

      <input
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      /><br/><br/>

      <input
        placeholder="Category"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      /><br/><br/>

      <input
        placeholder="Priority"
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      /><br/><br/>

      <button onClick={handleSubmit}>Submit Ticket</button>
    </div>
  );
}
