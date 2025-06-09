import propertyData from '../mockData/properties.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
  async getAll() {
    await delay(300);
    return [...propertyData];
  },

  async getById(id) {
    await delay(250);
    const property = propertyData.find(p => p.id === id);
    if (!property) {
      throw new Error('Property not found');
    }
    return { ...property };
  },

  async create(property) {
    await delay(400);
    const newProperty = {
      ...property,
      id: Date.now().toString(),
      listingDate: new Date().toISOString()
    };
    return { ...newProperty };
  },

  async update(id, data) {
    await delay(350);
    const property = propertyData.find(p => p.id === id);
    if (!property) {
      throw new Error('Property not found');
    }
    const updated = { ...property, ...data };
    return { ...updated };
  },

  async delete(id) {
    await delay(300);
    const property = propertyData.find(p => p.id === id);
    if (!property) {
      throw new Error('Property not found');
    }
    return { success: true };
  }
};