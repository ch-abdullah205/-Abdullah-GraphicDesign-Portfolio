import { ProfileSettings, Project } from '../types';

export const initialProfile: ProfileSettings = {
  name: 'Abdullah',
  title: 'Graphic Designer & Visual Identity Specialist',
  heroHeading: 'Creative Designs. Powerful Visuals.',
  heroSubtitle: "I'm Abdullah, a Graphic Designer creating impactful posters, branding, and digital designs.",
  aboutBio:
    "I am Abdullah, an enthusiastic and meticulous Graphic Designer with over 5 years of experience crafting high-impact visual identities, commercial advertising posters, social media campaigns, and brand systems. Working with industry-standard tools like Adobe Photoshop, Adobe Illustrator, and Canva, I bridge conceptual creativity with commercial strategy to help businesses stand out and convert.",
  aboutExperienceYears: 5,
  aboutProjectsCompleted: 140,
  aboutHappyClients: 95,
  avatarUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  email: 'abdullah.graphicdesign@example.com',
  whatsapp: '+1 (555) 234-5678',
  linkedin: 'https://linkedin.com/in/abdullah-designer',
  behance: 'https://behance.net/abdullah-visuals',
  instagram: 'https://instagram.com/abdullah.designs',
  location: 'Remote / Worldwide',
  availabilityStatus: 'Available for freelance',
};

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Neon Horizon: Electronic Music Festival Poster',
    category: 'Posters & Advertisements',
    description: 'Electric violet and cyan advertising poster with futuristic typography and high-contrast glow aesthetics.',
    fullDescription:
      'Created an immersive, high-energy festival poster for the annual Neon Horizon Electronic Music Festival. Engineered custom 3D typography in Illustrator and layered chromatic dispersion and lens flare textures in Photoshop to capture the nocturnal electronic atmosphere.',
    coverImage:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85',
    ],
    softwareUsed: ['Adobe Photoshop', 'Adobe Illustrator'],
    client: 'SubSonic Events',
    year: '2026',
    featured: true,
    published: true,
    deliverables: ['A1 Print-Ready Poster', 'Digital Billboard Asset', 'Instagram Story Animated Still'],
    challenge: 'Needed a visual identity that stood out amongst dozens of competing summer music festivals while retaining readability of 20+ artist names.',
    solution: 'Constructed a dynamic diagonal grid with fluorescent typography that draws the eye directly to headliners while maintaining balance across supporting acts.',
    createdAt: '2026-01-15',
  },
  {
    id: 'proj-2',
    title: 'Aura Artisanal Coffee Roastery Brand Identity',
    category: 'Branding',
    description: 'Complete brand identity system, custom wordmark, tactile coffee bag packaging, and brand guidelines.',
    fullDescription:
      'Developed a timeless visual identity for Aura Coffee Roasters. Built a custom organic serif logotype in Adobe Illustrator, paired with an earthy, minimalist color palette and sustainable kraft paper packaging designs.',
    coverImage:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85',
    ],
    softwareUsed: ['Adobe Illustrator', 'Adobe Photoshop'],
    client: 'Aura Roasters Co.',
    year: '2025',
    featured: true,
    published: true,
    deliverables: ['Primary & Secondary Logo Suite', 'Packaging Labels', 'Brand Style Guide (32 pages)', 'Storefront Signage'],
    challenge: 'Differentiating the brand in an oversaturated specialty coffee market where many competitors look identical.',
    solution: 'Designed an artisanal seal and warm typography rooted in traditional craftsmanship with a contemporary editorial feel.',
    createdAt: '2025-11-20',
  },
  {
    id: 'proj-3',
    title: 'The Sovereign: Ultra-Luxury Waterfront Residences',
    category: 'Real Estate Designs',
    description: 'Architectural marketing brochure, outdoor promotional hoardings, and premium digital sales deck.',
    fullDescription:
      'Engineered an opulent marketing campaign for a waterfront penthouse development. Utilized refined gold foil accents over deep charcoal backgrounds, meticulous photo retouching in Photoshop, and clean editorial spreads.',
    coverImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    ],
    softwareUsed: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva'],
    client: 'Vanguard Realty Group',
    year: '2026',
    featured: true,
    published: true,
    deliverables: ['Hardcover Sales Brochure (24 pages)', 'Luxury Real Estate Flyers', 'Social Media Paid Ad Suite', 'Site Hoarding Banners'],
    challenge: 'Targeting ultra-high-net-worth investors requiring an elite standard of elegance without visual clutter.',
    solution: 'Leveraged generous white space, curated architectural photography, and understated typography to convey effortless luxury.',
    createdAt: '2026-02-04',
  },
  {
    id: 'proj-4',
    title: 'Zenith FinTech Growth Carousel Campaign',
    category: 'Social Media Designs',
    description: 'High-converting 10-slide educational carousel for LinkedIn and Instagram with custom infographics.',
    fullDescription:
      'Crafted a viral social media educational carousel for a modern personal finance app. Built in Canva and Illustrator with custom isometric data visualizations and bold hook headlines to maximize bookmark and share rates.',
    coverImage:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    ],
    softwareUsed: ['Canva', 'Adobe Illustrator'],
    client: 'Zenith Money App',
    year: '2026',
    featured: false,
    published: true,
    deliverables: ['10-Slide Instagram Carousel', 'LinkedIn PDF Document', 'Story Companion Graphics'],
    challenge: 'Simplifying complex compound interest algorithms into easily digestible, scroll-stopping social slides.',
    solution: 'Created an alternating color rhythm and slide-continuation visual cues that increased average retention time by 68%.',
    createdAt: '2026-01-28',
  },
  {
    id: 'proj-5',
    title: 'Luminary Organic Botanical Skincare Packaging',
    category: 'Product Designs',
    description: 'Matte glass dropper bottles, embossed outer box packaging, and vector ingredient iconography.',
    fullDescription:
      'Complete product design suite for an all-natural plant-derived skincare line. Prepared precise die-lines in Illustrator, verified CMYK print tolerances, and produced photorealistic product mockups in Photoshop for e-commerce and retail display.',
    coverImage:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=85',
    ],
    softwareUsed: ['Adobe Illustrator', 'Adobe Photoshop'],
    client: 'Luminary Botanicals',
    year: '2025',
    featured: true,
    published: true,
    deliverables: ['Serum Bottle Labels', 'Outer Packaging Die-cuts', '3D E-Commerce Visuals', 'Ingredient Iconography'],
    challenge: 'Meeting strict regulatory text requirements on compact 30ml bottles while maintaining a premium cosmetic look.',
    solution: 'Employed clean micro-typography and unified geometric iconography that balanced legal compliance with beauty aesthetics.',
    createdAt: '2025-10-12',
  },
  {
    id: 'proj-6',
    title: 'Vanguard Aerospace Vector Monogram & Logo',
    category: 'Logo Design',
    description: 'Geometric precision monogram symbolizing aerodynamic propulsion and orbital trajectories.',
    fullDescription:
      'Constructed a scalable vector identity system for an aerospace technology startup. Built with exact golden-ratio circular grids in Adobe Illustrator, ensuring flawless clarity from 16px favicon dimensions to massive aircraft livery.',
    coverImage:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    ],
    softwareUsed: ['Adobe Illustrator'],
    client: 'Vanguard Aero Dynamics',
    year: '2025',
    featured: false,
    published: true,
    deliverables: ['Primary Vector Logo (.AI, .EPS, .SVG)', 'Monogram Icon Mark', 'Monochrome & Reverse Variants', 'Logo Usage Manual'],
    challenge: 'Creating a logo that felt simultaneously timeless, technologically cutting-edge, and easily reproducible on industrial materials.',
    solution: 'Formed a continuous ribbon loop using 45-degree angle vertices that evokes both the letter V and a jet engine turbine.',
    createdAt: '2025-09-08',
  },
  {
    id: 'proj-7',
    title: 'Hydra Shock Commercial Advertising Poster',
    category: 'Posters & Advertisements',
    description: 'Dynamic splash energy drink advertisement poster with composite liquid effects and high-impact slogan.',
    fullDescription:
      'High-impact commercial beverage poster created with complex multi-layer image compositing in Adobe Photoshop. Features dynamic liquid splashes, ice refraction, and explosive kinetic energy to appeal to action sports consumers.',
    coverImage:
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1200&q=85',
    ],
    softwareUsed: ['Adobe Photoshop'],
    client: 'Hydra Energy Beverages',
    year: '2026',
    featured: false,
    published: true,
    deliverables: ['Subway Poster (6-sheet)', 'POS Retail Banner', 'Digital Banner Suite'],
    challenge: 'Creating realistic high-velocity fluid dynamics and ice condensation entirely in 2D post-production.',
    solution: 'Blended 18 distinct high-speed photography elements with custom luminosity masks and directional motion blur in Photoshop.',
    createdAt: '2026-02-18',
  },
  {
    id: 'proj-8',
    title: 'Skyline Heights Modern Luxury Condos Campaign',
    category: 'Real Estate Designs',
    description: 'Bilingual open house invitation cards, feature sheets, and streetfront real estate signage.',
    fullDescription:
      'Executed a comprehensive marketing collateral package for a metropolitan high-rise condominium release. Includes high-resolution floor plan layouts, localized neighborhood maps, and social media advertising sets.',
    coverImage:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    ],
    softwareUsed: ['Adobe Photoshop', 'Canva', 'Adobe Illustrator'],
    client: 'Skyline Development',
    year: '2025',
    featured: false,
    published: true,
    deliverables: ['Real Estate Feature Sheet (8.5x11)', 'A-Frame Open House Signs', 'Facebook & Instagram Paid Ad Set'],
    challenge: 'Presenting dense architectural specifications and amenities without overwhelming prospective homebuyers.',
    solution: 'Designed a structured multi-column card system with high-contrast architectural callouts and clean icons.',
    createdAt: '2025-12-05',
  },
];

export const initialInquiries: {
  id: string;
  clientName: string;
  email: string;
  whatsapp?: string;
  serviceType: string;
  description: string;
  budget?: string;
  status: 'New' | 'In Review' | 'Replied' | 'Closed';
  createdAt: string;
}[] = [
  {
    id: 'inq-101',
    clientName: 'Marcus Vance',
    email: 'marcus@vancebrands.com',
    whatsapp: '+1 (555) 901-4432',
    serviceType: 'Branding and Marketing Graphics',
    description: 'We are launching a new sustainable athletic apparel line and require a complete brand identity, logo suite, clothing hangtags, and launch poster designs.',
    budget: '$1,000 - $2,500',
    status: 'New',
    createdAt: '2026-03-14T10:30:00Z',
  },
  {
    id: 'inq-102',
    clientName: 'Elena Rostova',
    email: 'elena@primeproperties.net',
    whatsapp: '+1 (555) 344-8899',
    serviceType: 'Real Estate and Product Advertisements',
    description: 'Looking for a senior graphic designer to design promotional brochures, flyers, and social ads for three luxury villa developments.',
    budget: '$500 - $1,000',
    status: 'In Review',
    createdAt: '2026-03-12T16:15:00Z',
  },
];
