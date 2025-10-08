
import React, { useState, useCallback, useMemo } from 'react';
import { ScoreControls } from './components/ScoreControls';
import { RadarChartComponent } from './components/RadarChartComponent';
import { SuggestionsPanel } from './components/SuggestionsPanel';
import { Header } from './components/Header';
import { getDesignAdvice, analyzeUrlAndScore } from './services/geminiService';
import { DimensionScore, Suggestion } from './types';
import { DIMENSIONS } from './constants';
import { useDebounce } from './hooks/useDebounce';
import { CompassIcon } from './components/Icons';

const App: React.FC = () => {
  const [scores, setScores] = useState<DimensionScore[]>(
    DIMENSIONS.map(d => ({ subject: d.label, value: 0, fullMark: 10 }))
  );
  const [suggestions, setSuggestions] = useState<Suggestion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzingUrl, setIsAnalyzingUrl] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [isPristine, setIsPristine] = useState<boolean>(true);

  const handleScoresChange = (newScores: DimensionScore[]) => {
    setScores(newScores);
  };
  
  const handleStartManualScoring = () => {
    setIsPristine(false);
  };

  const debouncedScores = useDebounce(scores, 500);

  const fetchSuggestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const advice = await getDesignAdvice(debouncedScores);
      setSuggestions(advice);
    // FIX: Added curly braces to the catch block to correctly scope the error handling and prevent a cascading syntax error.
    } catch (err) {
      setError('無法從 AI 獲取建議。請再試一次。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedScores]);

  const handleUrlAnalysis = useCallback(async (url: string) => {
    if (!url) {
      setError("請輸入有效的網址。");
      return;
    }
    setIsAnalyzingUrl(true);
    setError(null);
    setSuggestions(null);
    try {
      const result = await analyzeUrlAndScore(url);
      
      // Map the returned scores to the format needed by the state
      const newScores = DIMENSIONS.map(dim => {
        const foundScore = result.scores.find(s => s.dimension === dim.label);
        return {
          subject: dim.label,
          value: foundScore ? foundScore.value : 5, // Default to 5 if not found
          fullMark: 10,
        };
      });

      setScores(newScores);
      setSuggestions(result.suggestions);
      setIsPristine(false);
    } catch (err) {
      setError('無法分析該網址。請檢查網址或稍後再試。');
      console.error(err);
    } finally {
      setIsAnalyzingUrl(false);
    }
  }, []);

  const { balanceIndex, riskWarnings } = useMemo(() => {
    const values = scores.map(s => s.value).filter(v => v > 0);
    if (values.length === 0) return { balanceIndex: 0, riskWarnings: [] };

    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;
    const stdDev = Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length);
    
    const balance = Math.max(0, Math.round((1 - stdDev / 4.5) * 100));

    const warnings = scores
      .filter(s => s.value > 0 && s.value < 4)
      .map(s => `${s.subject} 分數過低，此維度需要立即關注。`);

    if (stdDev > 2.5 && mean > 0) {
      warnings.push("各維度之間存在高度不平衡。專案可能會被拉向相互衝突的方向，從而增加風險。");
    }

    return { balanceIndex: balance, riskWarnings: warnings };
  }, [scores]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <Header />
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <ScoreControls 
              scores={scores} 
              onScoresChange={handleScoresChange} 
              onGetAdvice={fetchSuggestions}
              isLoading={isLoading}
              onAnalyzeUrl={handleUrlAnalysis}
              isAnalyzingUrl={isAnalyzingUrl}
              error={error}
              isPristine={isPristine}
              onStartManualScoring={handleStartManualScoring}
            />
          </div>
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-96 md:h-[500px] flex items-center justify-center">
               {isPristine ? (
                <div className="text-center text-slate-500">
                  <CompassIcon className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <h3 className="text-xl font-semibold text-slate-700">開始您的專案分析</h3>
                  <p className="mt-2 max-w-sm mx-auto">
                    請在左側輸入網址以自動評分，或選擇手動評分來視覺化您的專案維度。
                  </p>
                </div>
              ) : (
                <>
                  <div className="absolute top-4 right-4 z-10">
                    <label className="flex items-center cursor-pointer">
                      <span className="mr-2 text-sm text-slate-500">與理想對比</span>
                      <div className="relative">
                        <input type="checkbox" checked={showComparison} onChange={() => setShowComparison(!showComparison)} className="sr-only" />
                        <div className="block bg-slate-200 w-10 h-6 rounded-full"></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${showComparison ? 'translate-x-full bg-green-500' : ''}`}></div>
                      </div>
                    </label>
                  </div>
                  <RadarChartComponent data={scores} showComparison={showComparison} />
                </>
              )}
            </div>
            <SuggestionsPanel
              suggestions={suggestions}
              isLoading={isLoading || isAnalyzingUrl}
              error={error}
              balanceIndex={balanceIndex}
              riskWarnings={riskWarnings}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
