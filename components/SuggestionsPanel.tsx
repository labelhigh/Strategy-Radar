import React from 'react';
import { Suggestion } from '../types';
import { LightbulbIcon, WarningIcon, CheckCircleIcon, InfoIcon, LoaderIcon } from './Icons';

interface SuggestionsPanelProps {
  suggestions: Suggestion | null;
  isLoading: boolean;
  error: string | null;
  balanceIndex: number;
  riskWarnings: string[];
}

const solutionTypeMap: Record<Suggestion['solutionType'], string> = {
  Innovative: '創新型',
  Incremental: '漸進型',
  Defensive: '防禦型',
  Exploratory: '探索型',
};

const PanelCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; colorClass: string }> = ({ icon, title, children, colorClass }) => (
  <div className={`bg-slate-50 p-4 rounded-lg border-l-4 ${colorClass}`}>
    <div className="flex items-center mb-2">
      {icon}
      <h4 className="ml-2 font-semibold text-slate-800">{title}</h4>
    </div>
    <div className="text-slate-600 text-sm prose prose-sm prose-slate max-w-none">
        {children}
    </div>
  </div>
);

export const SuggestionsPanel: React.FC<SuggestionsPanelProps> = ({ suggestions, isLoading, error, balanceIndex, riskWarnings }) => {
  const getBalanceColor = () => {
    if (balanceIndex > 75) return 'border-green-500';
    if (balanceIndex > 50) return 'border-yellow-500';
    return 'border-red-500';
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <LoaderIcon className="w-12 h-12 animate-spin text-green-500" />
          <p className="mt-4 text-lg font-medium">正在分析中...</p>
          <p className="text-slate-600">AI 正在評估專案概況以提供量身定制的策略建議。</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-red-50 rounded-lg">
          <WarningIcon className="w-12 h-12 text-red-500" />
          <p className="mt-4 text-lg font-medium text-red-600">發生錯誤</p>
          <p className="text-slate-600">{error}</p>
        </div>
      );
    }
    
    if (!suggestions) {
      return (
         <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-100 rounded-lg">
          <LightbulbIcon className="w-12 h-12 text-slate-400" />
          <p className="mt-4 text-lg font-medium">準備好獲取 AI 驅動的建議了嗎？</p>
          <p className="text-slate-600">輸入網址進行分析，或手動調整分數並點擊「生成建議」。</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <PanelCard icon={<InfoIcon className="w-5 h-5 text-blue-500" />} title="策略摘要" colorClass="border-blue-500">
          <p className="font-bold text-lg text-blue-600 mb-2">建議解決方案類型：{solutionTypeMap[suggestions.solutionType] || suggestions.solutionType}</p>
          <p>{suggestions.strategicSummary}</p>
        </PanelCard>
        
        {suggestions.improvementSuggestions.length > 0 && (
          <PanelCard icon={<LightbulbIcon className="w-5 h-5 text-yellow-500" />} title="改進建議" colorClass="border-yellow-500">
            <ul className="list-disc pl-5 space-y-1">
              {suggestions.improvementSuggestions.map((item, index) => (
                <li key={index}>
                  <strong>{item.dimension}:</strong> {item.suggestion}
                </li>
              ))}
            </ul>
          </PanelCard>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 min-h-[300px] flex flex-col">
      <h3 className="text-2xl font-semibold mb-4 text-slate-900">分析與建議</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <PanelCard icon={<CheckCircleIcon className="w-5 h-5 text-green-500" />} title="平衡指數" colorClass={getBalanceColor()}>
          <div className="flex items-center gap-4">
            <span className={`text-4xl font-bold ${getBalanceColor().replace('border-', 'text-')}`}>{balanceIndex}</span>
            <p className="text-xs">衡量分數分佈的均勻程度。分數越高越好，表示專案概況更均衡，可能更具可持續性。</p>
          </div>
        </PanelCard>
        <PanelCard icon={<WarningIcon className="w-5 h-5 text-orange-500" />} title="風險雷達" colorClass={riskWarnings.length > 0 ? 'border-orange-500' : 'border-slate-300'}>
            {riskWarnings.length > 0 ? (
                 <ul className="list-disc pl-5 space-y-1">{riskWarnings.map((warning, i) => <li key={i}>{warning}</li>)}</ul>
            ) : <p>根據目前分數，未檢測到嚴重風險。專案概況穩定。</p>}
        </PanelCard>
      </div>
      <div className="flex-grow">
        {renderContent()}
      </div>
    </div>
  );
};