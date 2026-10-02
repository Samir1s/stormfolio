export interface Project {
  id: string;
  title: string;
  category: 'Visual / VFX' | 'Motion Graphics' | 'Cinematic' | 'AI Workflow' | 'AMV';
  video: string;
  thumbnail?: string;
  year: string;
  tools: string;
  description: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'lv-sandals',
    title: 'LV Sandals SFX & Commercial',
    category: 'Visual / VFX',
    video: '/worksvids/Visual/Lv Sandals Sfx Final.mp4',
    thumbnail: '/worksvids/Visual/thumbLv Sandals Sfx Final.png',
    year: '2024',
    tools: 'After Effects • Sound Design • DaVinci Resolve',
    description: 'Luxury commercial product showcase featuring dynamic camera moves, micro-sound design accents, and crisp color science.',
    featured: true,
  },
  {
    id: 'terry-dubrow',
    title: 'Terry Dubrow Promo',
    category: 'Visual / VFX',
    video: '/worksvids/Visual/Terry Dubrow.mp4',
    thumbnail: '/worksvids/Visual/thumbTerry Dubrow.png',
    year: '2024',
    tools: 'After Effects • Premiere Pro • VFX Compositing',
    description: 'High-energy commercial cut with synchronized kinetic typography, visual accents, and punchy pacing.',
    featured: true,
  },
  {
    id: 'phoebe-ai',
    title: 'Phoebe AI Generative',
    category: 'AI Workflow',
    video: '/worksvids/Ai workflow/Phoebe.mp4',
    thumbnail: '/worksvids/Ai workflow/thumbphoebe.png',
    year: '2024',
    tools: 'Runway Gen-2 • ComfyUI • After Effects',
    description: 'Next-gen generative AI visual workflow blending synthetic camera motion with custom post-production finishing.',
    featured: true,
  },
  {
    id: 'mileage-spiderman',
    title: 'Miles Morales Motion',
    category: 'Motion Graphics',
    video: '/worksvids/Motion graphic/Mileage spider man.mp4',
    thumbnail: '/worksvids/Motion graphic/thumbMileage spider man.png',
    year: '2024',
    tools: 'After Effects • Kinetic Typography • VFX',
    description: 'Spider-Verse inspired motion sequence with comic-book halftone overlays, swift velocity curves, and snappy keyframing.',
    featured: true,
  },
  {
    id: 'beauty-beast',
    title: 'Beauty and the Beast Reel',
    category: 'Cinematic',
    video: '/worksvids/Cinematic/Beauty and a beast.mp4',
    thumbnail: '/worksvids/Cinematic/thumbBeauty and a beast.png',
    year: '2024',
    tools: 'Premiere Pro • DaVinci Resolve • Sound Sync',
    description: 'Cinematic narrative edit featuring atmospheric lighting, orchestral cadence, and emotional storytelling flow.',
    featured: true,
  },
  {
    id: 'need-all-of-yaa',
    title: 'Need All Of Yaa - AMV',
    category: 'AMV',
    video: '/worksvids/AMV/Need all of yaa.mp4',
    thumbnail: '/worksvids/AMV/thumbNeed all of yaa.png',
    year: '2024',
    tools: 'After Effects • Twixtor • Flow • Sapphire',
    description: 'Precision beat-synced anime music video with seamless frame blends, velocity curves, and customized transition design.',
    featured: true,
  },
  {
    id: 'claude-motion',
    title: 'Claude Motion Identity',
    category: 'Motion Graphics',
    video: '/worksvids/Motion graphic/Claude mo.mp4',
    thumbnail: '/worksvids/Motion graphic/thumbClaude mo.png',
    year: '2024',
    tools: 'After Effects • Illustrator • Motion Design',
    description: 'Minimalist kinetic brand identity animation showcasing brand typography, geometric transformations, and fluid ease.',
  },
  {
    id: 'ugc-perf',
    title: 'Performance Ad / UGC',
    category: 'Visual / VFX',
    video: '/worksvids/Visual/ugc1_prob4.mp4',
    thumbnail: '/worksvids/Visual/thumbugc1_prob4.png',
    year: '2024',
    tools: 'Premiere Pro • Motion Graphics • Grading',
    description: 'High-retention social performance edit engineered with rapid visual hooks and conversion-focused rhythm.',
  },
  {
    id: 'vvv-hardstyle',
    title: 'VVV Hardstyle Edit',
    category: 'AMV',
    video: '/worksvids/AMV/VVV.mp4',
    thumbnail: '/worksvids/AMV/thumbVVV.png',
    year: '2024',
    tools: 'After Effects • Boris FX • Sound Sync',
    description: 'Extreme speed-ramped audio-visual edit pushing pacing, shutter effects, and brutalist glitch aesthetics.',
  },
];
