import AIInteraction, { IAIInteraction } from '../models/ai.model';

class AIInteractionService {
  public async createInteraction(interactionData: Partial<IAIInteraction>): Promise<IAIInteraction> {
    const interaction = new AIInteraction(interactionData);
    return await interaction.save();
  }

  public async getInteractionsByUser(userId: string): Promise<IAIInteraction[]> {
    return await AIInteraction.find({ userId })
      .sort({ createdAt: -1 });
  }

  public async getInteractionById(id: string): Promise<IAIInteraction | null> {
    return await AIInteraction.findById(id);
  }

  public async deleteInteraction(id: string): Promise<IAIInteraction | null> {
    return await AIInteraction.findByIdAndDelete(id);
  }
}

export default new AIInteractionService();
