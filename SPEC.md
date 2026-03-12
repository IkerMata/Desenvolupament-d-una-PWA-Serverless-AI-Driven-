# EstateFlow: PWA Specification (SPEC.md)

## 1. Overview & Objectives
EstateFlow is a high-end Real Estate Management PWA designed to showcase properties and provide an administrative dashboard for management. 

### Objectives:
- Implement a **PWA** using **Nuxt 3**.
- Use **Serverless Architecture** (Nuxt API routes).
- Integrate an **AI Chatbot** for user assistance.
- Follow **Specification-Driven Development (SDD)**.

## 2. Architecture
- **Frontend**: Nuxt.js (Vue 3, Vite).
- **Backend (Serverless)**: Nuxt Nitro server routes (`/api/*`).
- **Data Persistence**: `localStorage` (for prototyping/MVP) managed via server endpoints.
- **PWA**: Using `@vite-pwa/nuxt` for service workers and manifest.
- **Styling**: Vanilla CSS with HSL variables.

## 3. Actors
- **Public User**: Browses properties, uses the AI chatbot, and filters by price/type.
- **Administrator**: Manages listings (CRUD), toggles property status.

## 4. User Journey
1. **Discovery**: User enters the site and sees a beautiful property grid.
2. **Assistance**: User opens the AI Chatbot to ask for recommendations.
3. **Filtering**: User filters properties by price or category.
4. **Management**: Admin logs into `/admin` to add or update listings.

## 5. Functional Requirements
- **Property Listing**: Title, price, location, beds, baths, sqft, images, status.
- **Filtering System**: Price range, property type (Apartment, House, Villa).
- **Search**: By location or title.
- **Admin Dashboard**: Secure form to Manage (Add/Edit/Delete) properties.
- **AI Chatbot**: Floating assistant that answers property-related questions.

## 6. Serverless Endpoints (Nitro)
- `GET /api/properties`: Fetch all listings.
- `POST /api/properties`: Create a new listing.
- `PUT /api/properties/:id`: Update a listing.
- `DELETE /api/properties/:id`: Delete a listing.

## 7. Chatbot Behavior
- The chatbot will be a persistent component.
- It will parse property data to provide intelligent answers (e.g., "Show me houses under 500k").
- It will use a structured prompt to maintain a professional real estate agent persona.
