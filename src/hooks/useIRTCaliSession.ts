'use client';

import { useState, useCallback, useMemo } from 'react';
import { db } from '@/lib/db';
import {
  IRTItemParameters,
  ThetaEstimationResult,
  calculate3PLProbability,
  estimateThetaMLE,
  thetaToIELTSBand
} from '@/lib/irtEngine';
import { MOCK_IRT_CALIBRATED_ITEMS } from '@/data/mockIRTCaliData';

export function useIRTCaliSession() {
  const [items] = useState<IRTItemParameters[]>(MOCK_IRT_CALIBRATED_ITEMS);
  const [selectedItemId, setSelectedItemId] = useState<string>(MOCK_IRT_CALIBRATED_ITEMS[3].id);
  
  // User answers map: itemId -> boolean (isCorrect)
  const [userResponses, setUserResponses] = useState<Record<string, boolean>>({
    'irt-l-01': true,
    'irt-l-02': true,
    'irt-l-03': true,
    'irt-l-04': true,
    'irt-l-05': false,
    'irt-l-06': false,
    'irt-r-01': true,
    'irt-r-02': true,
    'irt-r-03': true,
    'irt-r-04': true,
    'irt-r-05': false,
    'irt-r-06': false
  });

  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [isSavedToDB, setIsSavedToDB] = useState<boolean>(false);

  const selectedItem = useMemo<IRTItemParameters>(() => {
    return items.find((i) => i.id === selectedItemId) || items[0];
  }, [items, selectedItemId]);

  const toggleItemResponse = useCallback((itemId: string) => {
    setUserResponses((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  }, []);

  const setPresetCandidateLevel = useCallback((level: 'band_5_5' | 'band_7_0' | 'band_7_5' | 'band_8_5') => {
    const presetMap: Record<string, boolean> = {};

    items.forEach((item) => {
      if (level === 'band_5_5') {
        // Correct on easy items (b < -0.5)
        presetMap[item.id] = item.b < -0.5;
      } else if (level === 'band_7_0') {
        // Correct on easy & moderate items (b < 0.8)
        presetMap[item.id] = item.b < 0.8;
      } else if (level === 'band_7_5') {
        // Correct on b < 1.5
        presetMap[item.id] = item.b < 1.5;
      } else {
        // Band 8.5: almost all correct except extreme b > 2.2
        presetMap[item.id] = item.b < 2.2;
      }
    });

    setUserResponses(presetMap);
  }, [items]);

  // Real-time Theta Estimation using Newton-Raphson MLE
  const thetaResult = useMemo<ThetaEstimationResult>(() => {
    const responseArray = items.map((item) => ({
      isCorrect: !!userResponses[item.id],
      a: item.a,
      b: item.b,
      c: item.c
    }));

    return estimateThetaMLE(responseArray);
  }, [items, userResponses]);

  const saveCalibrationToDB = useCallback(async () => {
    try {
      await db.practice_logs.add({
        id: `irt-${Date.now()}`,
        type: 'irt_calibration',
        title: `IRT 3PL Psychometric Calibration: Theta = ${thetaResult.theta.toFixed(2)} (Band ${thetaResult.predictedBand})`,
        score: Math.round(thetaResult.predictedBand * 10),
        totalQuestions: items.length,
        durationSeconds: 120,
        timeSpentSeconds: 120,
        accuracyPercentage: Math.round((Object.values(userResponses).filter(Boolean).length / items.length) * 100),
        phase: 3,
        details: {
          theta: thetaResult.theta,
          standardError: thetaResult.standardError,
          fisherInformation: thetaResult.fisherInformation,
          predictedBand: thetaResult.predictedBand,
          confidenceInterval95: thetaResult.confidenceInterval95,
          probabilityOfPassingBand75: thetaResult.probabilityOfPassingBand75,
          abilityPercentile: thetaResult.abilityPercentile
        },
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      });

      // Log high-discrimination missed items to error bank
      const missedHighDiscrimination = items.filter(
        (i) => !userResponses[i.id] && i.a >= 1.5
      );

      for (const missed of missedHighDiscrimination) {
        await db.error_bank.add({
          id: `err-irt-${Date.now()}-${missed.id}`,
          sourceModule: missed.skillSection,
          errorType: 'paraphrase_trap',
          questionContext: `[IRT Calibrated Item] ${missed.passageOrSection}: "${missed.questionText}"`,
          userWrongAnswer: 'Làm sai câu hỏi có độ phân cách cao (a > 1.5)',
          correctAnswer: missed.correctAnswer,
          deepExplanation: `Câu hỏi này có độ phân cách a=${missed.a} và độ khó b=${missed.b}. Việc làm đúng câu hỏi này là điều kiện tiên quyết để kéo giá trị Theta vượt ngưỡng Band 7.5.`,
          mastered: false,
          retryCount: 0,
          createdAt: new Date().toISOString()
        });
      }

      setIsSavedToDB(true);
      setShowSummaryModal(true);
    } catch (e) {
      console.error('Dexie logging error for IRT calibration:', e);
    }
  }, [thetaResult, items, userResponses]);

  return {
    items,
    selectedItemId,
    setSelectedItemId,
    selectedItem,
    userResponses,
    toggleItemResponse,
    setPresetCandidateLevel,
    thetaResult,
    saveCalibrationToDB,
    isSavedToDB,
    showSummaryModal,
    setShowSummaryModal
  };
}
