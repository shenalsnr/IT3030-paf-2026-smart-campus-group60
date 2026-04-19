import { useEffect, useState } from "react";
import { getTickets } from "../services/ticketService";
import { Link } from "react-router-dom";
import { Search, Calendar, RotateCcw } from "lucide-react";

export default function UserTickets() {
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const userId = "user1";

  const load = async () => {
    try {
      const res = await getTickets();

      const userTickets = res.data.filter(
        (t) => t.userId === userId
      );

      setTickets(userTickets);
      setFiltered(userTickets);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // 🔥 FILTER LOGIC
  useEffect(() => {
    let data = [...tickets];

    // 🔍 Search filter
    if (search) {
      data = data.filter((t) =>
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        (t.subject || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📅 Date filter (if backend has createdAt)
    if (date) {
      data = data.filter((t) => {
        if (!t.createdAt) return true; // skip if no date
        return t.createdAt.startsWith(date);
      });
    }

    setFiltered(data);
  }, [search, date, tickets]);

  const resetFilters = () => {
    setSearch("");
    setDate("");
    setFiltered(tickets);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Tickets</h2>

        <Link to="/tickets/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Report New Issue
          </button>
        </Link>
      </div>

      {/* 🔍 FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow border mb-6 flex flex-col md:flex-row gap-4 items-center">

        {/* SEARCH */}
        <div className="flex items-center border px-3 py-2 rounded-lg w-full">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        {/* DATE */}
        <div className="flex items-center border px-3 py-2 rounded-lg">
          <Calendar size={18} className="text-gray-400 mr-2" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="outline-none"
          />
        </div>

        {/* RESET */}
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <RotateCcw size={16} />
          Reset
        </button>

      </div>

      {/* TICKET LIST */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          No tickets found.
        </div>
      ) : (
        filtered.map((t) => (
          <div
            key={t.id}
            className="border p-4 mb-4 rounded-xl shadow-sm bg-white"
          >
            <h3 className="font-semibold text-lg">{t.description}</h3>

            <p className="text-sm text-gray-600">
              Status: <span className="font-medium">{t.status}</span>
            </p>

            <p className="text-sm text-gray-600">
              Technician: {t.technicianId || "Not Assigned"}
            </p>

            {t.createdAt && (
              <p className="text-xs text-gray-400 mt-1">
                Date: {t.createdAt.split("T")[0]}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}