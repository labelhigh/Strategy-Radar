
import React, { useState } from 'react';
import { DimensionScore } from '../types';
import { DIMENSIONS } from '../constants';
import { WandIcon, LoaderIcon, LinkIcon, WarningIcon } from './Icons';

interface ScoreControlsProps {
  scores: DimensionScore[];
  onScoresChange: (newScores: DimensionScore[]) => void;
  onGetAdvice: () => void;
  isLoading: boolean;
  onAnalyzeUrl: (url: string) => void;
  isAnalyzingUrl: boolean;
  error: string | null;
  isPristine: boolean;
  onStartManualScoring: () => void;
}

export const ScoreControls: React.FC<ScoreControlsProps> = ({ scores, onScoresChange, onGetAdvice, isLoading, onAnalyzeUrl, isAnalyzingUrl, error, isPristine, onStartManualScoring }) => {
  const [urlInput, setUrlInput] = useState('');
  
  const handleSliderChange = (subject: string, value: number) => {
    const newScores = scores.map(s =>
      s.subject === subject ? { ...s, value } : s
    );
    onScoresChange(newScores);
  };

  const handleAnalyzeClick = () => {
    onAnalyzeUrl(urlInput);
  };

  const isBusy = isLoading || isAnalyzingUrl;
  const hasScores = scores.some(s => s.value > 0);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-semibold text-slate-900 mb-4">專案維度</h2>
      
      {/* URL Analysis Section */}
      <div className="mb-4">
        <p className="text-slate-600 mb-2 text-sm">輸入一個公開的網址，讓 AI 自動分析並評分。</p>
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://www.example.com"
            className="flex-grow bg-white border border-slate-300 rounded-md px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isBusy}
          />
          <button
            onClick={handleAnalyzeClick}
            disabled={isBusy}
            className="flex-shrink-0 flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500"
          >
            {isAnalyzingUrl ? (
              <LoaderIcon className="animate-spin h-5 w-5 text-white" />
            ) : (
              <LinkIcon className="h-5 w-5 text-white" />
            )}
            <span className="ml-2 hidden sm:inline">分析</span>
          </button>
        </div>
         {error && (
            <div className="mt-2 flex items-center text-sm text-red-500">
                <WarningIcon className="h-4 w-4 mr-1"/>
                {error}
            </div>
        )}
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-sm text-slate-400">或</span>
        </div>
      </div>
      
      {/* Manual Scoring Section */}
      <div className="flex-grow flex flex-col">
        {isPristine ? (
          <div className="flex-grow flex items-center justify-center">
            <button
              onClick={onStartManualScoring}
              className="w-full px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-500"
            >
              開始手動評分
            </button>
          </div>
        ) : (
          <>
            <p className="text-slate-600 mb-6 text-sm">手動為您的專案在每個維度上評分（0到10分）。</p>
            <div className="space-y-6 flex-grow">
              {DIMENSIONS.map((dimension, index) => (
                <div key={dimension.key}>
                  <div className="flex justify-between items-baseline mb-1">
                    <label htmlFor={dimension.key} className="font-medium text-slate-700">
                      {dimension.label}
                    </label>
                    <span className="text-lg font-bold text-green-500 w-8 text-center">
                      {scores[index].value === 0 ? <span className="text-slate-400">-</span> : scores[index].value}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{dimension.description}</p>
                  <input
                    id={dimension.key}
                    type="range"
                    min="0"
                    max="10"
                    value={scores[index].value}
                    onChange={(e) => handleSliderChange(dimension.label, parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                    disabled={isBusy}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <button
        onClick={onGetAdvice}
        disabled={isBusy || !hasScores}
        className="w-full mt-8 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-500"
      >
        {isLoading ? (
          <>
            <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            正在生成洞察...
          </>
        ) : (
          <>
            <WandIcon className="-ml-1 mr-3 h-5 w-5 text-white" />
            生成 AI 驅動的建議
          </>
        )}
      </button>
    </div>
  );
};
