/**
 * Advanced Toulmin Argumentation & Rebuttal Synthesizer Engine (Step 87)
 * 6-Component Dialectical Structure Validation, Fallacy Auditing, and Logic-to-Prose Synthesis
 */

export type ToulminRole =
  | "claim"
  | "data"
  | "warrant"
  | "backing"
  | "counterArgument"
  | "rebuttal";

export interface ToulminBlock {
  role: ToulminRole;
  label: string;
  vietnameseTitle: string;
  colorTheme: {
    border: string;
    bg: string;
    text: string;
    badgeBg: string;
    glowRing: string;
  };
  placeholder: string;
  guidingPrompt: string;
}

export const TOULMIN_ROLES_CONFIG: Record<ToulminRole, ToulminBlock> = {
  claim: {
    role: "claim",
    label: "1. Claim",
    vietnameseTitle: "Luận Điểm Trung Tâm (The Core Claim)",
    colorTheme: {
      border: "border-blue-500",
      bg: "bg-blue-950/40",
      text: "text-blue-400",
      badgeBg: "bg-blue-900/60 text-blue-200 border-blue-500/50",
      glowRing: "ring-blue-500"
    },
    placeholder: "Khẳng định luận điểm cốt lõi của đoạn văn (e.g., Implementing universal basic income stabilizes economic mobility)...",
    guidingPrompt: "Xác lập kết luận chủ đạo mà bạn muốn thuyết phục giám khảo."
  },
  data: {
    role: "data",
    label: "2. Data / Grounds",
    vietnameseTitle: "Dữ Liệu & Bằng Chứng Nền Tảng (Empirical Grounds)",
    colorTheme: {
      border: "border-emerald-500",
      bg: "bg-emerald-950/40",
      text: "text-emerald-400",
      badgeBg: "bg-emerald-900/60 text-emerald-200 border-emerald-500/50",
      glowRing: "ring-emerald-500"
    },
    placeholder: "Đưa ra bằng chứng thực nghiệm, số liệu hoặc hiện tượng xã hội làm điểm tựa (e.g., Pilot trials in Finland revealed reduced psychological distress among recipients)...",
    guidingPrompt: "Sự kiện, số liệu hay hiện tượng quan sát nào chứng minh cho luận điểm?"
  },
  warrant: {
    role: "warrant",
    label: "3. Warrant",
    vietnameseTitle: "Cầu Nối Luận Lý (The Logical Warrant)",
    colorTheme: {
      border: "border-purple-500",
      bg: "bg-purple-950/40",
      text: "text-purple-400",
      badgeBg: "bg-purple-900/60 text-purple-200 border-purple-500/50",
      glowRing: "ring-purple-500"
    },
    placeholder: "Giải thích nguyên lý ngầm định tại sao Data lại trực tiếp dẫn tới Claim (e.g., When baseline financial security is guaranteed, individuals can pursue human capital investment without panic)...",
    guidingPrompt: "Nguyên lý nhân quả nào kết nối bằng chứng với luận điểm?"
  },
  backing: {
    role: "backing",
    label: "4. Backing",
    vietnameseTitle: "Hậu Thuẫn Lý Thuyết (Theoretical Backing)",
    colorTheme: {
      border: "border-amber-500",
      bg: "bg-amber-950/40",
      text: "text-amber-400",
      badgeBg: "bg-amber-900/60 text-amber-200 border-amber-500/50",
      glowRing: "ring-amber-500"
    },
    placeholder: "Cung cấp cơ sở học thuật, định luật kinh tế/tâm lý củng cố cho Warrant (e.g., This aligns with Maslow's hierarchy of human motivation and behavioral economics theories)...",
    guidingPrompt: "Lý thuyết khoa học hoặc quy luật tổng quát nào bảo đảm cho Warrant?"
  },
  counterArgument: {
    role: "counterArgument",
    label: "5. Counter-Argument / Qualifier",
    vietnameseTitle: "Phản Đề & Điều Kiện Giới Hạn (Opposing View)",
    colorTheme: {
      border: "border-rose-500",
      bg: "bg-rose-950/40",
      text: "text-rose-400",
      badgeBg: "bg-rose-900/60 text-rose-200 border-rose-500/50",
      glowRing: "ring-rose-500"
    },
    placeholder: "Nêu quan điểm đối lập hoặc giới hạn nơi luận điểm bị thách thức (e.g., Critics argue that unconditional cash transfers disincentivize labor force participation and strain national budgets)...",
    guidingPrompt: "Góc nhìn phản biện hoặc kẽ hở lớn nhất của lập luận là gì?"
  },
  rebuttal: {
    role: "rebuttal",
    label: "6. Rebuttal",
    vietnameseTitle: "Đòn Bẻ Gãy Phản Đề (Decisive Rebuttal)",
    colorTheme: {
      border: "border-cyan-500",
      bg: "bg-cyan-950/40",
      text: "text-cyan-400",
      badgeBg: "bg-cyan-900/60 text-cyan-200 border-cyan-500/50",
      glowRing: "ring-cyan-500"
    },
    placeholder: "Đập tan phản đề bằng dữ liệu chứng minh sự lo ngại đó là thứ yếu hoặc đã được kiểm soát (e.g., However, empirical evidence proves labor withdrawal was confined to care-givers and students upgrading skills, while automated taxation recoups costs)...",
    guidingPrompt: "Làm thế nào để triệt tiêu hoàn toàn sự hoài nghi của phản đề?"
  }
};

export interface ToulminValidationReport {
  isComplete: boolean;
  logicResilienceScore: number; // 0 - 100
  taskResponseEstimatedBand: number; // 5.5 - 9.0
  warnings: string[];
  strengths: string[];
  missingRoles: ToulminRole[];
}

/**
 * Validates the logical integrity and dialectical depth of a 6-component Toulmin chain
 */
export function validateToulminChain(
  blocks: Partial<Record<ToulminRole, string>>
): ToulminValidationReport {
  const warnings: string[] = [];
  const strengths: string[] = [];
  const missingRoles: ToulminRole[] = [];

  const roles: ToulminRole[] = ["claim", "data", "warrant", "backing", "counterArgument", "rebuttal"];

  roles.forEach((r) => {
    const content = (blocks[r] || "").trim();
    if (!content || content.length < 15) {
      missingRoles.push(r);
    }
  });

  const claim = (blocks.claim || "").trim();
  const data = (blocks.data || "").trim();
  const warrant = (blocks.warrant || "").trim();
  const backing = (blocks.backing || "").trim();
  const counter = (blocks.counterArgument || "").trim();
  const rebuttal = (blocks.rebuttal || "").trim();

  // 1. Check Bald Assertion (Claim without Data)
  if (claim && !data) {
    warnings.push("⚠️ Khẳng định võ đoán (Bald Assertion): Bạn đã nêu Luận điểm (Claim) nhưng thiếu Dữ liệu thực nghiệm (Data) làm điểm tựa.");
  } else if (claim && data) {
    strengths.push("✅ Luận điểm được hỗ trợ bởi chứng cứ thực nghiệm vững chắc.");
  }

  // 2. Check Warrant Breakdown
  if (data && !warrant) {
    warnings.push("⚠️ Vết đứt gãy Luận lý (Warrant Breakdown): Có dữ liệu nhưng thiếu Cầu nối giải thích cơ chế vì sao dữ liệu này chứng minh được luận điểm.");
  } else if (warrant) {
    strengths.push("✅ Cơ chế nhân quả (Warrant) được diễn giải rành mạch.");
  }

  // 3. Check Self-Undermining Trap (Counter-Argument without Rebuttal)
  if (counter && !rebuttal) {
    warnings.push("🚨 Bẫy tự phản bội lập trường (Self-Undermining Trap): Bạn đưa ra phản đề (Counter-Argument) nhưng không viết đòn bẻ gãy (Rebuttal), khiến lập luận bị tự phủ định!");
  } else if (counter && rebuttal) {
    strengths.push("🔥 Lập luận đa chiều đỉnh cao (Band 8.5+): Dự báo trước phản đề và bẻ gãy hoàn toàn sự hoài nghi của giám khảo.");
  }

  // 4. Calculate Logic Resilience Score
  let score = 100;
  score -= missingRoles.length * 15;
  if (counter && !rebuttal) score -= 25;
  if (claim && !data) score -= 20;
  if (data && !warrant) score -= 15;

  score = Math.max(20, Math.min(100, score));

  // 5. Estimated Task Response Band
  let estimatedBand = 6.0;
  if (score >= 90) estimatedBand = 8.5;
  else if (score >= 75) estimatedBand = 7.5;
  else if (score >= 60) estimatedBand = 7.0;
  else if (score >= 45) estimatedBand = 6.5;

  return {
    isComplete: missingRoles.length === 0,
    logicResilienceScore: score,
    taskResponseEstimatedBand: estimatedBand,
    warnings,
    strengths,
    missingRoles
  };
}

/**
 * Synthesizes 6 modular Toulmin blocks into a cohesive C1/C2 Academic Body Paragraph
 */
export function synthesizeToulminToProse(
  blocks: Partial<Record<ToulminRole, string>>
): string {
  const claim = (blocks.claim || "").trim();
  const data = (blocks.data || "").trim();
  const warrant = (blocks.warrant || "").trim();
  const backing = (blocks.backing || "").trim();
  const counter = (blocks.counterArgument || "").trim();
  const rebuttal = (blocks.rebuttal || "").trim();

  const parts: string[] = [];

  if (claim) {
    parts.push(`It is readily demonstrable that ${claim.charAt(0).toLowerCase() + claim.slice(1)}.`);
  }

  if (data) {
    parts.push(`Primary empirical grounds for this contention stem from evidence indicating that ${data.charAt(0).toLowerCase() + data.slice(1)}.`);
  }

  if (warrant) {
    parts.push(`This phenomenon operates under the fundamental premise that ${warrant.charAt(0).toLowerCase() + warrant.slice(1)}.`);
  }

  if (backing) {
    parts.push(`Underpinning this causal relationship is the established scholarly consensus that ${backing.charAt(0).toLowerCase() + backing.slice(1)}.`);
  }

  if (counter) {
    parts.push(`Admittedly, detractors frequently raise the objection that ${counter.charAt(0).toLowerCase() + counter.slice(1)}.`);
  }

  if (rebuttal) {
    parts.push(`Nonetheless, such apprehensions are decisively invalidated by the reality that ${rebuttal.charAt(0).toLowerCase() + rebuttal.slice(1)}.`);
  }

  return parts.join(" ");
}
