import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DimensionScore } from '../types';
import { IDEAL_DATA, RADAR_COLORS } from '../constants';

interface RadarChartComponentProps {
  data: DimensionScore[];
  showComparison: boolean;
}

const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const parts = payload.value.split(' ');
    // For Chinese labels, we can split by characters if needed, but space splitting is fine for now.
    // Let's adjust max length for potentially longer Chinese labels.
    const maxLineLength = 8; 

    // This logic might need adjustment for Chinese word breaking, but we'll keep it simple.
    // Assuming labels are short enough.
    if (payload.value.length > maxLineLength) {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} textAnchor="middle" fill="#475569" fontSize={12}>
                    {payload.value.substring(0, payload.value.length / 2)}
                </text>
                <text x={0} y={12} textAnchor="middle" fill="#475569" fontSize={12}>
                    {payload.value.substring(payload.value.length / 2)}
                </text>
            </g>
        )
    }

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} textAnchor="middle" fill="#475569" fontSize={12}>
                {payload.value}
            </text>
        </g>
    );
};

// --- Custom Dot for Highlighting Key Metrics ---
const KEY_METRICS = ['商業可行性', '使用者價值', 'AI 整合潛力'];

const CustomizedDot = (props: any) => {
  const { cx, cy, stroke, payload, value } = props;

  // Do not render a dot for zero values to avoid clutter at the center
  if (!value || value === 0) {
    return null;
  }

  if (KEY_METRICS.includes(payload.subject)) {
    // A larger, highlighted dot for key metrics
    return (
      <g>
        {/* Outer glow/highlight */}
        <circle cx={cx} cy={cy} r={8} fill={stroke} opacity={0.3} />
        {/* Inner solid dot */}
        <circle cx={cx} cy={cy} r={4} fill={stroke} stroke="#fff" strokeWidth={1.5} />
      </g>
    );
  }

  // A standard dot for other metrics
  return <circle cx={cx} cy={cy} r={3} fill={stroke} />;
};


export const RadarChartComponent: React.FC<RadarChartComponentProps> = ({ data, showComparison }) => {
  const combinedData = data.map((item, index) => ({
    ...item,
    ...IDEAL_DATA[index],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={combinedData}>
        <defs>
            <radialGradient id="radarGradient" cx="0.5" cy="0.5" r="0.8">
                <stop offset="0%" stopColor={RADAR_COLORS.main} stopOpacity={0.5}/>
                <stop offset="100%" stopColor={RADAR_COLORS.main} stopOpacity={0.1}/>
            </radialGradient>
        </defs>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="subject" tick={<CustomizedAxisTick />} dy={10} />
        <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#64748b', fontSize: 12 }} />
        
        {showComparison && (
          <Radar name="理想" dataKey="ideal" stroke={RADAR_COLORS.ideal} fill={RADAR_COLORS.feasible} fillOpacity={0.6} />
        )}
        
        <Radar name="目前分數" dataKey="value" stroke={RADAR_COLORS.main} strokeWidth={2} fill="url(#radarGradient)" fillOpacity={1} dot={<CustomizedDot />} />
        
        <Tooltip
            contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#e2e8f0',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            }}
            labelStyle={{ color: '#1e293b', fontWeight: 'bold' }}
            itemStyle={{ color: '#334155' }}
        />
        <Legend wrapperStyle={{ color: '#334155', paddingTop: '20px' }} />
      </RadarChart>
    </ResponsiveContainer>
  );
};