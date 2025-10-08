import React from 'react';
import { CompassIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center border-b border-slate-200 pb-6">
      <div className="flex items-center justify-center gap-4 mb-2">
        <CompassIcon className="w-10 h-10 text-green-500" />
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          策略雷達
        </h1>
      </div>
      <p className="text-slate-600 max-w-3xl mx-auto">
        一個系統性工具，用於應對現代設計的複雜約束。<p>透過視覺化您的專案與關鍵成功因素的對齊情況，平衡權衡並做出明智的決策。
      </p>
    </header>
  );
};