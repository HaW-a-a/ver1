import { CfdMetrics, VerificationData, LegacyComparison, ThermalMapping } from './types';

export const mockCfdMetrics: CfdMetrics[] = [
  { mach: 1.5, pressureRecovery: 0.92, distortionIndex: 0.05, swirlNumber: 0.42, shockMargin: 15, dragCoefficient: 0.015 },
  { mach: 2.0, pressureRecovery: 0.89, distortionIndex: 0.06, swirlNumber: 0.45, shockMargin: 12, dragCoefficient: 0.018 },
  { mach: 2.5, pressureRecovery: 0.85, distortionIndex: 0.08, swirlNumber: 0.48, shockMargin: 8, dragCoefficient: 0.022 },
  { mach: 3.0, pressureRecovery: 0.81, distortionIndex: 0.09, swirlNumber: 0.52, shockMargin: 5, dragCoefficient: 0.028 },
  { mach: 3.5, pressureRecovery: 0.78, distortionIndex: 0.11, swirlNumber: 0.55, shockMargin: 2, dragCoefficient: 0.035 },
];

export const mockVerification: VerificationData[] = [
  { meshSize: 1e6, convergenceError: 0.12 },
  { meshSize: 2e6, convergenceError: 0.08 },
  { meshSize: 4e6, convergenceError: 0.04 },
  { meshSize: 8e6, convergenceError: 0.02 },
  { meshSize: 16e6, convergenceError: 0.015 },
];

export const mockLegacyComparison: LegacyComparison[] = [
  { parameter: 'Thrust (N)', legacyValue: 4500, cfdValue: 4580, error: 1.78 },
  { parameter: 'ISP (s)', legacyValue: 245, cfdValue: 242, error: 1.22 },
  { parameter: 'Peak Temp (K)', legacyValue: 2800, cfdValue: 2890, error: 3.21 },
  { parameter: 'Mass Flow (kg/s)', legacyValue: 12.5, cfdValue: 12.8, error: 2.4 },
];

export const mockThermalMapping: ThermalMapping[] = Array.from({ length: 20 }, (_, i) => ({
  positionX: i * 0.1,
  temperature: 1500 + Math.sin(i * 0.5) * 500,
  heatTransferCoeff: 250 + i * 10,
  pressure: 50 - i * 2,
}));
