
import { knowledgeBase as initialKnowledgeBase, KnowledgeItem } from './chatKnowledgeBase';

// Function to load knowledge base from localStorage or use default
export const loadKnowledgeBase = (): KnowledgeItem[] => {
  const savedKnowledgeBase = localStorage.getItem('chatKnowledgeBase');
  
  if (savedKnowledgeBase) {
    try {
      return JSON.parse(savedKnowledgeBase);
    } catch (error) {
      console.error("Error parsing saved knowledge base:", error);
      return initialKnowledgeBase;
    }
  }
  
  return initialKnowledgeBase;
};

// Function to save knowledge base to localStorage
export const saveKnowledgeBase = (knowledgeBase: KnowledgeItem[]): void => {
  localStorage.setItem('chatKnowledgeBase', JSON.stringify(knowledgeBase));
};

// Function to add a new item to the knowledge base
export const addKnowledgeItem = (item: Omit<KnowledgeItem, 'keywords'> & { keywords: string }): KnowledgeItem[] => {
  const knowledgeBase = loadKnowledgeBase();
  
  const newItem: KnowledgeItem = {
    ...item,
    keywords: item.keywords.split(',').map(k => k.trim().toLowerCase()),
  };
  
  const updatedKnowledgeBase = [...knowledgeBase, newItem];
  saveKnowledgeBase(updatedKnowledgeBase);
  
  return updatedKnowledgeBase;
};

// Function to update an existing item in the knowledge base
export const updateKnowledgeItem = (index: number, item: Omit<KnowledgeItem, 'keywords'> & { keywords: string }): KnowledgeItem[] => {
  const knowledgeBase = loadKnowledgeBase();
  
  if (index < 0 || index >= knowledgeBase.length) {
    throw new Error("Knowledge item index out of bounds");
  }
  
  const updatedItem: KnowledgeItem = {
    ...item,
    keywords: item.keywords.split(',').map(k => k.trim().toLowerCase()),
  };
  
  const updatedKnowledgeBase = [...knowledgeBase];
  updatedKnowledgeBase[index] = updatedItem;
  
  saveKnowledgeBase(updatedKnowledgeBase);
  
  return updatedKnowledgeBase;
};

// Function to delete an item from the knowledge base
export const deleteKnowledgeItem = (index: number): KnowledgeItem[] => {
  const knowledgeBase = loadKnowledgeBase();
  
  if (index < 0 || index >= knowledgeBase.length) {
    throw new Error("Knowledge item index out of bounds");
  }
  
  const updatedKnowledgeBase = knowledgeBase.filter((_, i) => i !== index);
  saveKnowledgeBase(updatedKnowledgeBase);
  
  return updatedKnowledgeBase;
};

// Function to reset knowledge base to initial values
export const resetKnowledgeBase = (): KnowledgeItem[] => {
  saveKnowledgeBase(initialKnowledgeBase);
  return initialKnowledgeBase;
};
