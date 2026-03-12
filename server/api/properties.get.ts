// server/api/properties.get.ts
export default defineEventHandler(async (event) => {
    // In a real serverless app, this would fetch from a DB (Supabase, Fauna, etc.)
    // For this DAW MVP, we simulate serverless with a "server-side" in-memory/JSON store
    // that the frontend will query.

    // Note: Since this is serverless, we'll return the hardcoded list or use storage.
    const properties = [
        {
            id: '1',
            title: 'Modern Luxury Villa',
            description: 'Stunning villa with panoramic sea views and private pool.',
            price: 1250000,
            type: 'Villa',
            location: 'Marbella, Spain',
            features: { beds: 5, baths: 4, sqft: 450 },
            images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
            status: 'Available',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            title: 'Downtown Penthouse',
            description: 'Luxurious penthouse in the heart of the city.',
            price: 850000,
            type: 'Apartment',
            location: 'Madrid, Spain',
            features: { beds: 3, baths: 2, sqft: 180 },
            images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'],
            status: 'Available',
            createdAt: new Date().toISOString()
        }
    ];

    return properties;
});
