import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { ALL_TIME_FRANCHISES } from '../../data/allTimeFranchises';
import { Sparkles, Shield, Globe, ChevronRight } from 'lucide-react';

export const AllTimeFranchisePicker: React.FC = () => {
  const { setSelectedAllTimeFranchise } = useGameStore();

  return (
    <div className="glass-card rounded-3xl p-6 border border-purple-500/40 space-y-6 max-w-4xl mx-auto shadow-[0_0_35px_rgba(168,85,247,0.15)]">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-black uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 fill-current text-purple-400" />
          All-Time XI Mode
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          SELECT YOUR FRANCHISE OR COUNTRY
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto font-medium">
          Choose your favorite Club or Country. The reel spinner will spin through all historical season rosters of your chosen team to build your ultimate All-Time XI!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[58vh] overflow-y-auto pr-1">
        {ALL_TIME_FRANCHISES.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedAllTimeFranchise(item.id)}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/60 hover:bg-slate-800/90 transition cursor-pointer flex flex-col justify-between space-y-3 group hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-md"
                style={{ backgroundColor: item.primaryColor }}
              >
                {item.badgeSymbol}
              </div>
              <span className="text-[10px] font-black text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 uppercase flex items-center gap-1">
                {item.type === 'CLUB' ? <Shield className="w-3 h-3 text-amber-400" /> : <Globe className="w-3 h-3 text-cyan-400" />}
                {item.eraRange}
              </span>
            </div>

            <div>
              <h4 className="text-base font-black text-white group-hover:text-purple-300 transition">
                {item.name}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs font-black text-purple-400 group-hover:text-purple-300">
              <span>Build All-Time XI</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
