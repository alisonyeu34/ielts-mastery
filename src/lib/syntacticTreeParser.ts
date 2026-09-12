/**
 * Hierarchical Syntactic Tree & Garden-Path Disentangler Engine (Step 85)
 * Computational parsing of Nested Relatives, Reduced Participles, and Garden-Path Ambiguities in Reading Passage 3
 */

export type DependencyRelation =
  | "root"       // Main Finite Verb
  | "nsubj"      // Nominal Subject
  | "dobj"       // Direct Object
  | "iobj"       // Indirect Object
  | "attr"       // Attribute / Subject Complement
  | "rcmod"      // Relative Clause Modifier
  | "vmod"       // Reduced Relative / Participle Modifier
  | "prep"       // Prepositional Phrase
  | "pobj"       // Object of Preposition
  | "advmod"     // Adverbial Modifier
  | "amod"       // Adjectival Modifier
  | "ccomp"      // Clausal Complement
  | "mark";      // Subordinating Conjunction

export interface ModifierChunk {
  id: string;
  type: "relative_clause" | "reduced_participle" | "prepositional_phrase" | "appositive" | "adverbial_clause";
  text: string;
  startIndex: number;
  endIndex: number;
  depth: number; // 1 = level 1, 2 = nested within level 1, etc.
  modifiesTarget: string; // What word or phrase this modifier attaches to
  explanation: string;
}

export interface CoreSkeleton {
  subject: string;
  subjectHeadWord: string;
  mainVerb: string;
  objectOrComplement: string;
  modifiers: ModifierChunk[];
  fullSentence: string;
  wordCount: number;
  complexityScore: number; // 0 - 100
}

export interface DependencyNode {
  id: string;
  word: string;
  lemma?: string;
  pos: string; // Part of Speech (e.g., "NN", "VBD", "VBZ", "IN", "JJ")
  dep: DependencyRelation;
  headId: string | null; // ID of the parent node
  isCoreSkeleton: boolean;
  x: number;
  y: number;
  depth: number;
  vietnameseRole: string;
  disambiguationNote?: string;
}

export interface DependencyEdge {
  id: string;
  sourceId: string;
  targetId: string;
  label: DependencyRelation;
  isCore: boolean;
  pathD: string; // SVG path data (Bezier curve)
}

export interface GardenPathChallenge {
  id: string;
  passageTitle: string;
  passageDomain: "Astrophysics & Cosmology" | "Cognitive Neurobiology" | "Archaeological Anthropology" | "Environmental Biogeochemistry" | "Behavioral Economics";
  sentenceText: string;
  wordCount: number;
  decoyVerbs: {
    verb: string;
    actualRole: string;
    trapReason: string;
  }[];
  trueMainVerb: string;
  coreSubject: string;
  coreObjectOrComplement: string;
  reducedClauseSnippet: string;
  fullDisentangledAnalysis: string;
  cognitiveTrapType: "reduced_relative_verb_overlap" | "nested_subordinate_illusion" | "noun_verb_lexical_ambiguity" | "long_distance_dependency_disruption";
  ieltsTrapExplanation: string;
  cambridgeTip: string;
  nodes: DependencyNode[];
}

/**
 * Calculates SVG Bezier curves between parent (head) and child dependency nodes
 */
export function calculateDependencyEdges(nodes: DependencyNode[]): DependencyEdge[] {
  const edges: DependencyEdge[] = [];
  const nodeMap = new Map<string, DependencyNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  nodes.forEach((child) => {
    if (!child.headId) return;
    const parent = nodeMap.get(child.headId);
    if (!parent) return;

    const sourceX = parent.x;
    const sourceY = parent.y;
    const targetX = child.x;
    const targetY = child.y;

    const dx = targetX - sourceX;
    const isCore = child.isCoreSkeleton && parent.isCoreSkeleton;

    // Arc curvature: higher arc for longer distance
    const arcHeight = Math.min(Math.abs(dx) * 0.45 + 30, 110);
    const controlY = Math.min(sourceY, targetY) - arcHeight;
    const controlX = (sourceX + targetX) / 2;

    const pathD = `M ${sourceX} ${sourceY - 12} Q ${controlX} ${controlY} ${targetX} ${targetY - 12}`;

    edges.push({
      id: `edge_${parent.id}_to_${child.id}`,
      sourceId: parent.id,
      targetId: child.id,
      label: child.dep,
      isCore,
      pathD
    });
  });

  return edges;
}

/**
 * Strips modifier layers and generates highlighted core skeleton HTML
 */
export function formatSkeletonStripping(
  fullText: string,
  core: { subject: string; mainVerb: string; objectOrComplement: string }
): {
  coreHtml: string;
  modifiersOnly: string[];
} {
  // Simple heuristic highlighting for demo & visual inspection
  return {
    coreHtml: `<span class="text-emerald-400 font-bold underline decoration-emerald-500 decoration-2">${core.subject}</span> ... <span class="text-cyan-400 font-black underline decoration-cyan-500 decoration-2">${core.mainVerb}</span> ... <span class="text-violet-400 font-bold underline decoration-violet-500 decoration-2">${core.objectOrComplement}</span>`,
    modifiersOnly: [
      "Mệnh đề phụ quan hệ / phân từ rút gọn",
      "Cụm giới từ bổ nghĩa bổ sung",
      "Mệnh đề trạng ngữ chỉ điều kiện / nhượng bộ"
    ]
  };
}
