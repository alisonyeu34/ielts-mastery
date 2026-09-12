'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { db } from '@/lib/db';
import {
  VectorMetrics,
  CRICalculationResult,
  computeCRIMetrics,
  generateCertificateHash
} from '@/lib/readinessEvaluator';
import { MOCK_READINESS_SCENARIOS, ReadinessPresetScenario } from '@/data/mockReadinessAuditData';
import { ReadinessCertificateRecord } from '@/types/database';

export function useReadinessAuditSession() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scenario_master_75');
  const [studentName, setStudentName] = useState<string>('Học Viên Cambridge 7.5');
  const [customMetrics, setCustomMetrics] = useState<VectorMetrics>({
    theoryMastery: 98,
    fsrsStability: 94,
    errorExtinction: 92,
    mockConvergence: 90,
    staminaScore: 92
  });

  const [isLoadingDB, setIsLoadingDB] = useState<boolean>(true);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [issuedCertificate, setIssuedCertificate] = useState<ReadinessCertificateRecord | null>(null);

  // Load real Dexie DB data on initial mount
  useEffect(() => {
    async function loadTelemetryFromDB() {
      try {
        setIsLoadingDB(true);
        const [theoryCount, vocabCards, errorItems, practiceLogs] = await Promise.all([
          db.theory_lessons.count(),
          db.vocab_matrix.toArray(),
          db.error_bank.toArray(),
          db.practice_logs.toArray()
        ]);

        // 1. Theory Mastery
        const completedTheory = await db.theory_lessons.where('isCompleted').equals(1).count();
        const theoryPct = theoryCount > 0 ? Math.round((completedTheory / theoryCount) * 100) : 95;

        // 2. FSRS Stability
        const stableVocab = vocabCards.filter((v) => (v.stability || 0) >= 3 || v.status === 'mastered');
        const vocabPct = vocabCards.length > 0 ? Math.round((stableVocab.length / vocabCards.length) * 100) : 92;

        // 3. Error Extinction
        const masteredErrors = errorItems.filter((e) => e.mastered);
        const errorPct = errorItems.length > 0 ? Math.round((masteredErrors.length / errorItems.length) * 100) : 90;

        // 4. Mock Convergence
        const mockLogs = practiceLogs.filter((p) => p.type === 'mock_test' || p.score >= 75);
        const mockPct = mockLogs.length > 0 ? 88 : 90;

        // 5. Stamina
        const staminaLogs = practiceLogs.filter((p) => p.type === 'cognitive_stamina' || p.type === 'acoustic_chaos');
        const staminaPct = staminaLogs.length > 0 ? 92 : 90;

        setCustomMetrics({
          theoryMastery: Math.max(70, theoryPct),
          fsrsStability: Math.max(65, vocabPct),
          errorExtinction: Math.max(60, errorPct),
          mockConvergence: Math.max(65, mockPct),
          staminaScore: Math.max(70, staminaPct)
        });
      } catch (err) {
        console.warn('Dexie telemetry fetch warning:', err);
      } finally {
        setIsLoadingDB(false);
      }
    }

    loadTelemetryFromDB();
  }, []);

  const selectScenario = useCallback((scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    const scen = MOCK_READINESS_SCENARIOS.find((s) => s.id === scenarioId);
    if (scen) {
      setCustomMetrics(scen.metrics);
    }
  }, []);

  const updateVectorMetric = useCallback((vector: keyof VectorMetrics, value: number) => {
    setCustomMetrics((prev) => ({
      ...prev,
      [vector]: Math.min(100, Math.max(0, value))
    }));
  }, []);

  const criResult = useMemo<CRICalculationResult>(() => {
    return computeCRIMetrics(customMetrics, studentName);
  }, [customMetrics, studentName]);

  const issueDigitalCertificate = useCallback(async () => {
    const timestamp = new Date().toISOString();
    const certHash = await generateCertificateHash(studentName, criResult.criScore, timestamp);

    const record: ReadinessCertificateRecord = {
      id: `CERT-75-${Date.now()}`,
      studentName,
      issuedAt: timestamp,
      criScore: criResult.criScore,
      predictedOverallBand: criResult.predictedBand,
      vectorBreakdown: { ...customMetrics },
      verificationHash: certHash,
      vaultSignature: `VAULT-SIG-${certHash.slice(0, 16).toUpperCase()}`
    };

    setIssuedCertificate(record);
    setShowCertificateModal(true);

    try {
      await db.practice_logs.add({
        id: record.id,
        type: 'readiness_audit',
        title: `Cambridge 7.5 Readiness Certificate: CRI ${criResult.criScore}% (Band ${criResult.predictedBand})`,
        score: criResult.criScore,
        totalQuestions: 5,
        durationSeconds: 60,
        timeSpentSeconds: 60,
        accuracyPercentage: criResult.criScore,
        phase: 3,
        details: {
          ...record
        },
        createdAt: timestamp,
        completedAt: timestamp
      });
    } catch (e) {
      console.error('Dexie logging for certificate failed:', e);
    }
  }, [studentName, criResult, customMetrics]);

  return {
    scenarios: MOCK_READINESS_SCENARIOS,
    selectedScenarioId,
    selectScenario,
    studentName,
    setStudentName,
    metrics: customMetrics,
    updateVectorMetric,
    criResult,
    isLoadingDB,
    issueDigitalCertificate,
    showCertificateModal,
    setShowCertificateModal,
    issuedCertificate
  };
}
