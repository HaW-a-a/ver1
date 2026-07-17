export interface CfdMetrics {
  mach: number;
  pressureRecovery: number;
  distortionIndex: number;
  swirlNumber: number;
  shockMargin: number;
  dragCoefficient: number;
}

export interface VerificationData {
  meshSize: number;
  convergenceError: number;
}

export interface LegacyComparison {
  parameter: string;
  legacyValue: number;
  cfdValue: number;
  error: number;
}

export interface ThermalMapping {
  positionX: number;
  temperature: number;
  heatTransferCoeff: number;
  pressure: number;
}
