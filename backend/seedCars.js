const { db } = require('./firebase');

const carsData = [
    {
        make: "BMW",
        model: "S1",
        variant: "330i",
        body_type: "Sedan",
        price: 24555545,
        mileage: 12,
        safety_rating: 5,
        seating_capacity: 4,
        engine_cc: 2000,
        transmission: "manual",
        features: ["sunroof", "touchscreen"],
        fueltype: "petrol"
    },
    {
        make: "Mercedes",
        model: "C-Class",
        variant: "C300",
        body_type: "Sedan",
        price: 28500000,
        mileage: 10,
        safety_rating: 5,
        seating_capacity: 5,
        engine_cc: 2000,
        transmission: "automatic",
        features: ["sunroof", "leather seats", "touchscreen"],
        fueltype: "petrol"
    },
    {
        make: "Audi",
        model: "A4",
        variant: "35 TDI",
        body_type: "Sedan",
        price: 26700000,
        mileage: 15,
        safety_rating: 5,
        seating_capacity: 5,
        engine_cc: 1968,
        transmission: "automatic",
        features: ["sunroof", "touchscreen", "navigation"],
        fueltype: "diesel"
    },
    {
        make: "Tesla",
        model: "Model 3",
        variant: "Long Range",
        body_type: "Sedan",
        price: 31000000,
        mileage: 0,
        safety_rating: 5,
        seating_capacity: 5,
        engine_cc: 0,
        transmission: "automatic",
        features: ["autopilot", "touchscreen", "supercharger"],
        fueltype: "electric"
    },
    {
        make: "Honda",
        model: "Civic",
        variant: "V",
        body_type: "Sedan",
        price: 15000000,
        mileage: 18,
        safety_rating: 4,
        seating_capacity: 5,
        engine_cc: 1500,
        transmission: "manual",
        features: ["touchscreen", "backup camera"],
        fueltype: "petrol"
    },
    {
        make: "Toyota",
        model: "Camry",
        variant: "LE",
        body_type: "Sedan",
        price: 16500000,
        mileage: 16,
        safety_rating: 5,
        seating_capacity: 5,
        engine_cc: 1800,
        transmission: "automatic",
        features: ["touchscreen", "cruise control"],
        fueltype: "petrol"
    },
    {
        make: "Ford",
        model: "Mustang",
        variant: "GT",
        body_type: "Coupe",
        price: 35000000,
        mileage: 12,
        safety_rating: 4,
        seating_capacity: 4,
        engine_cc: 5000,
        transmission: "automatic",
        features: ["sunroof", "touchscreen", "performance exhaust"],
        fueltype: "petrol"
    },
    {
        make: "Hyundai",
        model: "Elantra",
        variant: "SE",
        body_type: "Sedan",
        price: 11000000,
        mileage: 20,
        safety_rating: 4,
        seating_capacity: 5,
        engine_cc: 1600,
        transmission: "manual",
        features: ["touchscreen"],
        fueltype: "petrol"
    },
    {
        make: "Mazda",
        model: "CX-5",
        variant: "Touring",
        body_type: "SUV",
        price: 18500000,
        mileage: 18,
        safety_rating: 5,
        seating_capacity: 5,
        engine_cc: 2000,
        transmission: "automatic",
        features: ["touchscreen", "all-wheel drive", "roof rails"],
        fueltype: "petrol"
    },
    {
        make: "Nissan",
        model: "Altima",
        variant: "S",
        body_type: "Sedan",
        price: 14500000,
        mileage: 17,
        safety_rating: 4,
        seating_capacity: 5,
        engine_cc: 1600,
        transmission: "manual",
        features: ["touchscreen", "backup camera"],
        fueltype: "petrol"
    },
    {
        make: "Volvo",
        model: "XC60",
        variant: "T5",
        body_type: "SUV",
        price: 32000000,
        mileage: 12,
        safety_rating: 5,
        seating_capacity: 5,
        engine_cc: 1969,
        transmission: "automatic",
        features: ["sunroof", "touchscreen", "leather seats"],
        fueltype: "petrol"
    },
    {
        make: "Chevrolet",
        model: "Malibu",
        variant: "LT",
        body_type: "Sedan",
        price: 13000000,
        mileage: 19,
        safety_rating: 4,
        seating_capacity: 5,
        engine_cc: 1500,
        transmission: "automatic",
        features: ["touchscreen"],
        fueltype: "petrol"
    },
    {
        make: "Volkswagen",
        model: "Jetta",
        variant: "S",
        body_type: "Sedan",
        price: 12000000,
        mileage: 18,
        safety_rating: 4,
        seating_capacity: 5,
        engine_cc: 1400,
        transmission: "manual",
        features: ["touchscreen"],
        fueltype: "petrol"
    },
    {
        make: "Kia",
        model: "Seltos",
        variant: "EX",
        body_type: "SUV",
        price: 15500000,
        mileage: 19,
        safety_rating: 4,
        seating_capacity: 5,
        engine_cc: 1600,
        transmission: "automatic",
        features: ["touchscreen", "backup camera"],
        fueltype: "petrol"
    },
    {
        make: "Subaru",
        model: "Outback",
        variant: "2.5i",
        body_type: "Wagon",
        price: 19500000,
        mileage: 17,
        safety_rating: 5,
        seating_capacity: 5,
        engine_cc: 2500,
        transmission: "automatic",
        features: ["all-wheel drive", "touchscreen", "roof rails"],
        fueltype: "petrol"
    },
    {
        make: "Lexus",
        model: "RX",
        variant: "350",
        body_type: "SUV",
        price: 38000000,
        mileage: 14,
        safety_rating: 5,
        seating_capacity: 7,
        engine_cc: 3500,
        transmission: "automatic",
        features: ["sunroof", "touchscreen", "leather seats", "navigation"],
        fueltype: "petrol"
    },
    {
        make: "Porsche",
        model: "911",
        variant: "Carrera",
        body_type: "Coupe",
        price: 65000000,
        mileage: 10,
        safety_rating: 5,
        seating_capacity: 4,
        engine_cc: 3000,
        transmission: "automatic",
        features: ["sunroof", "touchscreen", "performance system"],
        fueltype: "petrol"
    },
    {
        make: "Jaguar",
        model: "XE",
        variant: "S",
        body_type: "Sedan",
        price: 30000000,
        mileage: 12,
        safety_rating: 5,
        seating_capacity: 5,
        engine_cc: 1997,
        transmission: "automatic",
        features: ["sunroof", "touchscreen", "leather seats"],
        fueltype: "petrol"
    },
    {
        make: "Infiniti",
        model: "Q50",
        variant: "3.0t",
        body_type: "Sedan",
        price: 27000000,
        mileage: 13,
        safety_rating: 5,
        seating_capacity: 5,
        engine_cc: 3000,
        transmission: "automatic",
        features: ["sunroof", "touchscreen", "navigation"],
        fueltype: "petrol"
    },
    {
        make: "Skoda",
        model: "Superb",
        variant: "1.4 TSI",
        body_type: "Sedan",
        price: 18000000,
        mileage: 15,
        safety_rating: 4,
        seating_capacity: 5,
        engine_cc: 1400,
        transmission: "automatic",
        features: ["touchscreen", "navigation"],
        fueltype: "petrol"
    }
];

async function seedCars() {
    try {
        const batch = db.batch();
        
        carsData.forEach((car) => {
            const docRef = db.collection('cars').doc();
            batch.set(docRef, car);
        });
        
        await batch.commit();
        console.log('✅ Successfully added 20 cars to the database!');
    } catch (error) {
        console.error('❌ Error adding cars:', error);
    }
}

seedCars();
