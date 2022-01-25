import { ICoordinates } from "../types";

export const getIsWithinRange = (
  claimantCoordinates: ICoordinates,
  reportCoordinates: ICoordinates
): boolean => {
  const rangeRadius = 0.0008695277120173415;
  const deltaLat = reportCoordinates.lat - claimantCoordinates.lat;
  const deltaLng = reportCoordinates.lng - claimantCoordinates.lng;
  const squareLegLat = Math.pow(deltaLat, 2);
  const squareLegLng = Math.pow(deltaLng, 2);
  const hypotenuse = Math.sqrt(squareLegLat + squareLegLng);

  return hypotenuse <= rangeRadius;
};
