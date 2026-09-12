/**
 * Item Response Theory (IRT) 3-Parameter Logistic (3PL) Psychometrics Engine
 * IELTS Theta Ability Calibration & Predictive Multivariate Psychometrics (Band 7.5 - 8.5+)
 */

export const D_CONSTANT = 1.702; // Scaling constant to map Logistic metric to Normal Ogive

export interface IRTItemParameters {
  id: string;
  itemNumber: number;
  skillSection: 'listening' | 'reading';
  passageOrSection: string;
  questionText: string;
  correctAnswer: string;
  a: number; // Item Discrimination (0.5 to 2.5) - khả năng phân loại thí sinh
  b: number; // Item Difficulty (-2.5 to +2.5) - ngưỡng độ khó
  c: number; // Pseudo-Guessing (0.0 for completion, 0.25 for 4-option MCQ) - xác suất đoán mò
  cognitiveDimension: 'verbatim_scan' | 'syntactic_inference' | 'epistemic_stance' | 'acoustic_compression';
}

export interface IRTStudentResponse {
  itemId: string;
  userAnswer: string;
  isCorrect: boolean;
  itemParams: IRTItemParameters;
}

export interface ThetaEstimationResult {
  theta: number; // -3.0 to +3.0
  standardError: number; // SE(theta)
  fisherInformation: number; // I(theta)
  predictedBand: number; // e.g. 7.5
  confidenceInterval95: {
    lowerTheta: number;
    upperTheta: number;
    lowerBand: number;
    upperBand: number;
  };
  probabilityOfPassingBand75: number; // 0 - 100%
  abilityPercentile: number; // 0 - 100
  convergenceIterations: number;
}

/**
 * 3-Parameter Logistic (3PL) Probability Formula
 * P_i(theta) = c_i + (1 - c_i) / (1 + exp(-D * a_i * (theta - b_i)))
 */
export function calculate3PLProbability(
  theta: number,
  a: number,
  b: number,
  c: number
): number {
  const exponent = -D_CONSTANT * a * (theta - b);
  // Prevent numerical overflow
  if (exponent > 40) return c;
  if (exponent < -40) return 1.0;
  
  const pStar = 1.0 / (1.0 + Math.exp(exponent));
  return c + (1.0 - c) * pStar;
}

/**
 * First derivative of 3PL probability with respect to theta: P_i'(theta)
 */
export function calculate3PLDerivative(
  theta: number,
  a: number,
  b: number,
  c: number
): number {
  const exponent = -D_CONSTANT * a * (theta - b);
  if (Math.abs(exponent) > 40) return 0;
  
  const pStar = 1.0 / (1.0 + Math.exp(exponent));
  return (1.0 - c) * D_CONSTANT * a * pStar * (1.0 - pStar);
}

/**
 * Fisher Information for a single item: I_i(theta)
 * I_i(theta) = D^2 * a_i^2 * ((P_i(theta) - c_i)^2 / (1 - c_i)^2) * ((1 - P_i(theta)) / P_i(theta))
 */
export function calculateItemInformation(
  theta: number,
  a: number,
  b: number,
  c: number
): number {
  const p = calculate3PLProbability(theta, a, b, c);
  if (p <= 0 || p >= 1 || p <= c) return 0;
  
  const pDiff = p - c;
  const cCompl = 1.0 - c;
  const num = D_CONSTANT * D_CONSTANT * a * a * (pDiff * pDiff) * (1.0 - p);
  const den = (cCompl * cCompl) * p;
  
  return Math.max(0, num / den);
}

/**
 * Converts a continuous Theta value (-3.0 to +3.0) into an IELTS Band Score (4.0 to 9.0)
 */
export function thetaToIELTSBand(theta: number): {
  band: number;
  exactScore: number;
} {
  // Calibration mapping:
  // theta = -2.5 -> Band 4.0
  // theta = -1.5 -> Band 5.0
  // theta = -0.5 -> Band 6.0
  // theta = +0.5 -> Band 7.0
  // theta = +1.3 -> Band 7.5
  // theta = +2.0 -> Band 8.0
  // theta = +2.8 -> Band 8.5-9.0
  
  const clampedTheta = Math.max(-3.0, Math.min(3.0, theta));
  let exactScore = 6.5 + clampedTheta * 0.9;
  exactScore = Math.max(4.0, Math.min(9.0, exactScore));
  
  // Standard IELTS 0.5 rounding rule
  const band = Math.round(exactScore * 2) / 2;
  
  return {
    band: Math.min(9.0, Math.max(4.0, band)),
    exactScore: Number(exactScore.toFixed(2))
  };
}

/**
 * Converts IELTS Band Score to Theta equivalent
 */
export function ieltsBandToTheta(band: number): number {
  return (band - 6.5) / 0.9;
}

/**
 * Maximum Likelihood Estimation (MLE) of Theta with Newton-Raphson Iteration
 */
export function estimateThetaMLE(
  responses: Array<{ isCorrect: boolean; a: number; b: number; c: number }>
): ThetaEstimationResult {
  if (responses.length === 0) {
    return {
      theta: 0.0,
      standardError: 1.0,
      fisherInformation: 1.0,
      predictedBand: 6.5,
      confidenceInterval95: {
        lowerTheta: -1.96,
        upperTheta: 1.96,
        lowerBand: 5.0,
        upperBand: 8.0
      },
      probabilityOfPassingBand75: 50,
      abilityPercentile: 50,
      convergenceIterations: 0
    };
  }

  // Initial theta prior
  let theta = 0.0;
  const correctCount = responses.filter((r) => r.isCorrect).length;
  const rawRatio = correctCount / responses.length;
  
  if (rawRatio === 1) theta = 2.4;
  else if (rawRatio === 0) theta = -2.4;
  else theta = Math.log(rawRatio / (1 - rawRatio)) * 0.8;

  const maxIterations = 25;
  const tolerance = 0.001;
  let iterations = 0;

  for (let iter = 0; iter < maxIterations; iter++) {
    iterations++;
    let scoreDerivative = 0; // L'(theta)
    let totalInformation = 0; // I(theta) ~ -L''(theta)

    for (const r of responses) {
      const p = calculate3PLProbability(theta, r.a, r.b, r.c);
      const pPrime = calculate3PLDerivative(theta, r.a, r.b, r.c);
      const info = calculateItemInformation(theta, r.a, r.b, r.c);

      totalInformation += info;

      if (p > 0 && p < 1) {
        const u = r.isCorrect ? 1.0 : 0.0;
        scoreDerivative += ((u - p) / (p * (1.0 - p))) * pPrime;
      }
    }

    if (totalInformation <= 0.0001) break;

    const delta = scoreDerivative / totalInformation;
    theta = theta + delta;

    // Constrain theta to valid standard scale
    theta = Math.max(-3.2, Math.min(3.2, theta));

    if (Math.abs(delta) < tolerance) {
      break;
    }
  }

  // Calculate final Fisher Information and Standard Error at converged theta
  let finalInfo = 0;
  for (const r of responses) {
    finalInfo += calculateItemInformation(theta, r.a, r.b, r.c);
  }
  finalInfo = Math.max(0.1, finalInfo);
  const standardError = Number((1.0 / Math.sqrt(finalInfo)).toFixed(3));

  const lowerTheta = Number((theta - 1.96 * standardError).toFixed(2));
  const upperTheta = Number((theta + 1.96 * standardError).toFixed(2));

  const bandResult = thetaToIELTSBand(theta);
  const lowerBandResult = thetaToIELTSBand(lowerTheta);
  const upperBandResult = thetaToIELTSBand(upperTheta);

  // Normal Cumulative Distribution Function for Band 7.5 (theta target ~ 1.1)
  const zScore75 = (theta - 1.1) / standardError;
  const probPass75 = Math.round(normalCDF(zScore75) * 100);

  // Percentile in global candidate population
  const abilityPercentile = Math.round(normalCDF(theta / 1.0) * 100);

  return {
    theta: Number(theta.toFixed(2)),
    standardError,
    fisherInformation: Number(finalInfo.toFixed(2)),
    predictedBand: bandResult.band,
    confidenceInterval95: {
      lowerTheta,
      upperTheta,
      lowerBand: lowerBandResult.band,
      upperBand: upperBandResult.band
    },
    probabilityOfPassingBand75: probPass75,
    abilityPercentile,
    convergenceIterations: iterations
  };
}

/**
 * Standard Normal Cumulative Distribution Function approximation (Abramowitz & Stegun)
 */
export function normalCDF(z: number): number {
  if (z < -6) return 0;
  if (z > 6) return 1;

  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const p = 0.2316419;
  const c = 0.39894228;

  if (z >= 0) {
    const t = 1.0 / (1.0 + p * z);
    return 1.0 - c * Math.exp(-z * z / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
  } else {
    const t = 1.0 / (1.0 - p * z);
    return c * Math.exp(-z * z / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
  }
}
