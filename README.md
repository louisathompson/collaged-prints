# Collaged Prints — Site

A custom order-request site: browse premade print designs, mark them
as-is or describe customizations, add multiple prints to a cart, and
submit an order request. No payment is processed — submitting sends an
email with the full order so you can follow up and finalize pricing.

## What's built

- **Homepage** (`index.html`) — draggable collage board + how-it-works
- **Print Shop** (`shop.html`) — gallery of your 16 real print designs,
  each watermarked automatically on canvas (small dense embossed-style
  text tiled across the image), click "Customize & add" to open a modal
  with an "as is, no changes" checkbox and a text box for changes
- **Cart** (`cart.html`) — review items, edit/remove, toggle "as is" per
  item, contact info form, "Place order request" button
- **Thank you** (`thank-you.html`) — confirmation after submitting
- **Email function** (`api/send-order.js`) — Vercel serverless function
  that sends two emails via Resend: one to you, one to the customer

## Order emails

Every order sends **you** a full order-detail email and sends the
**customer** a confirmation email. Your copy goes to
**louisathompson2124@gmail.com** by default — this is built into
`api/send-order.js`, so it works as soon as the email service (below) is
set up, with nothing else to configure.

If you ever want notifications sent to a different address instead, add
an environment variable in your host's project settings called
`SHOP_OWNER_EMAIL` set to the new address — it overrides the default
without touching the code.

## Setting up the email sending (Resend)

The contact form posts to `/api/send-order`, which needs **one**
environment variable to actually send mail. You'll need to set this up
yourself (it's your credential — I can't create the account or hold the
key for you):

1. Create a free account at **resend.com**.
2. For real launch, verify a sending domain in Resend (a few DNS records
   they'll walk you through) so email doesn't land in spam. For quick
   testing, you can send from their default `onboarding@resend.dev`
   address, which is already set in `api/send-order.js`.
3. Copy your API key from the Resend dashboard.
4. When you deploy (see below), add this environment variable in your
   host's project settings:
   - `RESEND_API_KEY` — your Resend API key

## Deploying

This is a static site plus one serverless function, so **Vercel** is the
easiest fit (Netlify works too, with a small adjustment to the function
format).

**Vercel:**
1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Add `RESEND_API_KEY` in Project Settings → Environment Variables.
4. Deploy. Vercel automatically turns `api/send-order.js` into a live
   endpoint at `yoursite.vercel.app/api/send-order`.
5. **Send yourself a test order** through the live site before telling
   customers about it, to confirm the email actually lands in your inbox
   (check spam the first time too).

## Connecting your own domain

Once the site is deployed and working on the `vercel.app` address:

1. In your Vercel project, go to **Settings → Domains** and type in the
   domain you own (e.g. `collagedprints.com`).
2. Vercel will show you one or two DNS records to add — usually an
   **A record** (for the root domain) and/or a **CNAME record** (for
   `www`).
3. Go to wherever you bought the domain (GoDaddy, Namecheap, Google
   Domains, etc.), find its DNS settings, and add the exact records
   Vercel showed you.
4. Wait for DNS to propagate — usually a few minutes, sometimes up to a
   few hours. Vercel's Domains page will show a green checkmark once it's
   live and will auto-issue an SSL certificate (the padlock/https).
5. Test the live domain end-to-end once it's active: browse the shop,
   add something to the cart, and place a test order request to confirm
   emails still arrive correctly on the new domain.

If you don't have a domain yet, you can buy one directly through
Vercel's Domains tab, or from any registrar (Namecheap, Google Domains,
etc.) and point it here using the steps above.

## Notes on the pricing model

- Each print is a flat **$15**.
- Customers choose per item: **"as is, no changes"** (no extra fee), or
  describe what they want changed for a flat **$10** customization fee —
  no need to manually tally anything, the cart total calculates it
  automatically based on which items have the box checked.
- Shipping is a flat **$7**, added once per order (not per item).

## Notes on the watermark

Watermarking happens live in the browser via `<canvas>`
(`js/watermark.js`) — your original files stay clean in
`assets/templates/`, and a dense, small, embossed-style watermark
("COLLAGED PRINTS SAMPLE" repeated) is drawn on top every time a design
is displayed. If you ever want to change the watermark text, density, or
opacity, it's all in that one file.

## Adding or changing print designs

Drop a clean (unwatermarked) image into `assets/templates/` and add an
entry to the `TEMPLATES` array at the top of `js/shop.js` with its
filename and display name.
