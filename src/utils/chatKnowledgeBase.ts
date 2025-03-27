
// Knowledge base for the AI chat system
// This can be expanded with more data or connected to an external API in the future

type KnowledgeCategory = 'general' | 'services' | 'pricing' | 'support' | 'technical';

interface KnowledgeItem {
  keywords: string[];
  response: string;
  category: KnowledgeCategory;
}

export const knowledgeBase: KnowledgeItem[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    response: "Hello! Welcome to TechXplore. How can I assist you today with your IT needs?",
    category: 'general'
  },
  {
    keywords: ['services', 'offer', 'solutions', 'provide'],
    response: "We offer a range of IT services including Cloud Solutions, Cybersecurity, Network Infrastructure, and Software Development. Would you like more details about any specific service?",
    category: 'services'
  },
  {
    keywords: ['cloud', 'aws', 'azure', 'hosting'],
    response: "Our Cloud Solutions include AWS and Azure deployment, cloud migration, optimization, and managed cloud services. We can help reduce costs while improving scalability and reliability.",
    category: 'services'
  },
  {
    keywords: ['security', 'cybersecurity', 'protection', 'secure'],
    response: "Our Cybersecurity services include vulnerability assessments, penetration testing, security monitoring, and incident response. We help protect your business from evolving threats.",
    category: 'services'
  },
  {
    keywords: ['network', 'infrastructure', 'setup', 'hardware'],
    response: "We provide comprehensive Network Infrastructure services including design, implementation, maintenance, and optimization for businesses of all sizes.",
    category: 'services'
  },
  {
    keywords: ['software', 'development', 'app', 'application', 'custom'],
    response: "Our Software Development team builds custom applications, enterprise solutions, mobile apps, and web platforms tailored to your specific business requirements.",
    category: 'services'
  },
  {
    keywords: ['price', 'cost', 'pricing', 'quote', 'expensive'],
    response: "Our pricing varies based on the specific services required. We offer flexible plans to accommodate businesses of all sizes. Would you like to schedule a consultation for a personalized quote?",
    category: 'pricing'
  },
  {
    keywords: ['contact', 'talk', 'human', 'agent', 'person', 'representative', 'support', 'help'],
    response: "I'd be happy to connect you with one of our technical specialists. Could you please provide your name and email so our team can reach out to you?",
    category: 'support'
  },
  {
    keywords: ['schedule', 'appointment', 'meeting', 'book', 'consultation'],
    response: "I can help you schedule a meeting with our team. What day and time works best for you? Our availability is typically Monday to Friday, 9 AM to 5 PM Eastern Time.",
    category: 'support'
  },
  {
    keywords: ['technical', 'problem', 'issue', 'error', 'not working', 'broken', 'help'],
    response: "I understand you're experiencing a technical issue. Could you provide more details about the problem? For urgent matters, you might want to speak directly with our support team.",
    category: 'technical'
  },
  {
    keywords: ['brochure', 'information', 'details', 'document', 'download'],
    response: "You can download our comprehensive brochure with detailed information about all our services here: [Download Brochure](/TechXplore-Brochure.pdf)",
    category: 'general'
  }
];

export const findBestResponse = (userMessage: string): string => {
  // Convert user message to lowercase for case-insensitive matching
  const lowercaseMessage = userMessage.toLowerCase();
  
  // If message is very short, less than 2 words, use generic response
  if (lowercaseMessage.split(' ').filter(word => word.length > 0).length < 2) {
    // Check for direct matches with simple greetings
    const greetings = knowledgeBase.find(item => 
      item.category === 'general' && 
      item.keywords.some(keyword => lowercaseMessage.includes(keyword))
    );
    
    return greetings ? greetings.response : "Could you please provide more details about what you're looking for?";
  }
  
  // Calculate relevance score for each knowledge item
  const scoredResponses = knowledgeBase.map(item => {
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
