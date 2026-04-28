const { db } = require('./firebase');

async function seedCollections() {
    try {
        const batch = db.batch();
        
        // Create user_preferences collection with placeholder
        const userPrefRef = db.collection('user_preferences').doc('placeholder');
        batch.set(userPrefRef, {
            budget: null,
            usage: null,
            prioritymileage: null,
            prioritysafety: null,
            preferred_body_type: null,
            fuel_preference: null,
            created_at: null
        });
        
        // Create recommendations collection with placeholder
        const recommendRef = db.collection('recommendations').doc('placeholder');
        batch.set(recommendRef, {
            userprefid: null,
            car_id: null,
            score: null,
            reason: []
        });
        
        await batch.commit();
        console.log('✅ Collections created successfully!');
        console.log('   - user_preferences');
        console.log('   - recommendations');
        console.log('\n📝 Placeholder documents added to establish structure.');
        console.log('⚠️  Remember to delete placeholder docs before deploying to production!');
    } catch (error) {
        console.error('❌ Error creating collections:', error);
    }
}

seedCollections();
