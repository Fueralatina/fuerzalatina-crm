'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://itcypwhymlbbxjbdxblt.supabase.co';
const supabaseAnonKey = 'sb_publishable_JoLuw3BYPdojI0wZWr9zfQ_Nok393EK'; // ← replace with your real anon key if different

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Clients() {
const [clients, setClients] = useState<any[]>([]);
const [search, setSearch] = useState('');
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchClients();
}, []);

const fetchClients = async () => {
const { data, error } = await supabase
.from('clients')
.select('*')
.order('created_at', { ascending: false });

if (error) console.error(error);
else setClients(data || []);

setLoading(false);
};

const filteredClients = clients.filter(client =>
(client.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
(client.email || '').toLowerCase().includes(search.toLowerCase()) ||
(client.policy_number || '').includes(search)
);

return (
<div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
<h1>👥 Client Management</h1>
<p>Manage all your insurance clients across 4 states</p>

<input
type="text"
placeholder="Search by name, email or policy number..."
value={search}
onChange={(e) => setSearch(e.target.value)}
style={{ width: '100%', padding: '12px', marginBottom: '20px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '6px' }}
/>

{loading ? (
<p>Loading clients...</p>
) : (
<table style={{ width: '100%', borderCollapse: 'collapse' }}>
<thead>
<tr style={{ background: '#f0f0f0' }}>
<th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Full Name</th>
<th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
<th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Phone</th>
<th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Policy Number</th>
<th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Type</th>
</tr>
</thead>
<tbody>
{filteredClients.length === 0 ? (
<tr><td colSpan={5} style={{ padding: '20px', textAlign: 'center' }}>No clients found yet. Add your first client below.</td></tr>
) : (
filteredClients.map((client, index) => (
<tr key={index} style={{ borderBottom: '1px solid #eee' }}>
<td style={{ padding: '12px' }}>{client.full_name}</td>
<td style={{ padding: '12px' }}>{client.email}</td>
<td style={{ padding: '12px' }}>{client.phone}</td>
<td style={{ padding: '12px' }}>{client.policy_number}</td>
<td style={{ padding: '12px' }}>{client.policy_type}</td>
</tr>
))
)}
</tbody>
</table>
)}

<button
onClick={() => window.location.href = '/'}
style={{ marginTop: '30px', padding: '12px 24px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
>
← Back to Dashboard
</button>
</div>
);
}
