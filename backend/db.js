const mongoose = require("mongoose");
const mongoURI =
  "mongodb://adityarns21:aditya21@ac-rz6gnt3-shard-00-00.jyezo33.mongodb.net:27017,ac-rz6gnt3-shard-00-01.jyezo33.mongodb.net:27017,ac-rz6gnt3-shard-00-02.jyezo33.mongodb.net:27017/goFoodmern?ssl=true&replicaSet=atlas-hnquko-shard-0&authSource=admin&retryWrites=true&w=majority";

module.exports = function (callback) {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
      console.log("Connected to MongoDB");

      const foodCollection = await mongoose.connection.db.collection(
        "food_items"
      );
      const categoryCollection = await mongoose.connection.db.collection(
        "food_category"
      );

      const foodItems = await foodCollection.find({}).toArray();
      const categories = await categoryCollection.find({}).toArray();

      // console.log("Food Items:", foodItems);
      // console.log("Categories:", categories);

      callback(null, foodItems, categories);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      callback(err);
    });
};
