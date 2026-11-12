export type Faculty = {
  id: string;
  name: string;
  discipline: string;
  description: string;
  tools: string[];
  cost: number;
  mark: string;
};

export const faculties: Faculty[] = [
  {
    id: "FAC-001",
    name: "Research synthesis",
    discipline: "ACADEMIC / RESEARCH",
    description: "Trace an argument across papers, find the gaps between them, and assemble a research map that can be questioned.",
    tools: ["research.synthesize", "research.map_sources"],
    cost: 18,
    mark: "R/",
  },
  {
    id: "FAC-002",
    name: "Mathematical proof",
    discipline: "MATHEMATICS / LOGIC",
    description: "Move from conjecture to structure: formalise assumptions, test invariants, and build proof pathways.",
    tools: ["math.prove", "math.check_invariant"],
    cost: 24,
    mark: "∑",
  },
  {
    id: "FAC-003",
    name: "Theoretical physics",
    discipline: "PHYSICS / MODELLING",
    description: "Translate physical intuitions into models, expose hidden assumptions, and explore the consequences of a system.",
    tools: ["physics.model", "physics.derive"],
    cost: 31,
    mark: "Φ",
  },
  {
    id: "FAC-004",
    name: "Experimental design",
    discipline: "METHOD / INFERENCE",
    description: "Turn a question into a testable arrangement: hypotheses, controls, sampling logic, and defensible inference.",
    tools: ["experiment.design", "experiment.audit"],
    cost: 16,
    mark: "Δ",
  },
  {
    id: "FAC-005",
    name: "Scholarly composition",
    discipline: "WRITING / ARGUMENT",
    description: "Construct precise academic arguments, interrogate evidence, and compose work that keeps its claims accountable.",
    tools: ["scholar.compose", "scholar.review"],
    cost: 14,
    mark: "¶",
  },
];
