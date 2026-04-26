import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getResources, createResource, updateResource, deleteResource } from '../services/resourceService';
import { getResourceStats } from '../services/resourceService';
import {
    Search, Plus, Edit2, Trash2, X, ChevronLeft,
    Building2, Activity, CheckCircle, AlertTriangle,
    Filter, MapPin, Users, Layers, LayoutGrid
} from 'lucide-react';

const TYPE_COLORS = {
    LECTURE_HALL: { bg: 'bg-indigo-100', text: 'text-indigo-700', bar: '#6366f1' },
    LAB:          { bg: 'bg-teal-100',   text: 'text-teal-700',   bar: '#14b8a6' },
    MEETING_ROOM: { bg: 'bg-orange-100', text: 'text-orange-700', bar: '#f97316' },
    EQUIPMENT:    { bg: 'bg-purple-100', text: 'text-purple-700', bar: '#a855f7' },
};

const StatCard = ({ icon: Icon, label, value, accent, bar }) => (
    <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '20px 24px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        transition: 'transform 0.2s, box-shadow 0.2s',
    }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
    >
        <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>{label}</p>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>{value}</p>
            {bar !== undefined && (
                <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '99px', marginTop: '10px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${bar}%`, background: accent, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                </div>
            )}
        </div>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: accent + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon size={22} color={accent} />
        </div>
    </div>
);

const FacilitiesCatalogue = () => {
    const navigate = useNavigate();
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [resources, setResources] = useState([]);
    const [stats, setStats] = useState({ totalCount: 0, activeCount: 0, maintenanceCount: 0, typeBreakdown: {} });
    const [filters, setFilters] = useState({ type: '', capacity: '', location: '' });
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentResource, setCurrentResource] = useState({ name: '', type: '', capacity: '', location: '', availabilityWindows: '', status: 'ACTIVE' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => { fetchResources(); }, [filters, refreshTrigger]);
    useEffect(() => { fetchStats(); }, [refreshTrigger]);

    const fetchResources = async () => {
        try {
            const data = await getResources(filters);
            setResources(data);
        } catch (err) { console.error(err); }
    };

    const fetchStats = async () => {
        try {
            const data = await getResourceStats();
            setStats(data);
        } catch (err) { console.error(err); }
    };

    const filtered = resources.filter(r =>
        !search || r.name?.toLowerCase().includes(search.toLowerCase()) || r.location?.toLowerCase().includes(search.toLowerCase())
    );

    const activePercentage = stats.totalCount > 0 ? (stats.activeCount / stats.totalCount) * 100 : 0;
    const maintenancePercentage = stats.totalCount > 0 ? (stats.maintenanceCount / stats.totalCount) * 100 : 0;

    const openModal = (resource = null) => {
        if (resource) { setIsEditing(true); setCurrentResource(resource); }
        else { setIsEditing(false); setCurrentResource({ name: '', type: '', capacity: '', location: '', availabilityWindows: '', status: 'ACTIVE' }); }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentResource({ name: '', type: '', capacity: '', location: '', availabilityWindows: '', status: 'ACTIVE' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) await updateResource(currentResource.id, currentResource);
            else await createResource(currentResource);
            setRefreshTrigger(p => p + 1);
            closeModal();
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this resource?')) return;
        try { await deleteResource(id); setRefreshTrigger(p => p + 1); }
        catch (err) { console.error(err); }
    };

    const inputStyle = {
        width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px',
        fontSize: '0.875rem', outline: 'none', background: '#f8fafc', color: '#1e293b',
        transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box',
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 8px' }}>

            {/* Back Button */}
            <button
                onClick={() => navigate('/admin')}
                style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#64748b', fontSize: '0.875rem', fontWeight: 600,
                    padding: '0', marginBottom: '24px', transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#4f46e5'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
            >
                <ChevronLeft size={18} />
                Back to Admin Hub
            </button>

            {/* Page Header */}
            <div style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                borderRadius: '20px', padding: '32px 40px', marginBottom: '28px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                boxShadow: '0 8px 32px rgba(37,99,235,0.25)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '14px', padding: '14px', backdropFilter: 'blur(8px)' }}>
                        <LayoutGrid size={28} color="#fff" />
                    </div>
                    <div>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                            Admin Panel
                        </p>
                        <h1 style={{ color: '#fff', fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
                            Facilities & Assets
                        </h1>
                    </div>
                </div>
                <button
                    onClick={() => openModal()}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: '#fff', color: '#2563eb', border: 'none',
                        borderRadius: '12px', padding: '12px 22px',
                        fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.15)', transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}
                >
                    <Plus size={18} /> Add Resource
                </button>
            </div>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                <StatCard icon={Layers} label="Total Resources" value={stats.totalCount} accent="#2563eb" />
                <StatCard icon={CheckCircle} label="Active" value={stats.activeCount} accent="#22c55e" bar={activePercentage} />
                <StatCard icon={AlertTriangle} label="Out of Service" value={stats.maintenanceCount} accent="#ef4444" bar={maintenancePercentage} />
            </div>

            {/* Type Breakdown */}
            {Object.keys(stats.typeBreakdown || {}).length > 0 && (
                <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginBottom: '28px' }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Type Breakdown</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {Object.entries(stats.typeBreakdown).map(([type, count]) => {
                            const pct = stats.totalCount > 0 ? (count / stats.totalCount) * 100 : 0;
                            const color = TYPE_COLORS[type]?.bar || '#2563eb';
                            return (
                                <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', width: '120px', flexShrink: 0 }}>{type.replace('_', ' ')}</span>
                                    <div style={{ flex: 1, height: '8px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                    </div>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', width: '28px', textAlign: 'right' }}>{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Search & Filters */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px 24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                    {/* Search */}
                    <div style={{ position: 'relative', flex: '2', minWidth: '200px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            placeholder="Search by name or location…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{ ...inputStyle, paddingLeft: '38px' }}
                        />
                    </div>
                    {/* Type Filter */}
                    <div style={{ position: 'relative', flex: '1', minWidth: '160px' }}>
                        <Filter size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <select
                            name="type"
                            value={filters.type}
                            onChange={e => setFilters({ ...filters, type: e.target.value })}
                            style={{ ...inputStyle, paddingLeft: '34px', cursor: 'pointer' }}
                        >
                            <option value="">All Types</option>
                            <option value="LECTURE_HALL">Lecture Hall</option>
                            <option value="LAB">Lab</option>
                            <option value="MEETING_ROOM">Meeting Room</option>
                            <option value="EQUIPMENT">Equipment</option>
                        </select>
                    </div>
                    {/* Capacity Filter */}
                    <div style={{ position: 'relative', flex: '1', minWidth: '140px' }}>
                        <Users size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="number"
                            name="capacity"
                            placeholder="Min Capacity"
                            value={filters.capacity}
                            onChange={e => setFilters({ ...filters, capacity: e.target.value })}
                            style={{ ...inputStyle, paddingLeft: '34px' }}
                        />
                    </div>
                    {/* Location Filter */}
                    <div style={{ position: 'relative', flex: '1', minWidth: '160px' }}>
                        <MapPin size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            name="location"
                            placeholder="Filter location"
                            value={filters.location}
                            onChange={e => setFilters({ ...filters, location: e.target.value })}
                            style={{ ...inputStyle, paddingLeft: '34px' }}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden', marginBottom: '32px' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                {['Name', 'Type', 'Capacity', 'Location', 'Availability', 'Status', 'Actions'].map(h => (
                                    <th key={h} style={{ padding: '14px 20px', fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: h === 'Actions' ? 'center' : 'left', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? filtered.map((res, i) => {
                                const tc = TYPE_COLORS[res.type] || { bg: 'bg-blue-100', text: 'text-blue-700' };
                                return (
                                    <tr key={res.id} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.15s' }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                        onMouseLeave={e => e.currentTarget.style.background = ''}
                                    >
                                        <td style={{ padding: '16px 20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <Building2 size={16} color="#2563eb" />
                                                </div>
                                                <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>{res.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 20px' }}>
                                            <span style={{
                                                padding: '4px 10px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 700,
                                                background: tc.bg.replace('bg-', '').includes('indigo') ? '#eef2ff' : tc.bg.replace('bg-', '').includes('teal') ? '#f0fdfa' : tc.bg.replace('bg-', '').includes('orange') ? '#fff7ed' : '#faf5ff',
                                                color: tc.text.replace('text-', '').includes('indigo') ? '#4f46e5' : tc.text.replace('text-', '').includes('teal') ? '#0f766e' : tc.text.replace('text-', '').includes('orange') ? '#c2410c' : '#7e22ce',
                                            }}>{(res.type || '').replace('_', ' ')}</span>
                                        </td>
                                        <td style={{ padding: '16px 20px', fontSize: '0.875rem', color: '#475569', fontWeight: 600 }}>{res.capacity || '—'}</td>
                                        <td style={{ padding: '16px 20px', fontSize: '0.875rem', color: '#475569' }}>{res.location || '—'}</td>
                                        <td style={{ padding: '16px 20px', fontSize: '0.8rem', color: '#94a3b8', maxWidth: '160px' }}>
                                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{res.availabilityWindows || '—'}</span>
                                        </td>
                                        <td style={{ padding: '16px 20px' }}>
                                            <span style={{
                                                padding: '4px 12px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 700,
                                                background: res.status === 'ACTIVE' ? '#f0fdf4' : '#fef2f2',
                                                color: res.status === 'ACTIVE' ? '#16a34a' : '#dc2626',
                                            }}>{res.status}</span>
                                        </td>
                                        <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                                                <button onClick={() => openModal(res)} title="Edit" style={{ background: '#eff6ff', border: 'none', color: '#2563eb', borderRadius: '8px', padding: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'background 0.15s' }}
                                                    onMouseEnter={e => e.currentTarget.style.background = '#dbeafe'}
                                                    onMouseLeave={e => e.currentTarget.style.background = '#eff6ff'}>
                                                    <Edit2 size={15} />
                                                </button>
                                                <button onClick={() => handleDelete(res.id)} title="Delete" style={{ background: '#fef2f2', border: 'none', color: '#dc2626', borderRadius: '8px', padding: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'background 0.15s' }}
                                                    onMouseEnter={e => e.currentTarget.style.background = '#fecaca'}
                                                    onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}>
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="7" style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
                                        <Building2 size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                                        <p style={{ fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>No resources found</p>
                                        <p style={{ fontSize: '0.8rem' }}>Try adjusting your filters or add a new resource.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {filtered.length > 0 && (
                    <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Showing {filtered.length} of {resources.length} resources</span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Last synced: {new Date().toLocaleTimeString()}</span>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                    <div style={{ background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '520px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.2)', animation: 'modalIn 0.2s ease' }}>
                        <style>{`@keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(-10px); } to { opacity: 1; transform: none; } }`}</style>
                        {/* Modal Header */}
                        <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '6px' }}>
                                    <Building2 size={18} color="#fff" />
                                </div>
                                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
                                    {isEditing ? 'Edit Resource' : 'Add New Resource'}
                                </h3>
                            </div>
                            <button onClick={closeModal} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '8px', padding: '6px', cursor: 'pointer', display: 'flex' }}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Resource Name <span style={{ color: '#ef4444' }}>*</span></label>
                                <input required type="text" name="name" value={currentResource.name}
                                    onChange={e => setCurrentResource({ ...currentResource, name: e.target.value })}
                                    placeholder="e.g. Main Auditorium" style={inputStyle}
                                    onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Type <span style={{ color: '#ef4444' }}>*</span></label>
                                    <select required name="type" value={currentResource.type}
                                        onChange={e => setCurrentResource({ ...currentResource, type: e.target.value })}
                                        style={{ ...inputStyle, cursor: 'pointer' }}
                                        onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                                        onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                    >
                                        <option value="" disabled>Select type</option>
                                        <option value="LECTURE_HALL">Lecture Hall</option>
                                        <option value="LAB">Lab</option>
                                        <option value="MEETING_ROOM">Meeting Room</option>
                                        <option value="EQUIPMENT">Equipment</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Capacity</label>
                                    <input type="number" name="capacity" value={currentResource.capacity}
                                        onChange={e => setCurrentResource({ ...currentResource, capacity: e.target.value })}
                                        placeholder="e.g. 100" style={inputStyle}
                                        onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                                        onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Location</label>
                                <input type="text" name="location" value={currentResource.location}
                                    onChange={e => setCurrentResource({ ...currentResource, location: e.target.value })}
                                    placeholder="e.g. Building A, Floor 2" style={inputStyle}
                                    onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Availability Windows</label>
                                <input type="text" name="availabilityWindows" value={currentResource.availabilityWindows}
                                    onChange={e => setCurrentResource({ ...currentResource, availabilityWindows: e.target.value })}
                                    placeholder="e.g. Mon–Fri 08:00–18:00" style={inputStyle}
                                    onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>Status</label>
                                <select name="status" value={currentResource.status}
                                    onChange={e => setCurrentResource({ ...currentResource, status: e.target.value })}
                                    style={{ ...inputStyle, cursor: 'pointer' }}
                                    onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                                >
                                    <option value="ACTIVE">Active</option>
                                    <option value="OUT_OF_SERVICE">Out of Service</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                                <button type="button" onClick={closeModal} style={{
                                    padding: '10px 20px', borderRadius: '10px', border: '1.5px solid #e2e8f0',
                                    background: '#fff', color: '#475569', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                                }}>Cancel</button>
                                <button type="submit" style={{
                                    padding: '10px 24px', borderRadius: '10px', border: 'none',
                                    background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', color: '#fff',
                                    fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(37,99,235,0.35)',
                                }}>
                                    {isEditing ? 'Save Changes' : 'Add Resource'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacilitiesCatalogue;
