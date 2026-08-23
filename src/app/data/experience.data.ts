export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  achievements: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Hiresprint — xCirculars',
    role: 'Desarrolladora Full Stack (IA)',
    period: '2026 — Actualidad',
    current: true,
    achievements: [
      'Responsable principal del pipeline de ingesta y verificación de facturas de proveedores (xwatcher): OCR/IA, deduplicación, canonicalización y sincronización con el POS del cliente.',
      'Resolví un bug de producción crítico que combinaba una falla de timezone con llamadas ilimitadas a la API de Anthropic, eliminando fallos en cascada y controlando el costo de las llamadas a IA.',
      'Construí una herramienta de corrección asistida por IA para el mapeo de proveedores (vendor aliasing).',
      'Apliqué theming (modo oscuro/claro) de forma sistemática en decenas de vistas, manteniendo consistencia visual en todo el producto.',
    ],
  },
  {
    company: '1Cero1 Software',
    role: 'Desarrolladora de Software Senior',
    period: '2024 — 2025',
    achievements: [
      'Desarrollo de aplicaciones de escritorio y consola en .NET 9.',
      'Creación de APIs REST en .NET 9 con autenticación mediante token (JWT).',
      'Desarrollo web con HTML, CSS, JavaScript, AngularJS y React.',
      'Integraciones con sistemas de clientes y plataformas de identidad/bancos de información.',
      'Despliegue y administración de hosting, dominios y VPS en Windows Server y Linux para publicación de APIs.',
    ],
  },
  {
    company: 'VisualCodevelopment',
    role: 'Desarrolladora Junior',
    period: '2023 — 2024',
    achievements: [
      'Desarrollo de aplicación web para gestión de contratos de energía solar con API REST, C# y Angular.',
      'Implementación de sistema de gestión de inventario para proveedores de la canasta básica.',
    ],
  },
  {
    company: 'Tecnosoluciones.com',
    role: 'Desarrolladora Junior',
    period: '2021 — 2023',
    achievements: [
      'Diseño de base de datos para software de gestión e inventario.',
      'Optimización del flujo de trabajo en CRM Bitrix24 (mejora del 15%).',
      'Integración de pasarela Bancolombia y automatización de tarifas de envío.',
    ],
  },
  {
    company: 'Maquila Internacional de Confecciones',
    role: 'Desarrolladora Junior',
    period: '2021 — 2022',
    achievements: [
      'Reestructuración de componentes que mejoraron la eficiencia del proceso de facturación.',
    ],
  },
];

export interface EducationEntry {
  title: string;
  institution: string;
  period: string;
  details: string[];
}

export const EDUCATION: EducationEntry[] = [
  {
    title: 'Formación complementaria — Autodidacta',
    institution: 'Cursos independientes',
    period: '2024',
    details: [
      'Node.js: fundamentos de servidores.',
      'C# para APIs REST en .NET 9.',
      'AngularJS y React para interfaces SPA.',
      'Despliegue de aplicaciones y APIs en Windows Server y Linux.',
    ],
  },
  {
    title: 'Cursos especializados',
    institution: 'UPB & SENA',
    period: '2021 — 2023',
    details: [
      'Maquetación web (UPB, 2023).',
      'Programación web (UPB, 2023).',
      'Programación móvil (SENA, 2021).',
      'Aprendizaje digital (SENA, 2021).',
    ],
  },
  {
    title: 'Técnico en Desarrollo de Software',
    institution: 'Cesde',
    period: '2021',
    details: [
      'SQL Server y phpMyAdmin.',
      'JavaScript, PHP y C# en MVC.',
      'Framework CodeIgniter para desarrollo web.',
      'Modelado y administración de bases de datos.',
    ],
  },
];
