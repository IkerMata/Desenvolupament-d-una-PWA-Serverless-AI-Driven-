# Technical Plan: EstateFlow

## Overview
A lightweight Real Estate management system built with Vanilla JS and `localStorage`.

## User Review Required
> [!IMPORTANT]
> The admin area will be accessible via `admin.html`. In this MVP, there is no server-side authentication; access is governed by client-side routing.

## Proposed Changes

### 1. Data Layer
- **Storage**: `localStorage` using the key `estateflow.properties`.
- **Schema**:
    ```typescript
    interface Property {
        id: string;
        title: string;
        description: string;
        price: number;
        type: 'Apartment' | 'House' | 'Villa';
        location: string;
        features: {
            beds: number;
            baths: number;
            sqft: number;
        };
        images: string[]; // URLs
        status: 'Available' | 'Pending' | 'Sold';
        createdAt: string;
    }
    ```

### 2. Components & Files
- **`src/index.html`**: Public landing page with property grid and filters.
- **`src/admin.html` [NEW]**: Admin dashboard for listing management.
- **`src/js/storage.js` [MODIFY]**: Expand to handle property data.
- **`src/js/properties.js` [NEW]**: Business logic for Property CRUD and filtering.
- **`src/js/ui.js` [MODIFY]**: Add property-specific rendering functions (Card, Grid, Detail, AdminTable).
- **`src/js/app.js` [MODIFY]**: Handle public page logic (filtering, search).
- **`src/js/admin-app.js` [NEW]**: Handle admin dashboard logic (form submission, property management).

### 3. Styling
- **CSS Variable System**: Define a premium palette (Slate, Indigo, Emerald).
- **Layout**: Grid-based for the property list, Flexbox for cards and forms.
- **Micro-interactions**: Hover effects on cards, smooth transitions for filter updates.

## Verification Plan
### Automated Tests
- `npm test`: Unit tests for `properties.js` (CRUD and filtering logic).
### Manual Verification
1. Add a property in `admin.html`.
2. Verify it appears in `index.html`.
3. Test filters (Price, Type) on the public page.
4. Verify persistence after page reload.
