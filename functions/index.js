const { onRequest } = require("firebase-functions/https");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Score calculation function
function scoreCar(car, preferences) {
  let score = 0;
  const reasons = [];

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
    score -= 10;
  }

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

  if (preferences.fuelPreference === car.fueltype) {
    score += 10;
    reasons.push(`Matches your ${car.fueltype} preference`);
  }

  if (preferences.transmission) {
    if (car.transmission === preferences.transmission) {
      score += 8;
      reasons.push("Matches your transmission preference");
    }
  }

  if (preferences.features?.length) {
    const matchedFeatures = preferences.features.filter((f) =>
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

  if (
    preferences.mattersMost === "mileage" ||
    preferences.prioritize === "mileage"
  ) {
    score += car.mileage;
  }

  if (
    preferences.prioritize === "performance" ||
    preferences.balancePreference === "performance_focused"
  ) {
    score += car.engine_cc / 100;
  }

  if (preferences.priority === "comfort") {
    score += 5;
  }

  if (preferences.priority === "space") {
    score += car.seating_capacity * 2;
  }

  return { score: Math.round(score), reasons };
}

// Recommendations endpoint
app.post("/recommendations", async (req, res) => {
  try {
    const userPreferences = req.body;

    const userPrefRef = await db
      .collection("user_preferences")
      .add(userPreferences);

    const carsSnapshot = await db.collection("cars").get();

    let results = [];

    carsSnapshot.forEach((doc) => {
      const carData = { id: doc.id, ...doc.data() };
      const { score, reasons } = scoreCar(carData, userPreferences);
      results.push({ car: carData, score, reasons });
    });

    results.sort((a, b) => b.score - a.score);
    const topcars = results.slice(0, 5);

    for (let car of topcars) {
      await db.collection("recommendations").add({
        userPrefId: userPrefRef.id,
        carId: car.car.id,
        score: car.score,
        reasons: car.reasons,
        timestamp: new Date(),
      });
    }

    res.json(topcars);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: error.message });
  }
});

exports.api = onRequest(app);
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
