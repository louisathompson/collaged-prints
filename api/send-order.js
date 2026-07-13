// Vercel serverless function — POST /api/send-order
//
// Sends two emails using Resend (https://resend.com):
//   1. A confirmation email to the customer
//   2. A full order-detail notification to you (the shop owner)
//
// Order notifications go to louisathompson2124@gmail.com by default.
// To send them somewhere else instead, add an environment variable in
// your Vercel project settings called SHOP_OWNER_EMAIL — it overrides
// the default without needing a code change.
//
// SETUP (you'll need to do this yourself — see README.md for full steps):
//   1. Create a free Resend account and verify a sending domain (or use
//      their onboarding@resend.dev address for testing).
//   2. Grab your API key from the Resend dashboard.
//   3. In your Vercel project settings, add one required environment variable:
//        RESEND_API_KEY   = your Resend API key
//      (optional) SHOP_OWNER_EMAIL = only needed if you want notifications
//        sent somewhere other than louisathompson2124@gmail.com
//   4. Deploy. This file will automatically become an API route at /api/send-order.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, paymentMethod, items, estimatedBase } = req.body || {};

  if (!name || !email || !phone || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Missing required order fields' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const SHOP_OWNER_EMAIL = process.env.SHOP_OWNER_EMAIL || 'louisathompson2124@gmail.com';

  if (!RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const itemsListHtml = items.map((item, i) => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #eee;vertical-align:top;">${i + 1}. ${escapeHtml(item.template)}</td>
      <td style="padding:10px;border-bottom:1px solid #eee;vertical-align:top;">${escapeHtml(item.customization)}</td>
    </tr>
  `).join('');

  const ownerHtml = `
    <h2>New order request</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}<br>
       <strong>Email:</strong> ${escapeHtml(email)}<br>
       <strong>Phone:</strong> ${escapeHtml(phone)}<br>
       <strong>Payment method:</strong> ${escapeHtml(paymentMethod || 'Not specified')}</p>
    <p><strong>Order total (includes $10 flat fee per customized item and shipping):</strong> $${estimatedBase}</p>
    <table style="border-collapse:collapse;width:100%;">
      <thead>
        <tr>
          <th style="text-align:left;padding:10px;border-bottom:2px solid #333;">Template</th>
          <th style="text-align:left;padding:10px;border-bottom:2px solid #333;">Requested changes</th>
        </tr>
      </thead>
      <tbody>${itemsListHtml}</tbody>
    </table>
    <p style="color:#777;font-size:13px;margin-top:20px;">Confirm the print design with the customer before printing.</p>
  `;

  // Your notification is the only email now — customer confirmation was removed.
  try {
    await sendViaResend(RESEND_API_KEY, {
      to: SHOP_OWNER_EMAIL,
      subject: `New order request from ${name}`,
      html: ownerHtml,
    });
  } catch (err) {
    console.error('Failed to send owner notification:', err);
    return res.status(502).json({ error: 'Failed to send email' });
  }

  return res.status(200).json({ ok: true });
}

async function sendViaResend(apiKey, { to, subject, html }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Collaged Prints <onboarding@resend.dev>', // swap for your verified domain later
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend API error: ${response.status} ${text}`);
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
