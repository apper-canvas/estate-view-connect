import Home from '../pages/Home';
import PropertyDetail from '../pages/PropertyDetail';
import MapView from '../pages/MapView';
import SavedProperties from '../pages/SavedProperties';

export const routes = {
  browse: {
    id: 'browse',
    label: 'Browse',
    path: '/browse',
    icon: 'Grid3X3',
    component: Home
  },
  map: {
    id: 'map',
    label: 'Map View',
    path: '/map',
    icon: 'Map',
    component: MapView
  },
  saved: {
    id: 'saved',
    label: 'Saved Properties',
    path: '/saved',
    icon: 'Heart',
    component: SavedProperties
  }
};

export const routeArray = Object.values(routes);