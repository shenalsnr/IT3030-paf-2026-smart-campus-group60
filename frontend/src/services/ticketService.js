import axios from "axios";

const API = "http://localhost:8080/tickets";

export const createTicket = (data) => axios.post(API, data);

export const getTickets = () => axios.get(API);

export const updateStatus = (id, status) =>
  axios.put(`${API}/${id}`, { status });

export const assignTechnician = (id, technicianId) =>
  axios.put(`${API}/${id}/assign`, { technicianId });