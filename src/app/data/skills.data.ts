export interface SkillGroup {
  label: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    label: 'Frontend',
    items: ['Angular (14 → 20)', 'React', 'TypeScript', 'JavaScript', 'HTML5 / CSS3', 'Bootstrap'],
  },
  {
    label: 'Backend',
    items: ['C#', '.NET / ASP.NET', 'Node.js', 'PHP', 'CodeIgniter', 'Arquitectura por capas'],
  },
  {
    label: 'IA & Automatización',
    items: [
      'API de Anthropic (Claude)',
      'Herramientas de corrección asistida por IA',
      'Control de costo y rate-limiting en llamadas a LLMs',
      'Prompt engineering aplicado a flujos de negocio',
    ],
  },
  {
    label: 'Datos',
    items: ['SQL Server', 'PostgreSQL', 'Supabase', 'phpMyAdmin', 'Modelado de bases de datos'],
  },
  {
    label: 'Integraciones',
    items: ['APIs REST', 'JWT', 'Pasarela Bancolombia', 'CRM Bitrix24', 'Sistemas POS', 'Plataformas de identidad'],
  },
  {
    label: 'Despliegue & Infraestructura',
    items: ['Windows Server', 'Linux (VPS)', 'Hosting & dominios', 'Git / Git Flow'],
  },
  {
    label: 'Metodologías',
    items: ['Scrum', 'Kanban'],
  },
];

export interface ServiceArea {
  title: string;
  description: string;
  points: string[];
}

export const SERVICES: ServiceArea[] = [
  {
    title: 'Desarrollo Full Stack',
    description:
      'Aplicaciones web completas — de la base de datos a la interfaz — pensadas para escalar y para que otro desarrollador pueda continuarlas sin fricción.',
    points: ['Angular / React', '.NET / Node.js', 'Arquitectura por capas'],
  },
  {
    title: 'APIs & Arquitectura Backend',
    description:
      'Diseño de APIs REST seguras y mantenibles, con autenticación por token y una separación clara de responsabilidades entre capas.',
    points: ['APIs REST + JWT', 'Clean Architecture', 'Modelado de bases de datos'],
  },
  {
    title: 'Integración de Inteligencia Artificial',
    description:
      'Incorporo IA a flujos de negocio reales — OCR, verificación de documentos, agentes de corrección — con control de costo y manejo responsable de límites de tasa.',
    points: ['API de Anthropic (Claude)', 'Automatización de procesos', 'Agentes y prompts de corrección'],
  },
  {
    title: 'Integraciones & Pasarelas de Pago',
    description: 'Conexión de sistemas: CRMs y pasarelas de pago locales.',
    points: ['Bancolombia', 'Bitrix24', 'POS / sistemas externos'],
  },
  {
    title: 'Despliegue & Puesta en Producción',
    description:
      'Publicación y administración de aplicaciones y APIs en servidores propios, con dominios y certificados listos para producción.',
    points: ['Windows Server', 'Linux VPS', 'Hosting & dominios'],
  },
];
