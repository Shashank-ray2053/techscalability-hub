
// Knowledge base for the AI chat system
// This data is loaded from a JSON file for easier updates

export type KnowledgeCategory = 'general' | 'services' | 'pricing' | 'support' | 'technical';

export interface KnowledgeItem {
  keywords: string[];
  response: string;
  category: KnowledgeCategory;
}

// Import knowledge base from JSON file
import knowledgeBaseData from '../data/knowledgeBase.json';
export const knowledgeBase: KnowledgeItem[] = knowledgeBaseData.knowledgeBase;

// Load knowledge base from localStorage if available
const getActiveKnowledgeBase = (): KnowledgeItem[] => {
  const savedKnowledgeBase = localStorage.getItem('chatKnowledgeBase');
  if (savedKnowledgeBase) {
    try {
      return JSON.parse(savedKnowledgeBase);
    } catch (error) {
      console.error("Error parsing saved knowledge base:", error);
      return knowledgeBase;
    }
  }
  return knowledgeBase;
};

export const findBestResponse = (userMessage: string): string => {
  // Get the active knowledge base (default or customized)
  const activeKnowledgeBase = getActiveKnowledgeBase();
  
  // Convert user message to lowercase for case-insensitive matching
  const lowercaseMessage = userMessage.toLowerCase();
  
  // If message is very short, less than 2 words, use generic response
  if (lowercaseMessage.split(' ').filter(word => word.length > 0).length < 2) {
    // Check for direct matches with simple greetings
    const greetings = activeKnowledgeBase.find(item => 
      item.category === 'general' && 
      item.keywords.some(keyword => lowercaseMessage.includes(keyword))
    );
    
    return greetings ? greetings.response : "Could you please provide more details about what you're looking for?";
  }
  
  // Calculate relevance score for each knowledge item
  const scoredResponses = activeKnowledgeBase.map(item => {
    let score = 0;
    
    // Calculate score based on keyword matches
    item.keywords.forEach(keyword => {
      if (lowercaseMessage.includes(keyword)) {
        // Exact matches get higher score
        score += lowercaseMessage === keyword ? 5 : 2;
        
        // Partial word matches get lower score (e.g. "security" would match "cybersecurity")
        if (lowercaseMessage.split(' ').some(word => word.includes(keyword) && word !== keyword)) {
          score += 1;
        }
      }
    });
    
    return { item, score };
  });
  
  // Sort by score in descending order
  scoredResponses.sort((a, b) => b.score - a.score);
  
  // If best score is 0, return a fallback response
  if (scoredResponses[0].score === 0) {
    return "I'm not sure I understand. Could you rephrase your question, or would you like to speak with one of our specialists?";
  }
  
  // Return the highest-scoring response
  return scoredResponses[0].item.response;
};

export const generateFallbackResponse = (): string => {
  const fallbacks = [
    "I'm not quite sure I understood that. Could you please rephrase your question?",
    "I'd like to help you better. Could you provide more details about your inquiry?",
    "I'm still learning, but I'd be happy to connect you with one of our human experts who can assist you further.",
    "That's a bit outside my current knowledge. Would you like me to arrange for a specialist to contact you?",
    "I want to make sure you get the best information. Would you like me to connect you with our support team?"
  ];
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
