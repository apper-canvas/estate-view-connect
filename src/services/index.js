import { propertyService } from './api/propertyService';
import { savedPropertyService } from './api/savedPropertyService';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export {
  propertyService,
  savedPropertyService,
  delay
};