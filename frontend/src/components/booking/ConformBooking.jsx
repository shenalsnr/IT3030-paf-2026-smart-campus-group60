import React, { useEffect, useState } from 'react';
import { bookingService } from '../../services/api';
import { getResources } from '../../services/resourceService';
import { CheckCircle, Calendar, Clock, Building2, Users } from 'lucide-react';

const ConformBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Assuming this is a general view, fetching all bookings
            // If it's meant for a specific user, change to getUserBookings(userId)
            const [bookingsRes, resourcesRes] = await Promise.all([
                bookingService.getAllBookings(),
                getResources()
            ]);
            
            // Filter ONLY confirmed/approved bookings
            const confirmedBookings = bookingsRes.data.filter(b => b.status === 'APPROVED');
            setBookings(confirmedBookings);
            setResources(resourcesRes);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 text-indigo-600">
                <div className="animate-spin mr-3"><CheckCircle size={32} /></div>
                <span className="text-xl font-bold">Loading Confirmed Bookings...</span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                <div className="p-3 bg-green-100 rounded-2xl text-green-600 shadow-sm border border-green-200">
                    <CheckCircle size={32} />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Confirmed Bookings</h2>
                    <p className="text-gray-500 text-sm mt-1">View all successfully approved resource reservations.</p>
                </div>
            </div>

            {bookings.length === 0 ? (
                <div className="bg-white p-16 rounded-3xl text-center shadow-lg border border-gray-100 flex flex-col items-center justify-center">
                    <Building2 size={64} className="text-gray-200 mb-4" />
                    <h3 className="text-xl font-bold text-gray-700 mb-2">No Confirmed Bookings</h3>
                    <p className="text-gray-500">There are currently no bookings with a confirmed status.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => {
                        const resource = resources.find(r => String(r.id) === String(booking.resourceId));
                        return (
                            <div 
                                key={booking.id} 
                                className="bg-white rounded-3xl p-6 shadow-xl shadow-green-900/5 border border-green-50 flex flex-col transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/10"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black text-gray-900 truncate pr-2">
                                            {resource ? resource.name : 'Unknown Resource'}
                                        </h3>
                                        <div className="mt-1 flex items-center gap-2">
                                            {resource ? (
                                                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded uppercase text-[10px] font-black tracking-wider border border-blue-100">
                                                    {resource.type}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-[10px]">Loading...</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 border border-green-200">
                                        <CheckCircle size={12} /> Confirmed
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-4 mt-auto space-y-3 border border-gray-100">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm border border-gray-100">
                                            <Calendar size={14} />
                                        </div>
                                        <span className="font-bold">{booking.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm border border-gray-100">
                                            <Clock size={14} />
                                        </div>
                                        <span className="font-bold">{booking.startTime.slice(0, 5)} - {booking.endTime.slice(0, 5)}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm border border-gray-100">
                                            <Users size={14} />
                                        </div>
                                        <span><span className="font-bold">{booking.attendees}</span> Attendees</span>
                                    </div>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Booked By</p>
                                    <p className="font-bold text-gray-800 text-sm truncate">{booking.userId}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ConformBooking;
