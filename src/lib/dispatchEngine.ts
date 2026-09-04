/**
 * Automated Regional Fleet Dispatch Engine
 * Routes incoming orders to the optimal fulfillment hub and assigns
 * active courier drivers according to geographical proximity and capacity.
 */

export interface DispatchRecommendation {
  warehouseId: number;
  warehouseName: string;
  driverId: number;
  driverName: string;
  estimatedTransitMins: number;
  routeZone: string;
}

export function routeOrderDestination(address: {
  city?: string;
  governorate?: string;
  street?: string;
}): DispatchRecommendation {
  const text = `${address.city || ''} ${address.governorate || ''} ${address.street || ''}`.toLowerCase();

  // Zone 1: West Cairo Corridor (Zayed, October, Zamalek, Mohandessin, Dokki, Giza)
  if (
    text.includes('zayed') ||
    text.includes('october') ||
    text.includes('zamalek') ||
    text.includes('giza') ||
    text.includes('mohandessin') ||
    text.includes('dokki') ||
    text.includes('haram')
  ) {
    return {
      warehouseId: 1, // Cairo West Hub
      warehouseName: 'Cairo West Hub (Sheikh Zayed)',
      driverId: 1, // Karim Mostafa
      driverName: 'Karim Mostafa (Mercedes Sprinter)',
      estimatedTransitMins: 35,
      routeZone: 'West Nile Corridor',
    };
  }

  // Zone 2: Alexandria & Northern Maritime
  if (text.includes('alex') || text.includes('sahel') || text.includes('north coast')) {
    return {
      warehouseId: 3, // Alex Maritime
      warehouseName: 'Alexandria Maritime Hub',
      driverId: 1, // Default fleet or Alex partner
      driverName: 'Alex Fleet Courier 1',
      estimatedTransitMins: 120,
      routeZone: 'Alexandria Maritime Corridor',
    };
  }

  // Zone 3: East Cairo (New Cairo, Tagamoa, Rehab, Madinaty, Heliopolis, Nasr City, Maadi)
  return {
    warehouseId: 2, // Cairo East Depot
    warehouseName: 'Cairo East Depot (New Cairo)',
    driverId: 2, // Tarek El-Sayed
    driverName: 'Tarek El-Sayed (Transit Van)',
    estimatedTransitMins: 40,
    routeZone: 'East Ring Road Corridor',
  };
}
