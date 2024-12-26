// services/ai.service.ts
import { OpenAI } from 'openai';
import AggregationService from './aggregation.service';
import GameShared from '../models/gameshared.model';
import dotenv from 'dotenv';

dotenv.config();

class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  public async interact(
    user: any,
    interactionType: string,
    request: string,
    sourceLanguage?: string,
    targetLanguage?: string
  ): Promise<string> {
    if (!user || !interactionType || !request) {
      throw new Error('Missing required parameters.');
    }

    const prompt = `
      Interaction type: ${interactionType}.
      Request: ${request}.
      ${sourceLanguage && targetLanguage ? `Translate from ${sourceLanguage} to ${targetLanguage}.` : ''}
    `;

    try {
      const aiResponse = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      });

      return aiResponse.choices[0]?.message?.content?.trim() || 'No response from AI';
    } catch (error: any) {
      console.error('Error interacting with AI:', error.message || error);
      throw new Error('Failed to process the AI request.');
    }
  }

  public async recommend(user: any): Promise<any> {
    try {
      const allData = await AggregationService.fetchAllData();
  
      const currentUser = allData.users.find((u: any) => u._id.toString() === user.id);
      if (!currentUser) {
        throw new Error('User not found');
      }
  
      const games = await GameShared.find()
      
        .populate('uploadedBy', 'username email')
        .populate('favorites', 'username email') 
        .populate('_id') 
        .lean();
  
      const prompt = `
        You are a recommendation assistant.
        Here is the data from the database: ${JSON.stringify({
          users: allData.users,
          games,
          threads: allData.threads,
          courses: allData.courses,
        })}.
        The current user is: ${JSON.stringify(currentUser)}.
        Based on this information, recommend games, threads, or courses that the user may enjoy.
        Return the recommendations as a JSON object.
      `;
  
      const aiResponse = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an AI-powered recommendation assistant.' },
          { role: 'user', content: prompt },
        ],
      });
  
      const recommendations = aiResponse.choices[0]?.message?.content?.trim() || '[]';
      return JSON.parse(recommendations);
    } catch (error: any) {
      console.error('Error generating recommendations:', error.message || error);
      throw new Error('Failed to generate recommendations');
    }
  }
  


}

export default new AIService();
