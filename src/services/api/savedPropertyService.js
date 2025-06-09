import savedPropertyData from '../mockData/savedProperties.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let savedProperties = [...savedPropertyData];

export const savedPropertyService = {
  async getAll() {
    await delay(200);
    return [...savedProperties];
  },

  async getById(id) {
    await delay(150);
    const saved = savedProperties.find(s => s.propertyId === id);
    if (!saved) {
      throw new Error('Saved property not found');
    }
    return { ...saved };
  },

  async create(savedProperty) {
    await delay(300);
    const newSaved = {
      ...savedProperty,
      id: Date.now().toString()
    };
    savedProperties = [...savedProperties, newSaved];
    return { ...newSaved };
  },

  async update(id, data) {
    await delay(250);
    const index = savedProperties.findIndex(s => s.propertyId === id);
    if (index === -1) {
      throw new Error('Saved property not found');
    }
    savedProperties[index] = { ...savedProperties[index], ...data };
    return { ...savedProperties[index] };
  },

  async delete(propertyId) {
    await delay(200);
    const index = savedProperties.findIndex(s => s.propertyId === propertyId);
    if (index === -1) {
      throw new Error('Saved property not found');
    }
    savedProperties = savedProperties.filter(s => s.propertyId !== propertyId);
    return { success: true };
  }
};