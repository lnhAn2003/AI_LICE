import mongoose from "mongoose";
import GameShared, { IGameShared } from "../models/gameshared.model";
import User from "../models/user.model";
import { gamesharedUpload } from "../utils/awsS3";

class GameSharedService {
  public async createGameShared(
    gameData: Partial<IGameShared>,
    file: { buffer: Buffer; mimeType: string },
    images: { buffer: Buffer; mimeType: string }[]
  ): Promise<IGameShared> {
    const folder = `games/${gameData.title || Date.now()}`; // Use game title or timestamp as folder name

    const fileUrl = await gamesharedUpload(file.buffer, `${folder}/files`, `${gameData.title}_${Date.now()}`, file.mimeType);

    const imageUrls = await Promise.all(
      images.map((image, index) =>
        gamesharedUpload(image.buffer, `${folder}/images`, `image-${index + 1}.jpg`, image.mimeType)
      )
    );

    const gameShared = new GameShared({
      ...gameData,
      fileUrl,
      images: imageUrls,
    });

    const savedGame = await gameShared.save();

    await User.findByIdAndUpdate(gameData.uploadedBy, {
      $push: { gamesShared: savedGame._id },
    });

    return savedGame;
  }

  public async getAllGameShared(): Promise<IGameShared[]> {
    return await GameShared.find()
      .populate({ path: 'uploadedBy', select: 'username' })
      .populate({ path: 'categories', select: '_id name' });
  }

  public async getGameSharedById(id: string): Promise<IGameShared | null> {
    const game = await GameShared.findById(id)
      .populate([
        { path: 'uploadedBy', select: 'username' },
        { path: 'ratings.userId', select: 'username' },
        { path: 'categories', select: '_id name key'},
        { path: 'successVotes.userVotes.userId', select: 'username' },
        {
          path: 'comments',
          match: { isVisible: true, parentCommentId: null },
          options: { sort: { createdAt: -1 } },
          populate: [
            { path: 'authorId', select: 'username' },
            {
              path: 'replies',
              match: { isVisible: true },
              options: { sort: { createdAt: -1 } },
              populate: { path: 'authorId', select: 'username' },
            },
          ],
        },
      ]);

    return game;
  }

  public async updateGameShared(
    id: string,
    updateData: Partial<IGameShared>,
    file?: { buffer: Buffer; mimeType: string },
    images?: { buffer: Buffer; mimeType: string }[]
  ): Promise<IGameShared | null> {
    const game = await GameShared.findById(id);
    if (!game) {
      throw new Error('Game not found');
    }
  
    const folder = `games/${game.title || id}`;

    if (file) {
      const fileUrl = await gamesharedUpload(
        file.buffer,
        `${folder}/files`,
        `${game.title || 'game'}_${Date.now()}`,
        file.mimeType
      );
      updateData.fileUrl = fileUrl;
    }

    if (images && images.length > 0) {
      const imageUrls = await Promise.all(
        images.map((image, index) =>
          gamesharedUpload(image.buffer, `${folder}/images`, `image-${index + 1}.jpg`, image.mimeType)
        )
      );
      updateData.images = imageUrls;
    }

    return await GameShared.findByIdAndUpdate(id, updateData, { new: true });
  }
  

  public async deleteGameShared(id: string): Promise<IGameShared | null> {
    const game = await GameShared.findById(id);
    if (!game) return null;

    await User.findByIdAndUpdate(game.uploadedBy, {
      $pull: { gamesShared: game._id }
    });

    return await GameShared.findByIdAndDelete(id);
  }

  public async incrementViewCount(id: string): Promise<void> {
    await GameShared.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });
  }

  public async incrementDownloadCount(id: string): Promise<void> {
    await GameShared.findByIdAndUpdate(id, { $inc: { downloadCount: 1 } });
  }

  public async addRating(gameId: string, userId: string, ratingValue: number, comment: string): Promise<IGameShared> {
    const game = await GameShared.findById(gameId);
    if (!game) throw new Error('Game not found');

    // Find if the user has already rated the game
    const existingRatingIndex = game.ratings.findIndex(rating => rating.userId.toString() === userId);

    if (existingRatingIndex >= 0) {
      game.ratings[existingRatingIndex].rating = ratingValue;
      game.ratings[existingRatingIndex].comment = comment;
      game.ratings[existingRatingIndex].createdAt = new Date();
    } else {
      game.ratings.push({
        userId: new mongoose.Types.ObjectId(userId),
        rating: ratingValue,
        comment: comment,
        createdAt: new Date()
      });
      game.ratingCount += 1;
    }

    const totalRatingSum = game.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    game.averageRating = totalRatingSum / game.ratingCount;

    await game.save();
    return game;
  }

  public async addFavoriteToGame(gameId: string, userId: string): Promise<IGameShared | null> {
    const game = await GameShared.findByIdAndUpdate(
      gameId,
      { $addToSet: { favorites: new mongoose.Types.ObjectId(userId) } },
      { new: true }
    );
    return game;
  }

  public async addFavoriteToUser(userId: string, gameId: string): Promise<void> {
    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          favorites: {
            itemId: new mongoose.Types.ObjectId(gameId),
            itemType: 'GameShared'
          }
        }
      },
      { new: true }
    );
  }

  public async removeFavoriteFromGame(gameId: string, userId: string): Promise<IGameShared | null> {
    const game = await GameShared.findByIdAndUpdate(
      gameId,
      { $pull: { favorites: new mongoose.Types.ObjectId(userId) } },
      { new: true }
    );
    return game;
  }

  public async removeFavoriteFromUser(userId: string, gameId: string): Promise<void> {
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          favorites: {
            itemId: new mongoose.Types.ObjectId(gameId),
            itemType: 'GameShared'
          }
        }
      },
      { new: true }
    );
  }

  public async SuccessVote(gameId: string, userId: string, vote: 'like' | 'dislike'): Promise<IGameShared> {
    const game = await GameShared.findById(gameId);
    if (!game) throw new Error('Game not found');

    const existingVoteIndex = game.successVotes.userVotes.findIndex(v => v.userId.toString() === userId);

    if (existingVoteIndex >= 0) {
      const currentVote = game.successVotes.userVotes[existingVoteIndex].vote;

      if (currentVote === vote) {
        game.successVotes.userVotes.splice(existingVoteIndex, 1);
        if (vote === 'like') game.successVotes.likes--;
        else if (vote === 'dislike') game.successVotes.dislikes--;
      } else {
        game.successVotes.userVotes[existingVoteIndex].vote = vote;
        if (vote === 'like') {
          game.successVotes.likes++;
          game.successVotes.dislikes--;
        } else {
          game.successVotes.dislikes++;
          game.successVotes.likes--;
        }
      }
    } else {
      game.successVotes.userVotes.push({
        userId: new mongoose.Types.ObjectId(userId),
        vote
      });
      if (vote === 'like') game.successVotes.likes++;
      else if (vote === 'dislike') game.successVotes.dislikes++;
    }

    const totalVotes = game.successVotes.likes + game.successVotes.dislikes;
    game.successVotes.percentage = totalVotes > 0 ? (game.successVotes.likes / totalVotes) * 100 : 0;

    await game.save();
    return game;
  }

  public async addChangelogEntry(gameId: string, description: string): Promise<IGameShared | null> {
    const game = await GameShared.findById(gameId);
    if (!game) throw new Error('Game not found');

    const newEntry = {
      date: new Date(),
      description
    };

    game.changelog.push(newEntry);

    await game.save();
    return game;
  }

  public async searchGames(
    query: { title?: string; categories?: string[], tags?: string[]; minRating?: number; },
    page = 1,
    limit = 10,
    sortField: keyof IGameShared = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Promise<IGameShared[]> {
    const filter: any = {};

    if (query.title) {
      filter.title = new RegExp(query.title, 'i');
    }

    if (query.categories && query.categories.length > 0) {
      filter.categories = { $in: query.categories.slice(0, 5) };
    }

    if (query.tags && query.tags.length > 0) {
      filter.tags = { $all: query.tags };
    }

    if (query.minRating) {
      filter.averageRating = { $gte: query.minRating };
    }

    const games = await GameShared.find(filter)
      .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return games;
  }
}


export default new GameSharedService();