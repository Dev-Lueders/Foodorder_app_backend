const resolveReferenceIDs = require("../utils/resolveID");

(async () => {
  const mockBody = {
    restaurantId: "abc-restaurant",
    categoryId: "pizza-category",
    cuisineId: "italian-cuisine"
  };

  const resolved = await resolveReferenceIDs(mockBody);
  console.log("Resolved Body:", resolved);
})();