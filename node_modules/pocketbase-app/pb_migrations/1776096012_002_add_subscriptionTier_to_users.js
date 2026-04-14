/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");

  const existing = collection.fields.getByName("subscriptionTier");
  if (existing) {
    if (existing.type === "select") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("subscriptionTier"); // exists with wrong type, remove first
  }

  collection.fields.add(new SelectField({
    name: "subscriptionTier",
    values: ["free", "premium"]
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("users");
  collection.fields.removeByName("subscriptionTier");
  return app.save(collection);
})
