import React from 'react';
import { Home, ArrowLeft, Layers } from 'lucide-react';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-violet-950/60 border border-violet-500/30 text-violet-400 flex items-center justify-center mx-auto shadow-2xl shadow-violet-500/20">
          <Layers className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-violet-400">
            Error 404
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Visual Asset Not Found
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            The page or project design you are looking for has been moved, unpublished, or does not exist.
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
