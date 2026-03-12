# Functional Specification: EstateFlow

## Overview
EstateFlow is a property management and sales platform. It consists of two main areas: a public-facing property showcase and a secure administrator dashboard for managing listings.

## Target Audience
- **Property Seekers**: Individuals looking to buy or rent homes.
- **Administrators**: Real estate agents or owners who manage the property catalog.

## Functional Requirements

### 1. Management Dashboard (Admin)
- **Create Listing**: Form to add new properties with:
    - Title and Description
    - Price and Currency
    - Location (Address, City, Postal Code)
    - Features (Beds, Baths, Sqft, Garden, Parking, etc.)
    - Image Uploads (URLs for prototype)
- **Edit Listing**: Update existing property details.
- **Delete Listing**: Remove properties with confirmation.
- **Listing Status**: Toggle between "Available", "Pending", and "Sold".

### 2. Property Showcase (Public)
- **Grid View**: Display all available properties with high-quality thumbnails and key details.
- **Search & Filters**:
    - Filter by Price Range.
    - Filter by Property Type (Apartment, House, Villa).
    - Search by Location.
- **Property Detail View**: Full-page view for a single property showing description, gallery, and specs.
- **Contact Form**: Lead generation form on property pages to message the agent.

### 3. User Stories

#### US1: Property Management (Admin)
"As an admin, I want to add a new house with photos and price so that users can see it on the website."
- **Criteria**: Admin can save a new entry, and it immediately appears in the list.

#### US2: Property Discovery (User)
"As a buyer, I want to filter houses by price so that I only see options within my budget."
- **Criteria**: List updates automatically when filter values change.

#### US3: Lead Generation
"As a buyer, I want to send a message about a specific house so that the agent can contact me."
- **Criteria**: Message is captured and confirmation is shown to the user.

## Data Model (Summary)
- **Property**: ID, Title, Description, Price, Type, Area (sqm), Beds, Baths, Images[], Status, CreatedAt.
