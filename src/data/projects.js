import aiVideoImg from '../assets/project-ai-video.png'
import sellerSenseImg from '../assets/project-seller-sense.png'
import homeHavenImg from '../assets/project-home-haven.png'
import taskMasterImg from '../assets/project-task-master.png'

export const projects = [
  {
    id: 'ai-video-search',
    title: 'AI Video Search Engine',
    year: '2026',
    description:
      'An AI-powered video search engine enabling semantic text-based search with timestamp-based navigation using Whisper and vector embeddings.',
    highlights: [
      'Converted unstructured videos into searchable content via automated transcription & embeddings',
      'Containerized 7-service microservice architecture with Docker Compose',
      'Built Celery–Redis–FFmpeg background pipeline with automated deployment',
    ],
    stack: ['Python', 'FastAPI', 'React', 'Docker', 'Qdrant', 'Whisper'],
    link: 'https://github.com/SiddhantSangaonkar/ai-video-search',
    accent: 'var(--coral)',
    image: aiVideoImg,
  },
  {
    id: 'seller-sense',
    title: 'SellerSense',
    year: '2026',
    description:
      'A multi-channel commerce management platform consolidating seller reports from multiple marketplaces into a unified analytics dashboard.',
    highlights: [
      'Automated CSV/XLSX ingestion with validation, normalization & duplicate detection',
      'Dynamic profit recalculation through relational PostgreSQL schema',
      'AI-powered insights with rule-based fallback + PDF report generation',
    ],
    stack: ['React', 'TypeScript', 'Express.js', 'PostgreSQL', 'Prisma'],
    link: 'https://github.com/meghana922007/sellersense',
    accent: 'var(--sage)',
    image: sellerSenseImg,
  },
  {
    id: 'home-haven',
    title: 'Home-Haven',
    year: '2025',
    description:
      'A responsive house rental platform with property listings, detailed pages, and smart filtering for an effortless home-search experience.',
    highlights: [
      'Built responsive UI with category-based filtering & property recommendations',
      'Mobile-first design approach for seamless cross-device experience',
      'Clean semantic markup with accessible navigation patterns',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    link: 'https://github.com/meghana922007/HOME-HAVEN-HOUSE-RENTAL-WEBSITE',
    accent: 'var(--lavender)',
    image: homeHavenImg,
  },
  {
    id: 'task-master',
    title: 'TaskMaster',
    year: '2025',
    description:
      'A productivity-focused task management app with drag-and-drop boards, deadline tracking, and team collaboration features.',
    highlights: [
      'Implemented drag-and-drop Kanban boards using native HTML5 APIs',
      'Real-time sync across devices using WebSockets',
      'Dark mode and customizable themes for user preference',
    ],
    stack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
    link: '#',
    accent: 'var(--peach)',
    image: taskMasterImg,
  },
]
