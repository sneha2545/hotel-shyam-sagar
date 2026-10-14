# Hotel Shyam Sagar — Demo Website

A 10-page vanilla HTML/CSS/JS prototype for **Hotel Shyam Sagar, Roorkee**, built from the Stitch design system captured in `DESIGN.md`.

## Stack
- **HTML5** — one `.html` per route
- **CSS3** — hand-written, no frameworks, no Tailwind
- **Vanilla JavaScript** — small per-page modules
- **Google Fonts** — Playfair Display + Plus Jakarta Sans + Material Symbols
- **Unsplash** — hospitality-themed photography (curated IDs, no AIDA bucket dependency)
- **No backend, no auth, no admin, no payments** — as specified

## File map

```
sh/
├── index.html         Home (full homepage, 10 sections + booking widget)
├── about.html         About Us · heritage, four pillars, founder note
├── rooms.html         Rooms & Suites · Standard, Deluxe, Family Suite
├── gallery.html       Gallery · masonry grid, lightbox
├── skyfall.html       The SkyFall Rooftop · menu, atmosphere, reserves
├── experiences.html   Experiences · weekend escapes, transit, family, business
├── banquets.html      Events & Banquets · weddings, milestones, corporate
├── story.html         Our Story · timeline, convictions
├── offers.html        Offers · six package cards
├── contact.html       Contact · address, phone, hours, form, map
├── assets/
│   ├── css/
│   │   ├── tokens.css       Design tokens (colors, type, spacing, radii)
│   │   ├── base.css         Reset, typography, layout primitives
│   │   ├── components.css   Header, footer, buttons, cards, badges, forms
│   │   └── pages.css        Page-specific styles (timeline, menu, gallery…)
│   ├── js/
│   │   ├── nav.js           Header behaviour, mobile drawer, active link
│   │   ├── booking.js       Hero booking widget + reserve buttons
│   │   ├── gallery.js       Lightbox for gallery page
│   │   ├── forms.js         Contact/enquiry form (mailto fallback)
│   │   └── main.js          IntersectionObserver reveal + lazy bg
│   └── img/                 (left empty; all imagery is Unsplash URL)
├── DESIGN.md          Source-of-truth design system (untouched)
├── code.html          Original Stitch export (untouched)
├── code1.html         Original Stitch export (untouched)
└── screen.png         Design reference (untouched)
```

## How to run

There is no build step. Open `index.html` in a browser, or serve the folder:

```bash
# from inside this folder
python -m http.server 8000
# then visit http://localhost:8000
```

Or use any other static server (`npx serve`, VS Code Live Server, etc.).

## Routes

| Page             | File             | Active link |
|------------------|------------------|-------------|
| Home             | `index.html`     | Home |
| About Us         | `about.html`     | About Us |
| Rooms & Suites   | `rooms.html`     | Rooms & Suites |
| Gallery          | `gallery.html`   | Gallery |
| The SkyFall      | `skyfall.html`   | The SkyFall Rooftop |
| Experiences      | `experiences.html` | Experiences |
| Events & Banquets | `banquets.html` | Events & Banquets |
| Our Story        | `story.html`     | Our Story |
| Offers           | `offers.html`    | Offers |
| Contact          | `contact.html`   | Contact |

## Interactive features (vanilla JS)

1. **Sticky header** with a transparent-over-hero backdrop that condenses on scroll.
2. **Mobile drawer** — hamburger menu with full-screen overlay, ESC to close.
3. **Floating booking widget** — date inputs, guests, space type → toast + WhatsApp prefill.
4. **Reserve buttons** on every room card → toast + WhatsApp prefill with room name.
5. **Contact form** — front-end validation + `mailto:` fallback (no server).
6. **Lightbox** on Gallery — click any photo, arrow keys / ESC navigation.
7. **Reveal-on-scroll** via `IntersectionObserver` (respects `prefers-reduced-motion`).
8. **Lazy hero backgrounds** — set only when scrolled into view for faster initial paint.

## Imagery notes

All photographs are loaded from Unsplash URLs (free use under their license). The IDs have been hand-picked to match the warm-ivory / forest-green / champagne-gold palette specified in `DESIGN.md`. If you want to harden against third-party uptime, download the same images locally and rewrite the URLs to `assets/img/...`.

## Demo disclaimer

Pricing shown in the rooms and offers pages (₹1,899, ₹2,799, ₹3,999, etc.) is **indicative for prototype presentation only**. No real tariff, booking, or payment is wired — every "submit" or "reserve" action triggers a toast and opens WhatsApp/email.