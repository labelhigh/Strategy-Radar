import { DimensionScore, Suggestion, AnalysisResult } from "../types";

// --- Pre-generated profiles for URL Analysis ---

const ECOMMERCE_PROFILE: AnalysisResult = {
    scores: [
        { dimension: '商業可行性', value: 9 },
        { dimension: '技術可行性', value: 7 },
        { dimension: '使用者價值', value: 6 },
        { dimension: '時代相關性', value: 4 },
        { dimension: 'AI 整合潛力', value: 3 },
    ],
    suggestions: {
        solutionType: 'Incremental',
        strategicSummary: '此電商平台商業模式成熟，技術架構穩定。然而，使用者體驗尚有提升空間，且未能跟上最新的社群商務趨勢與 AI 個人化浪潮。建議採取漸進式優化策略，優先整合 AI 推薦系統並強化社群互動功能。',
        improvementSuggestions: [
            {
                dimension: 'AI 整合潛力',
                suggestion: '引入基於使用者行為的 AI 商品推薦引擎，提升交叉銷售與向上銷售的轉換率。'
            },
            {
                dimension: '時代相關性',
                suggestion: '結合直播購物、KOL 合作等社群電商模式，吸引年輕客群，創造新的流量入口。'
            }
        ],
        balanceWarning: '商業可行性遠高於創新相關維度（時代相關性、AI 整合潛力），長期可能面臨市場顛覆的風險。'
    }
};

const SOCIAL_MEDIA_PROFILE: AnalysisResult = {
    scores: [
        { dimension: '商業可行性', value: 4 },
        { dimension: '技術可行性', value: 6 },
        { dimension: '使用者價值', value: 9 },
        { dimension: '時代相關性', value: 8 },
        { dimension: 'AI 整合潛力', value: 5 },
    ],
    suggestions: {
        solutionType: 'Exploratory',
        strategicSummary: '此社群平台擁有極高的使用者價值和社群黏著度，但商業變現模式不明確。建議採取探索型策略，在不損害使用者體驗的前提下，嘗試多元的商業模式，如付費內容、品牌合作或電商整合。',
        improvementSuggestions: [
            {
                dimension: '商業可行性',
                suggestion: '啟動小規模的廣告或訂閱制實驗，測試市場接受度，並建立數據模型以評估對使用者留存的影響。'
            },
            {
                dimension: 'AI 整合潛力',
                suggestion: '利用 AI 進行更精準的內容分發與垃圾訊息過濾，可進一步提升使用者體驗，為未來的廣告投放奠定基礎。'
            }
        ],
    }
};

const SAAS_PROFILE: AnalysisResult = {
    scores: [
        { dimension: '商業可行性', value: 6 },
        { dimension: '技術可行性', value: 9 },
        { dimension: '使用者價值', value: 7 },
        { dimension: '時代相關性', value: 5 },
        { dimension: 'AI 整合潛力', value: 8 },
    ],
    suggestions: {
        solutionType: 'Innovative',
        strategicSummary: '此 SaaS 產品技術實力雄厚，AI 整合潛力巨大。建議採取創新型策略，將 AI 作為核心競爭力，開發智慧化、自動化的殺手級功能，從而在市場中建立技術壁壘，並以此為基礎優化定價與市場策略。',
        improvementSuggestions: [
            {
                dimension: '時代相關性',
                suggestion: '關注行業的最新工作流程變革，確保產品功能與新興的協作模式和遠端工作趨勢保持一致。'
            },
            {
                dimension: '商業可行性',
                suggestion: '重新評估定價策略，考慮推出基於 AI 功能使用量的進階方案，以更好地將技術優勢轉化為商業價值。'
            }
        ],
    }
};

const DEFAULT_PROFILE: AnalysisResult = {
    scores: [
        { dimension: '商業可行性', value: 7 },
        { dimension: '技術可行性', value: 8 },
        { dimension: '使用者價值', value: 6 },
        { dimension: '時代相關性', value: 5 },
        { dimension: 'AI 整合潛力', value: 4 },
    ],
    suggestions: {
        solutionType: 'Incremental',
        strategicSummary: '此網站技術基礎穩固，商業模式清晰。目前使用者價值尚可，但與時代趨勢和AI整合的連結較弱。建議採取漸進式優化策略，強化創新元素的整合，逐步提升市場競爭力。',
        improvementSuggestions: [
            {
                dimension: 'AI 整合潛力',
                suggestion: '探索使用 AI 客服機器人來提升客戶服務效率，或利用 AI 進行個人化內容推薦，以增強使用者黏著度。'
            },
             {
                dimension: '時代相關性',
                suggestion: '研究競爭對手和市場領導者的最新動態，分析當前設計趨勢，更新網站的視覺風格與互動模式。'
            }
        ],
        balanceWarning: 'AI 整合潛力與技術可行性之間存在較大差距，可能導致技術資源未能充分發揮其潛在價值。'
    }
};

/**
 * Simulates an API call to analyze a URL and provide scores and suggestions.
 * This is a mock implementation for prototyping purposes.
 * @param url The URL to analyze.
 * @returns A promise that resolves to an AnalysisResult object.
 */
export const analyzeUrlAndScore = async (url: string): Promise<AnalysisResult> => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!url || !url.startsWith('http')) {
        throw new Error("請輸入有效的網址。");
    }

    if (/(shop|store|amazon|commerce|buy)/i.test(url)) {
        return ECOMMERCE_PROFILE;
    }
    if (/(social|facebook|twitter|community|forum)/i.test(url)) {
        return SOCIAL_MEDIA_PROFILE;
    }
    if (/(saas|tech|blog|dev|dashboard)/i.test(url)) {
        return SAAS_PROFILE;
    }
    
    return DEFAULT_PROFILE;
};

// --- Pre-generated advice components for manual scoring ---

const getLowScoreSuggestion = (dimension: string): string => {
    switch (dimension) {
        case '商業可行性':
            return '商業模式存在不確定性。建議進行市場競爭分析與使用者付費意願調查，以驗證價值主張並找到可行的獲利模式。';
        case '技術可行性':
            return '目前的技術方案可能面臨挑戰。建議進行技術驗證（PoC），評估不同技術棧的優劣，並考慮分階段實施以降低風險。';
        case '使用者價值':
            return '產品未能有效解決使用者核心痛點。建議立即進行使用者訪談和可用性測試，從真實回饋中發掘高價值需求。';
        case '時代相關性':
            return '產品與當前市場趨勢脫節。建議研究最新的設計風格、互動模式和消費者行為變化，將現代元素融入產品中。';
        case 'AI 整合潛力':
            return '尚未充分利用 AI 的潛力。建議舉辦腦力激盪會議，探討 AI 如何在提升效率、個人化體驗或創造新功能方面帶來價值。';
        default:
            return `此維度的分數過低，建議投入資源進行研究，找到提升 ${dimension} 的可行方法。`;
    }
};

/**
 * Simulates an API call to get design advice based on scores.
 * This is a mock implementation for prototyping purposes.
 * @param scores The current dimension scores.
 * @returns A promise that resolves to a Suggestion object.
 */
export const getDesignAdvice = async (scores: DimensionScore[]): Promise<Suggestion> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const values = scores.map(s => s.value);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);

  const getScore = (subject: string): number => scores.find(s => s.subject === subject)?.value ?? 0;

  let solutionType: Suggestion['solutionType'];
  let strategicSummary: string;

  const tech = getScore('技術可行性');
  const user = getScore('使用者價值');
  const ai = getScore('AI 整合潛力');
  const business = getScore('商業可行性');

  if (ai > 7 && user > 6 && tech > 6) {
    solutionType = 'Innovative';
    strategicSummary = '專案在 AI、使用者價值與技術上具備強大基礎，潛力巨大。建議採取創新型策略，大膽探索 AI 驅動的顛覆性功能，旨在定義市場新標準，建立難以超越的競爭壁壘。';
  } else if (business > 7 && tech > 7 && avg < 6.5) {
    solutionType = 'Defensive';
    strategicSummary = '專案擁有穩固的商業和技術基礎，但在使用者體驗和創新方面相對保守。建議採取防禦型策略，專注於鞏固核心市場，優化現有流程，同時警惕新興競爭者的顛覆式創新。';
  } else if (avg < 4.5) {
    solutionType = 'Exploratory';
    strategicSummary = '專案各維度分數普遍偏低，顯示概念尚處於早期階段，方向不明確。建議立即暫停大規模開發，轉向探索型研究，透過原型測試和市場驗證來找到真正有價值的問題。';
  } else {
    solutionType = 'Incremental';
    strategicSummary = '專案各維度發展均衡，整體狀況穩健。建議採取漸進型策略，以數據驅動的方式持續進行小步快跑的優化，穩步提升使用者滿意度和商業表現，實現長期可持續增長。';
  }

  const improvementSuggestions = scores
    .filter(s => s.value < 5) // Suggest improvements for anything below 5
    .sort((a, b) => a.value - b.value) // Prioritize the lowest scores
    .slice(0, 2) // Show up to 2 most critical suggestions
    .map(s => ({
        dimension: s.subject,
        suggestion: getLowScoreSuggestion(s.subject),
    }));

  let balanceWarning: string | undefined = undefined;
  if (max - min >= 5) {
    const highest = scores.find(s => s.value === max)?.subject;
    const lowest = scores.find(s => s.value === min)?.subject;
    balanceWarning = `維度之間存在嚴重失衡（例如 ${highest} 與 ${lowest}）。這可能導致資源錯配或策略衝突。建議優先補強最弱的環節，以確保專案的長期健康發展。`;
  }

  return {
    solutionType,
    strategicSummary,
    improvementSuggestions,
    balanceWarning,
  };
};
