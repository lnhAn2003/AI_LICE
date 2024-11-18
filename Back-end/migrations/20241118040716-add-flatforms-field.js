// migrations/<timestamp>-add-flatforms-field.js
module.exports = {
  async up(db) {
    // Add the 'flatforms' field with a default value
    await db.collection('gamesshareds').updateMany(
      { flatforms: { $exists: false } },
      { $set: { flatforms: ["PC"] } }
    );
  },

  async down(db) {
    // Remove the 'flatforms' field if needed
    await db.collection('gamesshareds').updateMany(
      {},
      { $unset: { flatforms: "" } }
    );
  }
};
