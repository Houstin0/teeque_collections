# Teeque Collections Frontend

![Vite](https://img.shields.io/badge/Built%20with-Vite-646cff?style=for-the-badge&logo=vite)
![React](https://img.shields.io/badge/React-61dafb?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38b2ac?style=for-the-badge&logo=tailwindcss&logoColor=white)

## Description

Teeque Collections Frontend is a responsive e-commerce storefront built with React and Tailwind CSS for browsing products, searching by category, and managing a shopping cart. It is designed for customers and merchandising teams who need a polished retail UI that integrates with a headless product API and supports M-Pesa checkout and WhatsApp order flow.

## Tech stack

- React 
- Vite
- Tailwind CSS
- JavaScript (JSX)

## Key features

- Responsive product catalog and category browsing
- Client-side search with suggestion support
- Shopping cart with persistance
- Checkout flow with WhatsApp ordering and M-Pesa STK push integration
- Dark mode toggle with local theme persistence
- Product details and shop filtering UI

## Project structure

```text
teeque_collections/
├── index.html              # Vite entry point
├── package.json            # Frontend dependencies and scripts
├── postcss.config.js       # Tailwind/PostCSS configuration
├── tailwind.config.js      # Tailwind content and theme config
├── vite.config.js          # Vite build configuration
├── public/                 # Static assets served at runtime
│   ├── ads/                # Advertisement images
│   ├── icons/              # UI icons
│   └── products/           # Product images
└── src/
    ├── App.jsx             # Root application layout and router outlets
    ├── index.css           # Global style resets and custom CSS
    ├── main.jsx            # React app bootstrap
    ├── assets/             # Imported media and shared assets
    ├── components/         # Shared UI components
    │   ├── CategoryBar.jsx
    │   ├── footer.jsx
    │   ├── navBar.jsx
    │   ├── productSlider.jsx
    │   ├── ScrollToTop.jsx
    │   ├── socialMedia.jsx
    │   └── UI/
    │       ├── carousel.jsx
    │       └── productCard.jsx
    ├── context/            # React context providers
    │   └── CartContext.jsx
    └── pages/              # Routed application pages
        ├── about.jsx
        ├── CategoryPage.jsx
        ├── contact.jsx
        ├── home.jsx
        ├── productDetails.jsx
        ├── searchResults.jsx
        ├── shop.jsx
        └── shoppingCart.jsx
```

## Getting started

### Prerequisites

- Node.js 18+ installed
- npm (recommended) or pnpm/yarn installed

### Clone instructions

```bash
git clone <repo-url>
cd teeque_collections
```

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env` file in the `teeque_collections` directory if you need to override defaults.

Required variables:

- `VITE_API_BASE_URL` — Base URL for the backend API. Defaults to `https://teeque-collections-api.onrender.com/api`.
- `VITE_WHATSAPP_NUMBER` — Optional WhatsApp number used for direct order messages. Defaults to `254757166412`.

Example `.env`:

```env
VITE_API_BASE_URL=https://localhost:5000/api
VITE_WHATSAPP_NUMBER=254712345678
```

### Run the dev server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for production

```bash
npm run build
```




## Component architecture

The frontend is organized as a page-driven React app with reusable components under `src/components`. Routing is handled in `App.jsx` via React Router DOM, and cart state is managed globally with `CartContext` using React Context API.

### State management

- Global cart state stored in `src/context/CartContext.jsx`
- Cart contents persisted
- UI state and form state managed locally within page and component hooks

## API integration

The frontend communicates with the backend API using `fetch()` in page components and the navbar. The base URL is configured through `VITE_API_BASE_URL`. No auth headers or interceptors are configured in the current implementation.

### Backend endpoints used

- `GET /products` — Fetch product catalog
- `GET /products/:id` — Fetch product details
- `POST /payments/mpesa/stk-push` — Initiate M-Pesa STK push payment

## Styling guide

- Styling is implemented with Tailwind CSS and custom utility classes.
- Dark mode is enabled using Tailwind’s `dark` class strategy.
- The design uses a lightweight, mobile-first retail layout with reusable card and grid patterns.
- No external component library is used; UI is custom-built with Tailwind utilities.

## Environment configuration

| Variable | Purpose | Example |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Backend API base URL used by fetch calls | `https://localhost:5000/api` |
| `VITE_WHATSAPP_NUMBER` | Phone number used for WhatsApp ordering | `254757166412` |



## Deployment

### Static deploy

Build the app:

```bash
npm run build
```

Deploy the `dist/` directory to a static host such as Vercel,Render Netlify, or Cloudflare Pages.

## Contributing

- Use feature branches named like `feature/<description>` or `fix/<description>`.
- Open PRs with a clear summary, changed files, and testing instructions.
- Keep JSX clean and maintain Tailwind utility consistency.
- Run `npm run lint` before merging.

## License

Copyright @2026 Houstin Angwenyi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
