module.exports = {
  async up(db, client) {
    console.log('Starting migration: Converting createdAt and updatedAt to timestamps');

    // Find all documents in the 'GameShared' collection
    const gamesCursor = db.collection('gamesshareds').find({});
    while (await gamesCursor.hasNext()) {
      const game = await gamesCursor.next();
      const updates = {};

      // Check if `createdAt` is a Date object and convert it to a timestamp
      if (game.createdAt instanceof Date) {
        updates.createdAt = game.createdAt.getTime();
      }

      // Check if `updatedAt` is a Date object and convert it to a timestamp
      if (game.updatedAt instanceof Date) {
        updates.updatedAt = game.updatedAt.getTime();
      }

      // Update the document if any changes are needed
      if (Object.keys(updates).length > 0) {
        await db.collection('gamesShared').updateOne(
          { _id: game._id },
          { $set: updates }
        );
        console.log(`Updated game ID: ${game._id}`);
      }
    }

    console.log('Migration completed: createdAt and updatedAt converted to timestamps');
  },

  async down(db, client) {
    console.log('Reverting migration: Converting timestamps back to Date objects');

    // Find all documents in the 'GameShared' collection
    const gamesCursor = db.collection('gamesshareds').find({});
    while (await gamesCursor.hasNext()) {
      const game = await gamesCursor.next();
      const updates = {};

      // Convert `createdAt` back to a Date object if it's a number
      if (typeof game.createdAt === 'number') {
        updates.createdAt = new Date(game.createdAt);
      }

      // Convert `updatedAt` back to a Date object if it's a number
      if (typeof game.updatedAt === 'number') {
        updates.updatedAt = new Date(game.updatedAt);
      }

      // Update the document if any changes are needed
      if (Object.keys(updates).length > 0) {
        await db.collection('gamesShared').updateOne(
          { _id: game._id },
          { $set: updates }
        );
        console.log(`Reverted game ID: ${game._id}`);
      }
    }

    console.log('Reversion completed: Timestamps converted back to Date objects');
  }
};
