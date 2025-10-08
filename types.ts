export interface Dimension {
  key: 'business' | 'tech' | 'user' | 'zeitgeist' | 'ai';
  label: string;
  description: string;
}

export interface DimensionScore {
  subject: string;
  value: number;
  fullMark: number;
}

export interface Suggestion {
  solutionType: 'Innovative' | 'Incremental' | 'Defensive' | 'Exploratory';
  strategicSummary: string;
  improvementSuggestions: {
    dimension: string;
    suggestion: string;
  }[];
  balanceWarning?: string;
}

export interface IdealData {
  subject: string;
  ideal: number;
  feasible: number;
  fullMark: number;
}

export interface AIScore {
  dimension: string;
  value: number;
}

export interface AnalysisResult {
  scores: AIScore[];
  suggestions: Suggestion;
}