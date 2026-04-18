import React from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldCheck,
    CalendarCheck,
    Building2,
    ArrowRight,
    LayoutDashboard,
} from 'lucide-react';

const ADMIN_SECTIONS = [
    {
        title: 'Booking Management',
        description: 'Review, approve or reject resource booking requests submitted by users.',
        icon: CalendarCheck,
        color: '#6366f1',
        bg: '#eef2ff',
        border: '#c7d2fe',
        href: '/admin/bookings',
    },
    {
        title: 'Facilities & Assets',
        description: 'Add, edit or remove campus resources such as lecture halls, labs and equipment.',
        icon: Building2,
        color: '#0284c7',
        bg: '#e0f2fe',
        border: '#bae6fd',
        href: '/admin/catalogue',
    },
];

const AdminHub = () => {
    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            background: 'linear-gradient(135deg, #f8faff 0%, #f1f5f9 100%)',
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 72,
                    height: 72,
                    borderRadius: 20,
                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    marginBottom: 24,
                    boxShadow: '0 8px 32px rgba(99,102,241,0.25)',
                }}>
                    <ShieldCheck size={36} color="#fff" />
                </div>
                <h1 style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: '#0f172a',
                    margin: '0 0 10px',
                    letterSpacing: '-0.5px',
                }}>
                    Admin Portal
                </h1>
                <p style={{
                    fontSize: 16,
                    color: '#64748b',
                    maxWidth: 480,
                    lineHeight: 1.6,
                    margin: '0 auto',
                }}>
                    Manage all aspects of the SwiftFix campus operations platform from one central hub.
                </p>
            </div>

            {/* Section Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 24,
                width: '100%',
                maxWidth: 760,
            }}>
                {ADMIN_SECTIONS.map(({ title, description, icon: Icon, color, bg, border, href }) => (
                    <Link
                        key={href}
                        to={href}
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            background: '#fff',
                            border: `1px solid ${border}`,
                            borderRadius: 20,
                            padding: 32,
                            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
                        }}
                    >
                        {/* Icon */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 52,
                            height: 52,
                            borderRadius: 14,
                            background: bg,
                            marginBottom: 20,
                        }}>
                            <Icon size={26} color={color} />
                        </div>

                        {/* Text */}
                        <h2 style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: '#1e293b',
                            margin: '0 0 8px',
                        }}>
                            {title}
                        </h2>
                        <p style={{
                            fontSize: 14,
                            color: '#64748b',
                            lineHeight: 1.6,
                            margin: '0 0 24px',
                            flex: 1,
                        }}>
                            {description}
                        </p>

                        {/* CTA */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            color: color,
                            fontWeight: 600,
                            fontSize: 14,
                        }}>
                            Open <ArrowRight size={16} />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Footer note */}
            <p style={{
                marginTop: 40,
                fontSize: 12,
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
            }}>
                <LayoutDashboard size={14} /> SwiftFix Admin Portal
            </p>
        </div>
    );
};

export default AdminHub;
