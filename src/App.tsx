/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { 
  Signal, 
  Battery, 
  Home as HomeIcon, 
  Briefcase, 
  Trophy, 
  Wrench, 
  MessageSquare, 
  Play, 
  Pause, 
  Info, 
  Volume2, 
  VolumeX,
  Copy,
  Check,
  Download,
  QrCode,
  MapPin,
  Mail,
  Phone,
  Clock,
  Star,
  Heart,
  Music,
  School,
  Globe,
  BarChart3,
  Users,
  Search,
  ShieldAlert,
  ClipboardList,
  Layers,
  FileText,
  Eye,
  Calendar,
  Zap,
  CreditCard,
  TrendingUp,
  X
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'internship' | 'projects' | 'skills' | 'contact' | 'future';

// --- Components ---

const StatusBar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center px-4 py-2 text-[10px] bg-black/20">
      <div className="flex items-center gap-1">
        <span>{time}</span>
        <HomeIcon size={10} />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-[1px]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-[2px] h-[6px] ${i < 4 ? 'bg-white' : 'bg-white/30'}`} />
          ))}
        </div>
        <span>5G</span>
        <div className="flex items-center gap-1 bg-pixel-pink px-1 rounded-sm">
          <span>10</span>
        </div>
      </div>
    </div>
  );
};

const TitleBar = ({ onShowRules, isBgmPlaying, setIsBgmPlaying }: { onShowRules: () => void, isBgmPlaying: boolean, setIsBgmPlaying: (play: boolean) => void }) => {
  return (
    <div className="px-3 py-1 bg-[#4a90e2]/80 border-y border-white/20 flex items-center justify-end font-sans">
      <div className="flex gap-1">
        <button 
          onClick={onShowRules}
          className="px-2 py-1 bg-white/90 text-black text-[8px] pixel-border-white hover:bg-white"
        >
          规则(R)
        </button>
        <button 
          onClick={() => setIsBgmPlaying(!isBgmPlaying)}
          className="px-2 py-1 bg-[#2c3e50] text-white text-[8px] pixel-border-white hover:bg-[#34495e] flex items-center gap-1"
        >
          {isBgmPlaying ? <Volume2 size={8} /> : <VolumeX size={8} />}
          音乐:{isBgmPlaying ? '开' : '关'}
        </button>
      </div>
    </div>
  );
};

// --- Pages ---

const HomePage = ({ isBgmPlaying, setIsBgmPlaying }: { isBgmPlaying: boolean, setIsBgmPlaying: (play: boolean) => void }) => {
  const eyeContainerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for eye movement
  const springConfig = { damping: 20, stiffness: 200 };
  const eyeX = useSpring(mouseX, springConfig);
  const eyeY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeContainerRef.current) return;
      
      const rect = eyeContainerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance and angle
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      
      // Constraint the movement within a small circle (radius of 3px)
      const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 25, 3);
      
      mouseX.set(Math.cos(angle) * distance);
      mouseY.set(Math.sin(angle) * distance);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="h-full relative overflow-hidden flex flex-col p-3 bg-[#0d0221]">
      {/* Retro Pixel Art Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0221] via-[#240b36] to-[#4a148c] opacity-80" />
        
        {/* Distant Twinkling Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{ 
              top: `${Math.random() * 60}%`, 
              left: `${Math.random() * 100}%` 
            }}
          />
        ))}

        {/* Large Pixel Moon */}
        <div className="absolute top-8 right-8 w-16 h-16 bg-[#fffde7] rounded-full shadow-[0_0_20px_rgba(255,253,231,0.4)] flex items-center justify-center">
            <div className="w-12 h-12 bg-black/10 rounded-full blur-[2px] translate-x-2" />
        </div>

        {/* City Silhouette Layers */}
        <div className="absolute bottom-0 w-full h-32 flex items-end">
          <div className="relative w-full h-full">
            {/* Back Layer */}
            <div className="absolute bottom-0 w-[200%] h-24 bg-[url('https://picsum.photos/seed/pcity2/800/200')] bg-repeat-x bg-contain opacity-20 pixelated animate-marquee-pixel-slow" 
                 style={{ filter: 'brightness(0) sepia(1) hue-rotate(240deg) contrast(2)' }} />
            {/* Middle Layer */}
            <div className="absolute bottom-0 w-[200%] h-16 bg-[url('https://picsum.photos/seed/pcity1/800/100')] bg-repeat-x bg-contain opacity-40 pixelated animate-marquee-pixel"
                 style={{ filter: 'brightness(0) sepia(1) hue-rotate(270deg) contrast(2)' }} />
            {/* Front Ground */}
            <div className="absolute bottom-0 w-full h-8 bg-[#0d0221] border-t-2 border-pixel-blue/50" />
          </div>
        </div>

        {/* Retro Grid Floor Effect */}
        <div 
          className="absolute bottom-0 w-full h-16 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 10px',
            transform: 'perspective(100px) rotateX(60deg)',
            transformOrigin: 'bottom'
          }}
        />
      </div>

      {/* Top Status Area */}
      <div className="flex gap-4 mb-8 relative z-10 scale-110 origin-top-left">
        <div className="w-16 h-16 bg-white p-[2px] pixel-border-white">
          <img src="/input_file_0.png" alt="Avatar" className="w-full h-full object-cover pixelated" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/avatar/100/100'; }} />
          <div className="absolute -bottom-1 -left-1 bg-black text-[6px] px-1">大彻大悟</div>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="bg-white/20 backdrop-blur-md p-1 border border-white/30 flex justify-between items-center">
            <span className="text-[8px] text-white">钟咏昊</span>
            <div className="w-12 h-1 bg-white/20">
              <div className="h-full bg-pixel-blue w-3/4" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1 bg-[#95a5a6]/40 p-1 border border-white/20 text-center">
              <div className="text-[6px] opacity-80 flex items-center justify-center gap-1">
                <School size={8} /> 学校
              </div>
              <div className="text-[10px] font-bold">深圳大学</div>
            </div>
            <div className="flex-1 bg-[#95a5a6]/40 p-1 border border-white/20 text-center">
              <div className="text-[6px] opacity-80 flex items-center justify-center gap-1">
                <Globe size={8} /> 专业
              </div>
              <div className="text-[10px] font-bold">网络与新媒体</div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Character Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="bg-white/90 text-black px-5 py-1.5 pixel-border-white text-[11px] mb-12 font-bold relative">
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-white/90" />
          困倦又爱当现场气氛组
        </div>

        <div className="relative mb-12 scale-110">
          {/* TV Head Character */}
          <div className="w-32 h-24 bg-white pixel-border-white flex flex-col items-center justify-center relative shadow-[0_6px_0_rgba(0,0,0,0.2)]">
             <div ref={eyeContainerRef} className="flex gap-3 mb-1.5">
               <motion.div 
                 style={{ x: eyeX, y: eyeY }}
                 className="w-3 h-3 bg-black rounded-full opacity-80" 
               />
               <motion.div 
                 style={{ x: eyeX, y: eyeY }}
                 className="w-3 h-3 bg-black rounded-full opacity-80" 
               />
             </div>
             <div className="w-8 h-0.5 bg-black rounded-full opacity-60" />
             {/* Antenna */}
             <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex gap-4">
               <div className="w-1 h-6 bg-black -rotate-12 origin-bottom shadow-sm" />
               <div className="w-1 h-6 bg-black rotate-12 origin-bottom shadow-sm" />
             </div>
             {/* Headset */}
             <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-pixel-pink pixel-border-white" />
          </div>
          
          {/* Floating Arrows */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-30">
            <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-white rotate-45" />
            <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-white rotate-45" />
          </div>
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-30">
            <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-white rotate-45" />
            <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-white rotate-45" />
          </div>
        </div>

        {/* Music Player Widget */}
        <button 
          onClick={() => setIsBgmPlaying(!isBgmPlaying)}
          className="w-52 bg-white/5 backdrop-blur-md p-2.5 pixel-border-white flex items-center gap-4 mt-2 transition-transform active:scale-95 group"
        >
          <div className="flex gap-[2px] items-end h-5 flex-1">
            {[...Array(14)].map((_, i) => (
              <motion.div 
                key={i}
                animate={isBgmPlaying ? { height: [4, 14, 8, 20, 4] } : { height: 4 }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08 }}
                className={`w-1.5 ${isBgmPlaying ? 'bg-pixel-blue' : 'bg-white/20'}`}
              />
            ))}
          </div>
          <Music size={16} className={`${isBgmPlaying ? 'text-pixel-blue animate-bounce' : 'text-white/40'}`} />
          <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${isBgmPlaying ? 'border-pixel-blue' : 'border-white/20'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isBgmPlaying ? 'bg-pixel-blue animate-ping' : 'bg-white/10'}`} />
          </div>
        </button>
      </div>
    </div>
  );
};

const InternshipPage = () => {
  const internships = [
    {
      company: "腾讯音乐娱乐集团",
      period: "2025.09-2026.01",
      difficulty: 4,
      reward: "全流程用户调研",
      achievements: [
        { icon: <BarChart3 size={16} />, label: "问卷投放和量化分析" },
        { icon: <Users size={16} />, label: "用户反馈获取与分析" },
        { icon: <Search size={16} />, label: "桌面研究与资料整理" }
      ]
    },
    {
      company: "深圳减字科技（蕉下）",
      period: "2025.07-2025.09",
      difficulty: 3,
      reward: "竞品分析+产品测评",
      achievements: [
        { icon: <ShieldAlert size={16} />, label: "竞品分析与风险识别" },
        { icon: <ClipboardList size={16} />, label: "用户调研与需求挖掘" },
        { icon: <Layers size={16} />, label: "项目推进与协同管理" }
      ]
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6 custom-scrollbar bg-[#2c3e50]">
      <h2 className="text-pixel-blue text-[14px] mb-4 border-b-2 border-pixel-blue pb-1">实习副本</h2>
      <div className="relative pl-4 border-l-2 border-pixel-blue/30 space-y-8">
        {internships.map((item, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-[21px] top-0 w-4 h-4 bg-pixel-blue pixel-border-white rounded-full" />
            <div className="bg-black/40 p-3 pixel-border-white space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-[11px] font-bold text-pixel-yellow">{item.company}</h3>
                <span className="text-[8px] opacity-60">{item.period}</span>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-[8px] ${i < item.difficulty ? 'text-pixel-pink' : 'text-gray-600'}`}>⭐</span>
                ))}
              </div>
              <p className="text-[9px] text-pixel-blue">奖励: 获得"{item.reward}"技能</p>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-[8px] text-pixel-pink mb-3 font-bold">已解锁成就:</p>
                <div className="grid grid-cols-3 gap-2">
                  {item.achievements.map((ach, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center text-center gap-2 p-2 bg-white/5 pixel-border-white hover:bg-white/10 transition-colors"
                    >
                      <div className="text-pixel-yellow drop-shadow-[0_0_2px_rgba(255,215,0,0.5)]">
                        {ach.icon}
                      </div>
                      <span className="text-[7px] leading-tight opacity-90">{ach.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ProjectSection {
  title: string;
  role: string;
  period: string;
  color: string;
  borderColor: string;
  link?: string;
  stats?: { label: string; value: string; icon: React.ReactNode }[];
  points: { tag: string; content: string }[];
  works?: { label: string; link: string }[];
}

interface ExperienceCategory {
  category: string;
  sections: ProjectSection[];
}

const ProjectsPage = () => {
  const experiences: ExperienceCategory[] = [
    {
      category: "校园经历 Campus experience",
      sections: [
        {
          title: "院学生会新媒体部",
          role: "部长",
          period: "2023.09-2025.09",
          color: "text-pixel-pink",
          borderColor: "border-pixel-pink",
          stats: [
            { label: "发布文章", value: "40+", icon: <FileText size={10} /> },
            { label: "累计阅读", value: "4w+", icon: <Eye size={10} /> },
            { label: "粉丝增长", value: "1k+", icon: <Users size={10} /> },
            { label: "线下活动", value: "6场", icon: <Calendar size={10} /> }
          ],
          points: [
            {
              tag: "用户研究与内容运营",
              content: "负责官方微信公众号与小红书平台日常更新维护，发布40+篇文章，累计阅读量达4w+，粉丝增长1k+，平均阅读量提升10%；通过后台数据分析，提出内容优化方案，提升公众号影响力。"
            },
            {
              tag: "活动策划与用户洞察",
              content: "对接营销推广项目，与蕉下、顺丰、京东校园等品牌合作，策划落地6场线下活动，累计互动人次4k+；通过活动反馈，优化后续活动策划，增强用户互动体验。"
            }
          ],
          works: [
            { label: "晚会回顾 | 共饮一杯时光特调", link: "https://mp.weixin.qq.com/s/GtQlFy2QDQrlXkQIJ_YWwQ" },
            { label: "Magic experience in SMC | 无限翻转", link: "https://mp.weixin.qq.com/s/QaP14iriJKFOMGjUsaTDqQ" },
            { label: "传院携蕉下惊喜来袭——春日去野", link: "https://mp.weixin.qq.com/s/gQ7Xw8rPiOi6VdBHDRoNZg" },
            { label: "欢迎试玩牛仔的信仰！", link: "https://mp.weixin.qq.com/s/WRA45ApG_0zUXDx-eC2gEw" }
          ]
        }
      ]
    },
    {
      category: "项目经历 Project Experience",
      sections: [
        {
          title: "小红书个人IP搭建",
          role: "学习博主",
          period: "2023.09-2025.09",
          color: "text-pixel-yellow",
          borderColor: "border-pixel-yellow",
          link: "https://www.xiaohongshu.com/user/profile/60d80723000000000100568b?xsec_token=YBDcwIioaZ3Mhdlzcv3aqFsDJQunmqOQwUL1ZrpmxIlrU=&xsec_source=app_share&xhsshare=CopyLink&shareRedId=ODZGODM8Njw2NzUyOTgwNjY0OTc5Oz5L&apptime=1776573830&share_id=b8ded1d1eeb54c429c4a698f3cb9dd19",
          stats: [
            { label: "点赞收藏", value: "16k+", icon: <Star size={10} /> },
            { label: "最高浏览", value: "3.5w+", icon: <Zap size={10} /> },
            { label: "变现金额", value: "5w+", icon: <CreditCard size={10} /> },
            { label: "用户转化", value: "10+", icon: <TrendingUp size={10} /> }
          ],
          points: [
            {
              tag: "用户洞察与内容创作",
              content: "专注于学习领域的自媒体运营，发布20+篇原创帖子。通过深入研究用户需求和痛点，结合自身学习经验，制作出具有实用性和吸引力的内容，受到用户的广泛关注。帖子总点赞量和收藏量达16k+，最高浏览量达3.5w+。"
            },
            {
              tag: "用户转化与私域运营",
              content: "探索用户转化渠道，利用优质的学习资料将公域用户引流至私域。通过朋友圈销售、平台上架商品、私聊高意向用户等方式，成功转化用户10+位，累计变现金额达5w+。"
            },
            {
              tag: "受众分析与市场洞察",
              content: "持续跟踪分析30+位对标博主，深入研究他们的内容风格、粉丝群体和运营策略。深度了解10+位粘性粉丝，通过评论互动、私信交流等方式，收集用户反馈，优化内容创作。"
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-4 space-y-8 custom-scrollbar bg-[#2c3e50]">
      {experiences.map((categoryGroup, groupIdx) => (
        <div key={groupIdx} className="space-y-4">
          <h2 className={`text-[13px] font-bold border-b-2 border-white/20 pb-1 flex items-center gap-2 text-white`}>
             <Star size={14} className="text-pixel-yellow" />
             {categoryGroup.category}
          </h2>
          
          <div className="relative pl-4 border-l-2 border-white/10 space-y-6">
            {categoryGroup.sections.map((section, secIdx) => (
              <div key={secIdx} className="relative">
                <div className={`absolute -left-[21px] top-0 w-4 h-4 rounded-full bg-[#2c3e50] border-2 ${section.borderColor}`} />
                
                <div className="bg-black/30 p-3 pixel-border-white space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`text-[11px] font-bold ${section.color}`}>{section.title}</h3>
                      <p className="text-[9px] text-white/80 mt-0.5">{section.role}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[8px] opacity-50 font-mono italic">{section.period}</span>
                      {section.link && (
                        <a 
                          href={section.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-2 py-0.5 bg-pixel-blue text-white text-[8px] pixel-border-white hover:pixel-btn-active flex items-center gap-1"
                        >
                          <Globe size={8} /> 查看主页
                        </a>
                      )}
                    </div>
                  </div>

                  {section.stats && (
                    <div className="space-y-2 py-2">
                       <div className="flex items-center gap-2">
                         <div className={`h-[2px] flex-1 bg-gradient-to-r from-transparent to-${section.borderColor.replace('border-', '')}/30`} />
                         <span className="text-[7px] opacity-40 font-bold tracking-widest uppercase">Status Board</span>
                         <div className={`h-[2px] flex-1 bg-gradient-to-l from-transparent to-${section.borderColor.replace('border-', '')}/30`} />
                       </div>
                       <div className="grid grid-cols-4 gap-2">
                          {section.stats.map((stat, sIdx) => (
                            <motion.div 
                              key={sIdx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: sIdx * 0.1 }}
                              className="bg-white/5 p-1.5 pixel-border-white text-center flex flex-col items-center gap-1 group hover:bg-white/10 transition-colors cursor-default"
                            >
                              <div className={`${section.color} opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                              <div className="text-[9px] font-bold text-white leading-none mt-1">{stat.value}</div>
                              <div className="text-[6px] opacity-40 uppercase tracking-tighter whitespace-nowrap">{stat.label}</div>
                            </motion.div>
                          ))}
                       </div>
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    {section.points.map((point, pIdx) => (
                      <div key={pIdx} className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Check size={10} className={section.color} />
                          <span className={`text-[9px] font-bold ${section.color}`}>【{point.tag}】</span>
                        </div>
                        <p className="text-[9px] leading-relaxed text-white/90 pl-3.5 border-l border-white/10 ml-1.5">
                          {point.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {section.works && (
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <p className="text-[8px] text-pixel-yellow font-bold flex items-center gap-2">
                        <Star size={10} fill="currentColor" /> 代表作品展示
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {section.works.map((work, wIdx) => (
                          <a 
                            key={wIdx}
                            href={work.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/5 p-2 pixel-border-white flex items-center justify-between gap-2 hover:bg-white/10 transition-colors group"
                          >
                            <span className="text-[8px] text-white/80 group-hover:text-pixel-blue line-clamp-1 text-left">{work.label}</span>
                            <Globe size={10} className="text-pixel-blue opacity-50 group-hover:opacity-100 flex-shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const SkillsPage = () => {
  const skillGroups = [
    {
      title: "数据分析装备",
      icon: <Wrench size={14} />,
      skills: [
        { name: "SPSS", level: 90, desc: "熟悉描述性分析、独立性分析、相关性分析" },
        { name: "Excel", level: 85, desc: "熟练掌握SUMIFS、VLOOKUP函数及数据透视表" },
        { name: "八爪鱼", level: 80, desc: "高效网页数据解析与自动化爬取采集" },
        { name: "Tableau", level: 75, desc: "业务数据可视化看板展示与逻辑制作" },
        { name: "Python", level: 50, desc: "基础数据清洗与自动化办公脚本处理" }
      ]
    },
    {
      title: "设计原型装备",
      icon: <Star size={14} />,
      skills: [
        { name: "Canva", level: 100, desc: "精通商业海报、新媒体运营配图快速出图" },
        { name: "Figma", level: 75, desc: "产品交互设计、UI界面绘制与团队协作" },
        { name: "Axure", level: 70, desc: "具备高保真、复杂逻辑交互的原型设计能力" },
        { name: "PS/AI", level: 65, desc: "图片视觉后期处理及矢量图形图标绘制" }
      ]
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6 custom-scrollbar bg-[#2c3e50]">
      <h2 className="text-pixel-yellow text-[14px] mb-4 border-b-2 border-pixel-yellow pb-1">技能装备</h2>
      {skillGroups.map((group, idx) => (
        <div key={idx} className="space-y-3">
          <div className="flex items-center gap-2 text-pixel-blue">
            {group.icon}
            <h3 className="text-[11px] font-bold">{group.title}</h3>
          </div>
          <div className="space-y-4 pl-2">
            {group.skills.map((skill, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                <div className="flex justify-between text-[8px]">
                  <span className="font-bold">{skill.name}</span>
                  <span className="opacity-60">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 pixel-border-white p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-pixel-blue"
                  />
                </div>
                {skill.desc && (
                  <p className="text-[7px] text-white/40 leading-tight pl-1 border-l border-white/10 italic">
                    &gt; {skill.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ContactPage = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const contactInfo = [
    { icon: <Phone size={14} />, label: "手机号", value: "15767765535", copy: "15767765535" },
    { icon: <Mail size={14} />, label: "邮箱", value: "979081235@qq.com", copy: "979081235@qq.com" },
    { icon: <MapPin size={14} />, label: "居住地", value: "广东深圳" },
    { icon: <Clock size={14} />, label: "到岗时间", value: "可立即到岗" }
  ];

  return (
    <div className="h-full flex flex-col p-4 space-y-6 bg-[#2c3e50] relative">
      <h2 className="text-pixel-pink text-[14px] mb-4 border-b-2 border-pixel-pink pb-1">联系我</h2>
      
      <div className="space-y-4 flex-1">
        {contactInfo.map((info, idx) => (
          <div key={idx} className="flex items-center justify-between bg-black/40 p-3 pixel-border-white">
            <div className="flex items-center gap-3">
              <div className="text-pixel-blue">{info.icon}</div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] opacity-60">{info.label}</span>
                <span className="text-[10px]">{info.value}</span>
              </div>
            </div>
            {info.copy && (
              <button 
                onClick={() => handleCopy(info.copy!, info.label)}
                className="p-1 bg-pixel-blue/20 hover:bg-pixel-blue/40 pixel-border-white transition-colors"
              >
                {copied === info.label ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center justify-center gap-2 p-3 bg-pixel-blue pixel-border-white hover:pixel-btn-active active:pixel-btn-active">
          <Download size={16} />
          <span className="text-[8px]">下载PDF简历</span>
        </button>
        <button 
          onClick={() => setShowQR(true)}
          className="flex flex-col items-center justify-center gap-2 p-3 bg-pixel-pink pixel-border-white hover:pixel-btn-active active:pixel-btn-active"
        >
          <QrCode size={16} />
          <span className="text-[8px]">扫码加微信</span>
        </button>
      </div>

      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-2 pixel-border-white relative max-w-[240px] w-full"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute -top-3 -right-3 w-6 h-6 bg-pixel-pink pixel-border-white flex items-center justify-center hover:pixel-btn-active text-white z-10"
              >
                <X size={14} />
              </button>
              <div className="bg-white p-1">
                <img 
                  src="https://picsum.photos/seed/wechat-qr/600/800" 
                  alt="WeChat QR Code" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-2 text-center">
                <p className="text-[8px] text-black font-bold uppercase tracking-tight">Scan to add me</p>
                <p className="text-[6px] text-gray-500 mt-0.5">是昊昊不是好好</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {copied && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 pixel-border text-[10px] z-[60]"
          >
            复制成功!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FuturePage = ({ onStart, onShowRules }: { onStart: () => void, onShowRules: () => void }) => {
  return (
    <div className="h-full relative overflow-hidden flex flex-col items-center justify-center bg-[#4fc3f7] p-8">
      {/* Background Bubbles/Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4fc3f7] via-[#81d4fa] to-[#f48fb1] opacity-60" />
      
      {/* Floating Sprites */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 text-6xl opacity-20 pointer-events-none select-none"
      >
        💿
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
            className="absolute border-2 border-white/20 rounded-full bg-white/5 backdrop-blur-[1px]"
            style={{
              width: 15 + Math.random() * 70,
              height: 15 + Math.random() * 70,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content Area - Desktop Optimized */}
      <div className="relative w-full h-full flex items-center justify-center gap-20 lg:gap-32 px-12 z-10">
        
        {/* Left Side: Gaming Device */}
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            className="relative z-20 w-64 h-96 bg-[#f0f0f0] pixel-border p-6 flex flex-col gap-4 rounded-b-2xl shadow-[15px_15px_0px_rgba(0,0,0,0.2)]"
          >
            <div className="bg-[#1a1a1a] p-3 pixel-border h-60 flex flex-col rounded-sm">
              <div className="flex justify-between text-[6px] text-gray-500 mb-2 font-mono">
                <span className="flex items-center gap-1 text-[8px]">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  POWER
                </span>
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-red-500/30" />
                  <div className="w-4 h-4 bg-red-600 rounded-full border border-black/50 shadow-inner" />
                </div>
              </div>
              <div className="flex-1 bg-pink-400 pixel-border flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/gradient/400/400')] opacity-30 mix-blend-overlay" />
                 <motion.div
                   animate={{ 
                     y: [0, -10, 0],
                     rotate: [-2, 2, -2]
                   }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="z-10 relative"
                 >
                   <span className="text-8xl drop-shadow-xl">👦</span>
                   <div className="absolute -top-6 -right-6 text-3xl animate-bounce">💬</div>
                 </motion.div>
              </div>
              <div className="mt-4 text-center text-[12px] text-pixel-yellow tracking-[0.2em] font-black italic">
                MASTERS-V1
              </div>
            </div>

            <div className="flex justify-between items-center px-2 mt-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="w-8 h-8 bg-pixel-yellow rounded-full pixel-border shadow-md active:translate-y-1 transition-transform cursor-pointer" />
                  <div className="w-8 h-8 bg-pixel-yellow rounded-full pixel-border shadow-md active:translate-y-1 transition-transform cursor-pointer" />
                  <div className="w-8 h-8 bg-pixel-yellow rounded-full pixel-border shadow-md active:translate-y-1 transition-transform cursor-pointer" />
                  <div className="w-8 h-8 bg-pixel-yellow rounded-full pixel-border shadow-md active:translate-y-1 transition-transform cursor-pointer" />
               </div>
               <div className="flex flex-col gap-6 rotate-[15deg] mr-2">
                  <div className="w-16 h-4 bg-pixel-blue pixel-border shadow-sm active:translate-x-1 transition-transform cursor-pointer" />
                  <div className="w-16 h-4 bg-pixel-blue pixel-border shadow-sm active:translate-x-1 transition-transform cursor-pointer" />
               </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Title and Buttons */}
        <div className="flex flex-col items-center lg:items-start gap-10">
          <div>
            <motion.h1 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-pixel-blue drop-shadow-[0_8px_0_#4a148c] tracking-tighter"
            >
              PROFILE
            </motion.h1>
            <p className="text-white/60 font-mono tracking-widest mt-2 text-xs bg-black/10 px-2 py-1 border-l-2 border-white/20">Zhong Yonghao's Career Game</p>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-[280px]">
            <button 
              onClick={onStart} 
              className="win95-btn px-10 py-4 font-black text-[15px] hover:pixel-btn-active active:pixel-btn-active uppercase tracking-[0.1em] bg-pixel-yellow text-black flex items-center justify-center gap-3 group"
            >
              <Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
              START GAME
            </button>
            <button 
              onClick={onShowRules}
              className="win95-btn px-10 py-4 font-bold text-[13px] uppercase tracking-widest bg-white/20 text-white flex items-center justify-center gap-3 hover:bg-white/30"
            >
              <Info size={16} className="group-hover:rotate-12 transition-transform" />
              GUIDE / RULES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('future');
  const [isStarted, setIsStarted] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);
  const bgmRef = useRef<HTMLAudioElement>(null);

  const handleStart = () => {
    setIsStarted(true);
    setCurrentPage('home');
    setIsBgmPlaying(true);
    if (bgmRef.current) {
      bgmRef.current.play().catch(e => console.log("Audio play failed, user gesture required", e));
    }
  };

  useEffect(() => {
    if (bgmRef.current) {
      if (isBgmPlaying) {
        bgmRef.current.play().catch(e => console.log("Audio play blocked", e));
      } else {
        bgmRef.current.pause();
      }
    }
  }, [isBgmPlaying]);

  const navItems: { id: Page; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <div className="w-8 h-8 bg-white/20 pixel-border flex items-center justify-center">📝</div>, label: '首页' },
    { id: 'internship', icon: <div className="w-8 h-8 bg-white/20 pixel-border flex items-center justify-center">📧</div>, label: '实习经历' },
    { id: 'projects', icon: <div className="w-8 h-8 bg-white/20 pixel-border flex items-center justify-center">👥</div>, label: '校园经历' },
    { id: 'skills', icon: <div className="w-8 h-8 bg-white/20 pixel-border flex items-center justify-center">📖</div>, label: '工具技能' },
    { id: 'contact', icon: <div className="w-8 h-8 bg-white/20 pixel-border flex items-center justify-center">💬</div>, label: '联系' }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-[10%] text-6xl"
        >
          👾
        </motion.div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-[20%] text-4xl"
        >
          🛸
        </motion.div>
        <motion.div 
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-1/4 left-[15%] text-4xl"
        >
          🎵
        </motion.div>
      </div>

      {/* Phone Shell */}
      <div className="relative w-[1100px] h-[680px] metallic-shell p-8 rounded-[30px] flex flex-col overflow-visible shadow-2xl">
        
        {/* Y2K Decorative Wings/Stars */}
        <div className="absolute -top-12 -left-12 w-48 h-48 y2k-wing pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white/30 fill-current">
            <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
          </svg>
        </div>
        <div className="absolute -top-12 -right-12 w-48 h-48 y2k-wing pointer-events-none rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white/30 fill-current">
            <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
          </svg>
        </div>
        <div className="absolute -bottom-12 -right-12 w-56 h-56 y2k-wing pointer-events-none">
          <Heart size={60} className="text-white/10" />
        </div>

        {/* Screen Container */}
        <div className="flex-1 bg-black pixel-border flex flex-col overflow-hidden relative screen-inner-shadow">
          {isStarted && <StatusBar />}
          {isStarted && <TitleBar 
            onShowRules={() => setShowRules(true)} 
            isBgmPlaying={isBgmPlaying}
            setIsBgmPlaying={setIsBgmPlaying}
          />}
          
          {/* Main Content Area */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {currentPage === 'home' && <HomePage isBgmPlaying={isBgmPlaying} setIsBgmPlaying={setIsBgmPlaying} />}
                {currentPage === 'internship' && <InternshipPage />}
                {currentPage === 'projects' && <ProjectsPage />}
                {currentPage === 'skills' && <SkillsPage />}
                {currentPage === 'future' && <FuturePage onStart={handleStart} onShowRules={() => setShowRules(true)} />}
                {currentPage === 'contact' && <ContactPage />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          {isStarted && (
            <div className="p-3 bg-gradient-to-b from-[#4a90e2] to-[#357abd] border-t-2 border-white/40">
              <div className="grid grid-cols-5 gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex flex-col items-center justify-center gap-1 transition-all ${
                      currentPage === item.id 
                        ? 'scale-110' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className={`p-1 pixel-border-white bg-white/20 ${currentPage === item.id ? 'bg-white/40' : ''}`}>
                      {item.icon}
                    </div>
                    <span className="text-[8px] text-white font-bold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Text */}
        <div className="mt-6 text-center space-y-1">
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-bold tracking-widest">个人作品集</span>
            <Star size={12} fill="currentColor" />
          </div>
          <p className="text-[8px] text-gray-400 tracking-tighter uppercase">MY PROFILE</p>
        </div>

        {/* Rules Popup */}
        <AnimatePresence>
          {showRules && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowRules(false)}
            >
              <motion.div 
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-zinc-800 p-6 pixel-border-white max-w-xs space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-pixel-yellow text-[12px] border-b-2 border-pixel-yellow pb-2 font-black italic flex items-center gap-2">
                  <Trophy size={14} /> PLAYER MANUAL / 玩家手册
                </h3>
                <div className="text-[9px] space-y-4 leading-relaxed max-h-[280px] overflow-y-auto pr-2 custom-scrollbar text-white/90">
                  <div className="space-y-1">
                    <p className="text-pixel-blue font-bold">&gt; [欢迎进入我的数字时空]</p>
                    <p>你好！我是钟咏昊。非常感谢你点击进入我的职场养成游戏。这不仅仅是一份简历，更是我成长的“漫游指南”。</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-pixel-pink font-bold border-l-2 border-pixel-pink pl-2">🚩 玩法说明：</p>
                    <ul className="space-y-2 opacity-80 pl-2">
                      <li>• <span className="text-pixel-blue">【实习副本】</span>：这里记录了我与腾讯音乐、蕉下等大厂BOSS的“实战演习”，查看我解锁的职业技能与成就。</li>
                      <li>• <span className="text-pixel-pink">【校园任务】</span>：从学生会新媒体部长到自媒体博主，这是我的“支线任务”成长线，包含了我的代表作与数据成果。</li>
                      <li>• <span className="text-pixel-yellow">【装备一览】</span>：展示了我的数据工具、原型设计与行业认知等“属性加点”。</li>
                    </ul>
                  </div>

                  <div className="bg-black/40 p-3 italic border-l-2 border-white/20">
                    <p>"每一个像素点都记录了我对新媒体与用户洞察的热爱。希望你能在这个小小的世界里，感受到我的那份诚心与创造力。"</p>
                  </div>

                  <p className="text-center text-pixel-yellow animate-pulse font-bold mt-4 tracking-widest">- 祝你游戏愉快，祝我们合作愉快 -</p>
                </div>
                <button 
                  onClick={() => setShowRules(false)}
                  className="w-full py-2 bg-pixel-blue pixel-border-white text-[10px] font-bold hover:pixel-btn-active uppercase transition-all"
                >
                  Confirm / 开启旅程
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <audio 
        ref={bgmRef}
        src="https://cdn.pixabay.com/audio/2021/08/04/audio_02462e92c2.mp3" 
        loop 
      />

      <style>{`
        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 10s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-100%, 0); }
        }
        .pixelated {
          image-rendering: pixelated;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1E88E5;
        }
      `}</style>
    </div>
  );
}
