import React from 'react';
import { GlassCard } from '../components/GlassUI';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Award, Clock, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  const activityData = [
    { name: 'Mon', score: 65 },
    { name: 'Tue', score: 72 },
    { name: 'Wed', score: 68 },
    { name: 'Thu', score: 85 },
    { name: 'Fri', score: 82 },
    { name: 'Sat', score: 90 },
    { name: 'Sun', score: 88 },
  ];

  const skillData = [
    { subject: 'Confidence', A: 120, fullMark: 150 },
    { subject: 'Clarity', A: 98, fullMark: 150 },
    { subject: 'Pacing', A: 86, fullMark: 150 },
    { subject: 'Body Lang', A: 99, fullMark: 150 },
    { subject: 'Tone', A: 85, fullMark: 150 },
    { subject: 'Vocabulary', A: 65, fullMark: 150 },
  ];

  return (
    <div className="space-y-8 animate-float" style={{ animationDuration: '0.5s', animationName: 'fadeIn' }}>
      <header className="mb-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2">Welcome back, Alex.</h2>
        <p className="text-gray-400">Your AI analysis indicates a 15% improvement in confidence this week.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Sessions</p>
              <h3 className="text-3xl font-bold text-white">24</h3>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-400 text-sm">
             <TrendingUp size={16} className="mr-1" />
             <span>+3 this week</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all"></div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-1">Avg. Score</p>
              <h3 className="text-3xl font-bold text-white">82<span className="text-lg text-gray-500 font-normal">/100</span></h3>
            </div>
            <div className="p-2 bg-violet-500/20 rounded-lg text-violet-400">
              <Award size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-400 text-sm">
             <ArrowUpRight size={16} className="mr-1" />
             <span>Top 10% of users</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl group-hover:bg-violet-500/30 transition-all"></div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden group flex items-center justify-center p-0">
           <div className="text-center p-6 z-10">
              <p className="text-sm text-gray-400 mb-2">Next Milestone</p>
              <h3 className="text-xl font-bold text-white mb-3">Master Orator</h3>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-violet-500 h-full w-[75%]"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">75% Complete</p>
           </div>
           <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5"></div>
        </GlassCard>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="min-h-[350px]">
          <h3 className="text-lg font-medium text-white mb-6">Performance History</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="min-h-[350px]">
          <h3 className="text-lg font-medium text-white mb-6">Skill Breakdown</h3>
          <div className="h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="#8b5cf6"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;