import { useState } from "react";
import { createTicket } from "../services/ticketService";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Send, UploadCloud } from "lucide-react";

export default function CreateTicket() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "Samath Lakshan",
    email: "samath@email.com",
    regNo: "",
    contactNo: "",
    faculty: "",
    category: "",
    department: "",
    campus: "",
    subject: "",
    message: "",
    priority: "",
    file: null,
    userId: "user1",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTicket(form);
      alert("Ticket submitted successfully!");
      navigate("/tickets");
    } catch (err) {
      alert("Error submitting ticket");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

      {/* HEADER */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <AlertTriangle className="text-red-500" />
        Submit a Support Request
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* NAME + EMAIL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* REG NUMBER + CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Registration Number *</label>
            <input
              type="text"
              name="regNo"
              onChange={handleChange}
              required
              placeholder="e.g. IT23809642"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Contact Number *</label>
            <input
              type="text"
              name="contactNo"
              onChange={handleChange}
              required
              placeholder="e.g. 0771234567"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* FACULTY */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Faculty / School *</label>
          <select
            name="faculty"
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Faculty</option>
            <option value="Computing">Faculty of Computing</option>
            <option value="Business">Faculty of Business</option>
            <option value="Engineering">Faculty of Engineering</option>
            <option value="Hospitality">Faculty of Hospitality</option>
          </select>
        </div>

        {/* REQUEST TYPE */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Request Type *</label>
          <select
            name="category"
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select request type</option>
            <option value="DOCUMENT">Request document</option>
            <option value="REGISTRATION">Registration issue</option>
            <option value="EXAM">Exam issue</option>
            <option value="SYSTEM">System support</option>
          </select>
        </div>

        {/* DEPARTMENT */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Department *</label>
          <select
            name="department"
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select department</option>
            <option value="Student Services">Student Services</option>
            <option value="Finance">Finance</option>
            <option value="IT Support">IT Support</option>
          </select>
        </div>

        {/* SUBJECT */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Subject *</label>
          <input
            type="text"
            name="subject"
            onChange={handleChange}
            required
            placeholder="Enter subject"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* CAMPUS */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Campus / Center *</label>
          <select
            name="campus"
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select campus</option>
            <option value="Malabe">Malabe Campus</option>
            <option value="Kandy">Kandy Center</option>
            <option value="Matara">Matara Center</option>
            <option value="Kurunegala">Kurunegala Center</option>
          </select>
        </div>

        {/* MESSAGE */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Message *</label>
          <textarea
            name="message"
            rows="4"
            onChange={handleChange}
            required
            placeholder="Describe your issue..."
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* FILE UPLOAD */}
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
          <UploadCloud className="mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-2">Upload attachment</p>
          <input type="file" onChange={handleFile} />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
          >
            <Send size={16} />
            Submit
          </button>

          <button
            type="reset"
            className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            Reset
          </button>
        </div>

      </form>
    </div>
  );
}