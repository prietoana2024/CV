export type ProjectCategory = 'fullstack' | 'ia' | 'backend' | 'frontend';

export interface ProjectCategoryInfo {
  id: ProjectCategory;
  label: string;
}

export const PROJECT_CATEGORIES: ProjectCategoryInfo[] = [
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'ia', label: 'IA & Automatización' },
  { id: 'backend', label: 'APIs & Backend' },
  { id: 'frontend', label: 'Frontend' },
];

export interface Project {
  slug: string;
  title: string;
  client: string;
  role: string;
  period: string;
  category: ProjectCategory;
  summary: string;
  objective: string;
  challenge: string;
  contributions: string[];
  stack: string[];
  featured: boolean;
  hasVideoDemo: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: 'xcirculars-hiresprint',
    title: 'xCirculars — Verificación de facturas con IA',
    client: 'Hiresprint',
    role: 'Desarrolladora Full Stack',
    period: '2026 — Actualidad',
    category: 'ia',
    summary:
      'Motor de ingesta, deduplicación y verificación de facturas de proveedores asistido por IA, con sincronización automática hacia el punto de venta del cliente.',
    objective:
      'xwatcher es el módulo responsable de todo el ciclo de vida de una factura de proveedor: desde el escaneo (OCR + IA), pasando por la detección de duplicados y la canonicalización de documentos, hasta la sincronización con el sistema POS del cliente (easyfresh). Es lógica de negocio crítica: de aquí depende qué factura se considera "la verdadera" y qué datos de inventario y precios llegan al punto de venta.',
    challenge:
      'El sistema debía escalar de un flujo simple a un pipeline confiable que soporta múltiples proveedores, alias de vendor ambiguos, documentos duplicados y llamadas a un LLM (Anthropic Claude) sin control de costo ni límite de tasa — un riesgo real de fallos en cascada y sobrecostos en producción.',
    contributions: [
      'Diseñé un sistema de deduplicación por hash de imagen (SHA) combinado con id + cliente + usuario, para evitar el doble procesamiento de la misma factura.',
      'Implementé las reglas de canonicalización: impedí que facturas en estado pending/processing se promovieran a "canónicas" antes de tiempo y que documentos inválidos se convirtieran en canónicos durante el reprocesamiento.',
      'Corregí un bug de producción crítico: un problema de timezone provocaba fallos en cascada del escaneo, agravado por llamadas ilimitadas a la API de Anthropic — resolví ambos problemas a la vez, acotando costo y evitando la cascada.',
      'Construí la validación de alias de vendor para que cada ítem quede siempre asociado al proveedor correcto, y una herramienta de IA (apply_correction_to_vendor_prompt) para que el propio agente corrija su prompt de reconocimiento.',
      'Desarrollé la sincronización batch con el POS: envío de 5 en 5, reintentos cada 2 minutos, botón de stop manual y eliminación del auto-disparo al cargar la página.',
      'Apliqué modo oscuro/claro de forma sistemática en dashboard, kanban, panel admin, reportes, detalle de factura y agente de IA — decenas de vistas theming-consistentes.',
      'Mantuve una cadena de ramas dependientes (Git Flow) sincronizada con dev de forma constante, evitando divergencia mientras el resto del equipo integraba cambios en paralelo.',
    ],
    stack: ['TypeScript', 'Supabase', 'PostgreSQL', 'RPC', 'API de Anthropic (Claude)', 'RBAC por niveles', 'Git Flow'],
    featured: true,
    hasVideoDemo: true,
  },
  {
    slug: 'mimercado',
    title: 'MiMercado — Marketplace & logística de última milla',
    client: 'Proyecto propio',
    role: 'Full Stack Developer',
    period: '2025',
    category: 'fullstack',
    summary:
      'Ecosistema de e-commerce y logística: catálogo, checkout, CRM, repartidores, aliados comerciales y panel administrativo, construido con arquitectura limpia por capas.',
    objective:
      'Diseñar y construir, de punta a punta, una plataforma de marketplace de abastecimiento (canasta básica) que conecta proveedores, puntos de venta, repartidores y clientes finales, con un backend desacoplado y escalable y un frontend moderno.',
    challenge:
      'El dominio combina varios subsistemas que normalmente serían productos separados: inventario multi-sede, pedidos y checkout con pasarela de pago, logística de domicilios geolocalizados, CRM de clientes, cupones y suscripciones, y roles diferenciados (usuario, repartidor, socio, administrador).',
    contributions: [
      'Definí una arquitectura .NET por capas (API · DAL · DLL · DTO · IOC · Models · Utility) para aislar reglas de negocio, acceso a datos e inyección de dependencias.',
      'Construí más de 50 endpoints REST cubriendo catálogo, inventario, pedidos, pagos, cupones, suscripciones, calificaciones y gestión de vehículos/repartidores.',
      'Desarrollé el frontend en React 19 + TypeScript con módulos independientes: Admin, Cart, Checkout, CRM, MiPedido, Operaciones, Paquetes, Products, Repartidor, Socio y User.',
      'Integré geolocalización de domicilios con Leaflet/React-Leaflet para asignación y seguimiento de entregas.',
      'Implementé generación de comprobantes en PDF (jsPDF) y un sistema de archivos para comprobantes y documentos de vehículos.',
      'Diseñé el modelo de datos para inventario multi-ubicación, movimientos de stock, transferencias entre sedes y control de tarifas por divisa.',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', '.NET 9', 'Arquitectura por capas', 'SQL Server', 'JWT', 'Leaflet', 'jsPDF'],
    featured: true,
    hasVideoDemo: true,
  },
  {
    slug: 'sistema-venta',
    title: 'Sistema de Venta & Inventario',
    client: 'Tecnosoluciones.com',
    role: 'Desarrolladora Junior',
    period: '2021 — 2023',
    category: 'fullstack',
    summary:
      'Plataforma de gestión de ventas e inventario para proveedores de la canasta básica, con roles, reportes y pasarela de pago integrada.',
    objective:
      'Dar a un grupo de proveedores una herramienta única para administrar inventario, ventas, roles de usuario y reportes financieros, reemplazando procesos manuales dispersos.',
    challenge:
      'Los proveedores necesitaban visibilidad confiable del stock y de sus ventas, control de acceso por rol y una pasarela de pago local (Bancolombia) integrada al flujo de venta, además de tarifas de envío calculadas automáticamente.',
    contributions: [
      'Diseñé la base de datos para el software de gestión e inventario, incluyendo relaciones de productos, movimientos y reportes.',
      'Construí la arquitectura backend por capas (DAL · DTO · IOC · DLL · Utility) en C# y el frontend en Angular 15.',
      'Integré la pasarela de pagos Bancolombia y automaticé el cálculo de tarifas de envío.',
      'Optimicé el flujo de trabajo en el CRM Bitrix24, mejorando la eficiencia operativa en un 15%.',
      'Implementé el módulo de reportes con DTOs dedicados y un menú de roles para segmentar accesos por tipo de usuario.',
    ],
    stack: ['Angular 15', 'C#', '.NET', 'Arquitectura por capas', 'SQL Server', 'Bitrix24', 'Pasarela Bancolombia'],
    featured: true,
    hasVideoDemo: true,
  },
  {
    slug: 'home-energy',
    title: 'HomeEnergy — Gestión de contratos de energía solar',
    client: 'VisualCodevelopment',
    role: 'Desarrolladora Junior',
    period: '2023 — 2024',
    category: 'fullstack',
    summary:
      'Aplicación web para la gestión de contratos de instalación de energía solar, con tablero de seguimiento y API REST propia.',
    objective:
      'Digitalizar el proceso de contratación e instalación de sistemas de energía solar residencial: desde el registro del contrato hasta el seguimiento del estado del proyecto en un tablero centralizado.',
    challenge:
      'El equipo comercial y técnico necesitaba un único punto de verdad para el estado de cada contrato, con una API confiable que soportara el crecimiento de nuevos módulos (como el sistema de inventario de proveedores).',
    contributions: [
      'Desarrollé el frontend en Angular con un componente de tablero (dashboard) para seguimiento de contratos.',
      'Construí la API REST en C# / ASP.NET que sirve de backend para la gestión de contratos.',
      'Implementé el sistema de gestión de inventario para proveedores de la canasta básica sobre la misma base tecnológica.',
      'Participé en el despliegue de frontend y API en entornos Windows Server y Linux (VPS).',
    ],
    stack: ['Angular', 'C#', 'ASP.NET', 'API REST', 'SQL Server'],
    featured: false,
    hasVideoDemo: true,
  },
  {
    slug: 'providers-tekus',
    title: 'ProvidersTekus — Gestión de proveedores',
    client: 'Proyecto de arquitectura moderna',
    role: 'Full Stack Developer',
    period: '2025',
    category: 'frontend',
    summary:
      'Sistema de gestión de proveedores construido sobre Angular 20 con enrutamiento y arquitectura de componentes standalone de última generación.',
    objective:
      'Explorar y aplicar en un caso real las capacidades más recientes de Angular (standalone components, zoneless change detection, control flow con @if/@for) junto a un backend .NET, para mantener el stack frontend actualizado con el estado del arte.',
    challenge:
      'Migrar los patrones de arquitectura frontend aprendidos en versiones anteriores de Angular (14–18) hacia el modelo standalone y las nuevas APIs de reactividad, sin sacrificar mantenibilidad.',
    contributions: [
      'Configuré el enrutamiento y las interfaces de datos del sistema de proveedores desde cero sobre Angular 20.',
      'Apliqué componentes standalone y buenas prácticas de tipado estricto en TypeScript.',
      'Diseñé la estructura de carpetas y convenciones reutilizadas después en proyectos posteriores.',
    ],
    stack: ['Angular 20', 'TypeScript', '.NET', 'C#'],
    featured: false,
    hasVideoDemo: true,
  },
  {
    slug: 'sopa-de-letras',
    title: 'Sopa de Letras — Juego full stack',
    client: 'Proyecto personal',
    role: 'Full Stack Developer',
    period: 'Fuera de horario laboral',
    category: 'backend',
    summary:
      'Juego de sopa de letras con generación algorítmica del tablero, API REST propia en C# y frontend interactivo en Angular.',
    objective:
      'Poner a prueba habilidades de diseño de algoritmos (generación y validación de tableros de letras) y de diseño de API, separando claramente la lógica de juego del cliente.',
    challenge:
      'Generar tableros válidos que ubiquen todas las palabras objetivo sin colisiones, exponer esa lógica como una API REST reutilizable y consumirla desde un frontend fluido.',
    contributions: [
      'Diseñé el algoritmo de generación y validación del tablero de letras en C#.',
      'Construí la API REST (SolutionWordSearch) que expone la lógica de juego al frontend.',
      'Desarrollé el frontend en Angular 18 con la interacción de selección de palabras en el tablero.',
    ],
    stack: ['Angular 18', 'C#', 'Web API REST'],
    featured: false,
    hasVideoDemo: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
