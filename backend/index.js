const express = require('express');
const cors = require('cors');
const db = require('./firebase');

const app = express();
app.use(cors());
app.use(express.json());

// function to calculate the score of each car based on user preferences
function scoreCar(car, preferences) {
  let score = 0;
  const reasons = [];

  // -------------------------
  // 1. Budget Match
  // -------------------------
  const budgetMap = {
    budget_low: [500000, 1500000],
    budget_mid: [1500000, 3000000],
    budget_high: [3000000, 5000000],
    budget_premium: [5000000, Infinity],
  };

  const [min, max] = budgetMap[preferences.budget] || [0, Infinity];

  if (car.price >= min && car.price <= max) {
    score += 20;
    reasons.push("Within your budget");
  } else {
    score -= 10; // penalty
  }

  // -------------------------
  // 2. Body Type Match
  // -------------------------
  if (
    preferences.preferredBodyType &&
    preferences.preferredBodyType !== "no_preference"
  ) {
    if (car.body_type.toLowerCase() === preferences.preferredBodyType) {
      score += 15;
      reasons.push("Matches your preferred body type");
    }
  }

  if (preferences.preferredCarType) {
    if (car.body_type.toLowerCase() === preferences.preferredCarType) {
      score += 15;
      reasons.push("Good fit for your family needs");
    }
  }

  // -------------------------
  // 3. Usage Based Scoring
  // -------------------------
  if (preferences.usage === "city") {
    if (car.mileage >= 15) {
      score += 10;
      reasons.push("Good mileage for city driving");
    }
  }

  if (preferences.usage === "highway") {
    if (car.engine_cc >= 1500) {
      score += 10;
      reasons.push("Strong performance for highways");
    }
  }

  if (preferences.usage === "family") {
    if (car.seating_capacity >= 5) {
      score += 10;
      reasons.push("Suitable for family size");
    }
  }

  // -------------------------
  // 4. Fuel Preference
  // -------------------------
  if (preferences.fuelPreference === car.fueltype) {
    score += 10;
    reasons.push(`Matches your ${car.fueltype} preference`);
  }

  // -------------------------
  // 5. Transmission
  // -------------------------
  if (preferences.transmission) {
    if (car.transmission === preferences.transmission) {
      score += 8;
      reasons.push("Matches your transmission preference");
    }
  }

  // -------------------------
  // 6. Features Match
  // -------------------------
  if (preferences.features?.length) {
    const matchedFeatures = preferences.features.filter(f =>
      car.features.includes(f)
    );

    if (matchedFeatures.length > 0) {
      const featureScore = matchedFeatures.length * 3;
      score += featureScore;

      reasons.push(
        `Includes features you want: ${matchedFeatures.join(", ")}`
      );
    }
  }

  // -------------------------
  // 7. Safety Importance
  // -------------------------
  if (preferences.safetyImportance === "very_important") {
    score += car.safety_rating * 4;
    if (car.safety_rating >= 4) {
      reasons.push("High safety rating");
    }
  } else if (preferences.safetyImportance === "important") {
    score += car.safety_rating * 2;
  } else {
    score += car.safety_rating;
  }

  // -------------------------
  // 8. Mileage Preference
  // -------------------------
  if (
    preferences.mattersMost === "mileage" ||
    preferences.prioritize === "mileage"
  ) {
    score += car.mileage;
  }

  // -------------------------
  // 9. Performance Preference
  // -------------------------
  if (
    preferences.prioritize === "performance" ||
    preferences.balancePreference === "performance_focused"
  ) {
    score += car.engine_cc / 100; // normalize
  }

  // -------------------------
  // 10. Comfort / Space
  // -------------------------
  if (preferences.priority === "comfort") {
    score += 5;
  }

  if (preferences.priority === "space") {
    score += car.seating_capacity * 2;
  }

  return { score: Math.round(score), reasons };
}
// Recommendation API endpoint

app.post('/recommendations', async (req, res) => {
    try {
        const userPreferences = req.body;
        console.log('Received user preferences:', userPreferences);

        //  store user preferences in Firestore
        const userPrefRef = await db.collection('user_preferences').add(userPreferences);

        // Fetch all the cars from Firestore
        const carsSnapshot = await db.collection('cars').get();

        let results = [];

        carsSnapshot.forEach(doc => {
            const carData = {id: doc.id, ...doc.data()};
            // Calculate the score for each car based on user preferences
            const {score, reasons} = scoreCar(carData, userPreferences);
            results.push({car: carData, score, reasons});
        })

        // Sort results by score in descending order
        results.sort((a, b) => b.score - a.score);
        const topcars = results.slice(0, 5); // Get top 5 recommendations

        // store recommendations in Firestore
        for (let car of topcars) {
            await db.collection('recommendations').add({
                userPrefId: userPrefRef.id,
                carId: car.car.id,
                score: car.score,
                reasons: car.reasons,
                timestamp: new Date()
            });
        }

        res.json(topcars);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({error: error.message});
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

