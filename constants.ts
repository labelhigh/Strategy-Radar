import { Dimension, IdealData } from './types';

export const DIMENSIONS: Dimension[] = [
  {
    key: 'business',
    label: '商業可行性',
    description: '與商業目標、收入潛力和市場契合度的對齊程度。'
  },
  {
    key: 'tech',
    label: '技術可行性',
    description: '實施的複雜性、可用資源和平台限制。'
  },
  {
    key: 'user',
    label: '使用者價值',
    description: '解決真實使用者問題、可用性和吸引力的程度。'
  },
  {
    key: 'zeitgeist',
    label: '時代相關性',
    description: '與當前文化、社會和市場趨勢的相關性。'
  },
  {
    key: 'ai',
    label: 'AI 整合潛力',
    description: '利用AI增強功能、個人化或效率的潛力。'
  }
];

export const IDEAL_DATA: IdealData[] = DIMENSIONS.map(d => ({
  subject: d.label,
  ideal: 9,
  feasible: 6,
  fullMark: 10
}));

export const RADAR_COLORS = {
  main: '#10b981', // green-500
  ideal: '#f59e0b', // orange-500
  feasible: 'rgba(245, 158, 11, 0.2)', // orange-500 with transparency
};