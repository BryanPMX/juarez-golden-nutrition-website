import {
  Apple,
  Bike,
  Brain,
  ChefHat,
  HeartPulse,
  Leaf,
  PackageCheck,
  Salad,
  School,
  ShieldCheck,
  Sparkles,
  Utensils,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type LocaleText = {
  es: string;
  en: string;
};

export type PlanId = 'adult' | 'kids';

export type Meal = {
  id: string;
  name: LocaleText;
  ingredients: LocaleText;
  plan: PlanId;
};

export type MenuDish = {
  id: string;
  name: LocaleText;
  ingredients: LocaleText;
};

export type MenuBoard = {
  id: string;
  title: LocaleText;
  description: LocaleText;
  dishes: MenuDish[];
};

export type KidsDay = {
  id: string;
  day: LocaleText;
  items: LocaleText;
};

export type Plan = {
  id: PlanId;
  brand: string;
  title: LocaleText;
  price: string;
  duration: LocaleText;
  target: LocaleText;
  features: LocaleText[];
  accent: 'gold' | 'leaf';
  icon: LucideIcon;
};

export const navItems = [
  { id: 'home', path: '/', label: { es: 'Inicio', en: 'Home' } },
  { id: 'menu', path: '/menu-y-planes', label: { es: 'Menu y Planes', en: 'Menu and Plans' } },
  { id: 'contact', path: '/contacto', label: { es: 'Contacto', en: 'Contact' } },
];

export const plans: Plan[] = [
  {
    id: 'adult',
    brand: 'Golden Nutrition',
    title: { es: 'Plan adultos', en: 'Adult plan' },
    price: '$800 MXN',
    duration: { es: 'Por semana, 5 dias', en: 'Per week, 5 days' },
    target: { es: 'Adultos en general, listas para calentar', en: 'Adults, ready to heat' },
    features: [
      { es: '5 dias de comida saludable', en: '5 days of healthy meals' },
      { es: 'Listas para calentar', en: 'Ready to heat' },
      { es: 'Ricas y nutritivas', en: 'Flavorful and nutritious' },
      { es: 'Entrega a domicilio', en: 'Home delivery' },
    ],
    accent: 'gold',
    icon: Utensils,
  },
  {
    id: 'kids',
    brand: 'Nutricion a la Carta',
    title: { es: 'Plan escolar', en: 'Kids plan' },
    price: '$750 MXN',
    duration: { es: 'Por semana, 5 dias', en: 'Per week, 5 days' },
    target: { es: 'Ninos de primaria y secundaria', en: 'Elementary and middle school children' },
    features: [
      { es: 'Desayunos, comidas y cenas', en: 'Breakfasts, lunches, and dinners' },
      { es: 'Menus balanceados', en: 'Balanced menus' },
      { es: 'Porciones adecuadas', en: 'Age-appropriate portions' },
      { es: 'Ingredientes frescos y nutritivos', en: 'Fresh, nutritious ingredients' },
    ],
    accent: 'leaf',
    icon: School,
  },
];

export const adultMenus: MenuBoard[] = [
  {
    id: 'menu-1',
    title: { es: 'Menú 1', en: 'Menu 1' },
    description: {
      es: 'Platos frescos y balanceados para iniciar la semana con fuerza.',
      en: 'Fresh, balanced dishes to start the week strong.',
    },
    dishes: [
      {
        id: 'ensalada-pollo',
        name: { es: 'Ensalada de Pollo', en: 'Chicken Salad' },
        ingredients: {
          es: 'Pechuga de pollo a la plancha, lechuga fresca, aguacate, jitomate cherry y aderezo ligero.',
          en: 'Grilled chicken, fresh lettuce, avocado, cherry tomato, and light dressing.',
        },
      },
      {
        id: 'pasta-bolonesa',
        name: { es: 'Pasta Boloñesa', en: 'Bolognese Pasta' },
        ingredients: {
          es: 'Carne molida, pasta penne, salsa marinara casera y queso parmesano.',
          en: 'Ground beef, penne pasta, homemade marinara, and parmesan cheese.',
        },
      },
      {
        id: 'pescado-empapelado',
        name: { es: 'Pescado Empapelado', en: 'Wrapped Fish' },
        ingredients: {
          es: 'Filete de tilapia, calabacitas, pimiento morrón, zanahoria y limón.',
          en: 'Tilapia fillet, zucchini, bell pepper, carrot, and lime.',
        },
      },
      {
        id: 'albondigas-caseras',
        name: { es: 'Albóndigas Caseras', en: 'Homemade Meatballs' },
        ingredients: {
          es: 'Carne molida con salsa de jitomate, zanahoria y calabacitas.',
          en: 'Ground beef with tomato sauce, carrot, and zucchini.',
        },
      },
      {
        id: 'carne-oriental',
        name: { es: 'Carne Estilo Oriental', en: 'Oriental-style Beef' },
        ingredients: {
          es: 'Tiras de carne, brócoli, pimiento morrón, zanahoria y salsa oriental.',
          en: 'Beef strips, broccoli, bell pepper, carrot, and oriental sauce.',
        },
      },
    ],
  },
  {
    id: 'menu-2',
    title: { es: 'Menú 2', en: 'Menu 2' },
    description: {
      es: 'Combinación tradicional con proteína, verduras y sabores caseros.',
      en: 'Traditional combination with protein, veggies, and homestyle flavors.',
    },
    dishes: [
      {
        id: 'chiles-rellenos',
        name: { es: 'Chiles Rellenos de Queso', en: 'Cheese-stuffed Peppers' },
        ingredients: {
          es: 'Chile poblano, queso Oaxaca, salsa de jitomate y arroz integral.',
          en: 'Poblano pepper, Oaxaca cheese, tomato sauce, and brown rice.',
        },
      },
      {
        id: 'enchiladas-suizas',
        name: { es: 'Enchiladas Suizas', en: 'Swiss Enchiladas' },
        ingredients: {
          es: 'Tortillas de maíz, pollo deshebrado y salsa verde cremosa.',
          en: 'Corn tortillas, shredded chicken, and creamy green sauce.',
        },
      },
      {
        id: 'picadillo-res',
        name: { es: 'Picadillo de Res', en: 'Beef Picadillo' },
        ingredients: {
          es: 'Carne molida, papa, zanahoria, chícharos y especias.',
          en: 'Ground beef, potato, carrot, peas, and spices.',
        },
      },
      {
        id: 'bistec-cerdo',
        name: { es: 'Bistec de Cerdo en Chile Pasilla', en: 'Pork Steak in Pasilla Chile' },
        ingredients: {
          es: 'Bistec de cerdo, salsa de chile pasilla, arroz integral y calabacitas.',
          en: 'Pork steak, pasilla chile sauce, brown rice, and zucchini.',
        },
      },
    ],
  },
  {
    id: 'menu-3',
    title: { es: 'Menú 3', en: 'Menu 3' },
    description: {
      es: 'Platos mexicanos con guarniciones ligeras y porciones equilibradas.',
      en: 'Mexican dishes with light sides and balanced portions.',
    },
    dishes: [
      {
        id: 'pollo-salsa-verde',
        name: { es: 'Pollo en Salsa Verde', en: 'Chicken in Green Sauce' },
        ingredients: {
          es: 'Pechuga de pollo, salsa verde, calabacitas y zanahoria.',
          en: 'Chicken breast, green sauce, zucchini, and carrot.',
        },
      },
      {
        id: 'enchiladas-rojas',
        name: { es: 'Enchiladas Rojas', en: 'Red Enchiladas' },
        ingredients: {
          es: 'Tortillas de maíz, pollo deshebrado, salsa roja casera y queso.',
          en: 'Corn tortillas, shredded chicken, homemade red sauce, and cheese.',
        },
      },
      {
        id: 'sandwich-pollo',
        name: { es: 'Sándwich de Muslo de Pollo', en: 'Chicken Thigh Sandwich' },
        ingredients: {
          es: 'Pan integral, muslo de pollo, lechuga, jitomate y mayonesa ligera.',
          en: 'Whole grain bread, chicken thigh, lettuce, tomato, and light mayo.',
        },
      },
      {
        id: 'enmoladas',
        name: { es: 'Enmoladas', en: 'Enmoladas' },
        ingredients: {
          es: 'Tortillas de maíz con pollo deshebrado y mole tradicional.',
          en: 'Corn tortillas with shredded chicken and traditional mole.',
        },
      },
      {
        id: 'fajitas-pollo',
        name: { es: 'Fajitas de Pollo en Verduras', en: 'Chicken Veggie Fajitas' },
        ingredients: {
          es: 'Pollo, pimiento morrón, cebolla, tomate y especias ligeras.',
          en: 'Chicken, bell pepper, onion, tomato, and light spices.',
        },
      },
    ],
  },
];

export const kidsDays: KidsDay[] = [
  {
    id: 'dia-1',
    day: { es: 'Dia 1', en: 'Day 1' },
    items: {
      es: 'Entomatadas, tortillas, queso, pure de tomate, pollo deshebrado, lechuga, pepino, zanahoria y aguacate.',
      en: 'Entomatadas, tortillas, cheese, tomato puree, shredded chicken, lettuce, cucumber, carrot, and avocado.',
    },
  },
  {
    id: 'dia-2',
    day: { es: 'Dia 2', en: 'Day 2' },
    items: {
      es: 'Sandwich integral, jamon de pavo, queso panela, vegetales frescos, jicama, betabel y pina.',
      en: 'Whole wheat sandwich, turkey ham, panela cheese, fresh vegetables, jicama, beet, and pineapple.',
    },
  },
  {
    id: 'dia-3',
    day: { es: 'Dia 3', en: 'Day 3' },
    items: {
      es: 'Pollo a la plancha con lechuga, jitomate, pepino, zanahoria y aguacate.',
      en: 'Grilled chicken with lettuce, tomato, cucumber, carrot, and avocado.',
    },
  },
  {
    id: 'dia-4',
    day: { es: 'Dia 4', en: 'Day 4' },
    items: {
      es: 'Albondigas de carne molida con papa, zanahoria y arroz.',
      en: 'Ground beef meatballs with potato, carrot, and rice.',
    },
  },
  {
    id: 'dia-5',
    day: { es: 'Dia 5', en: 'Day 5' },
    items: {
      es: 'Picadillo de res con papa, zanahoria, jitomate, cebolla y ajo.',
      en: 'Beef picadillo with potato, carrot, tomato, onion, and garlic.',
    },
  },
];

export const trustPillars = [
  { icon: Leaf, label: { es: 'Ingredientes Frescos', en: 'Fresh Ingredients' } },
  { icon: Salad, label: { es: 'Comidas Balanceadas', en: 'Balanced Meals' } },
  { icon: HeartPulse, label: { es: 'Nutricion que te hace bien', en: 'Nutrition that feels good' } },
  { icon: Bike, label: { es: 'Entrega a Domicilio', en: 'Home Delivery' } },
];

export const differentiators = [
  {
    icon: PackageCheck,
    title: { es: 'Listo para tu semana', en: 'Ready for your week' },
    text: { es: 'Paquetes de 5 dias que simplifican tus comidas.', en: '5-day packages that simplify your meals.' },
  },
  {
    icon: ChefHat,
    title: { es: 'Diseno chef + nutricion', en: 'Chef design + nutrition' },
    text: { es: 'Platillos ricos con porciones balanceadas.', en: 'Flavorful dishes with balanced portions.' },
  },
  {
    icon: ShieldCheck,
    title: { es: 'Sin datos sensibles', en: 'No sensitive data' },
    text: { es: 'Pedidos e inquietudes se atienden directo por WhatsApp.', en: 'Orders and questions go directly through WhatsApp.' },
  },
  {
    icon: Sparkles,
    title: { es: 'Dos lineas claras', en: 'Two clear lines' },
    text: { es: 'Adultos y plan escolar con precios transparentes.', en: 'Adult and school plans with transparent pricing.' },
  },
];

export const kidsBenefits = [
  { icon: Brain, label: { es: 'Mejora la Concentracion', en: 'Improves Focus' } },
  { icon: ShieldCheck, label: { es: 'Fortalece su Sistema Inmune', en: 'Supports Immunity' } },
  { icon: Zap, label: { es: 'Mas Energia para su Dia', en: 'More Daily Energy' } },
  { icon: Apple, label: { es: 'Habitos Saludables', en: 'Healthy Habits' } },
];

export const stats = [
  { value: 5, suffix: '', label: { es: 'dias por paquete', en: 'days per package' } },
  { value: 2, suffix: '', label: { es: 'planes disponibles', en: 'available plans' } },
  { value: 100, suffix: '%', label: { es: 'Orgánico', en: 'in Ciudad Juarez' } },
];

export const faqs = [
  {
    question: { es: 'Como hago un pedido?', en: 'How do I place an order?' },
    answer: {
      es: 'El flujo principal es WhatsApp. Elige tu plan, envia el mensaje prellenado y el equipo confirma disponibilidad, entrega y detalles.',
      en: 'The main flow is WhatsApp. Choose your plan, send the pre-filled message, and the team confirms availability, delivery, and details.',
    },
  },
  {
    question: { es: 'Cual es el area de entrega?', en: 'What is the delivery area?' },
    answer: {
      es: 'El servicio esta orientado a Ciudad Juarez. La cobertura exacta se confirma al hacer tu pedido.',
      en: 'Service is focused on Ciudad Juarez. Exact coverage is confirmed when you place your order.',
    },
  },
  {
    question: { es: 'Cuanto cuestan los planes?', en: 'How much do the plans cost?' },
    answer: {
      es: 'Golden Nutrition cuesta $800 MXN por semana y Nutricion a la Carta cuesta $750 MXN por semana.',
      en: 'Golden Nutrition is $800 MXN per week and Nutricion a la Carta is $750 MXN per week.',
    },
  },
  {
    question: { es: 'El plan escolar incluye todas las comidas?', en: 'Does the kids plan include all meals?' },
    answer: {
      es: 'Si. El plan escolar contempla desayunos, comidas y cenas con menus balanceados para primaria y secundaria.',
      en: 'Yes. The kids plan covers breakfasts, lunches, and dinners with balanced menus for elementary and middle school children.',
    },
  },
  {
    question: { es: 'Puedo preguntar por ingredientes?', en: 'Can I ask about ingredients?' },
    answer: {
      es: 'Si. Cada platillo muestra ingredientes principales y puedes confirmar detalles o restricciones por WhatsApp antes de ordenar.',
      en: 'Yes. Each dish shows key ingredients and you can confirm details or restrictions by WhatsApp before ordering.',
    },
  },
  {
    question: { es: 'Hay pagos en linea?', en: 'Are online payments available?' },
    answer: {
      es: 'No en la version 1.0 del sitio. Los pedidos se coordinan directamente por WhatsApp, telefono o formulario.',
      en: 'Not in website v1.0. Orders are coordinated directly through WhatsApp, phone, or the form.',
    },
  },
];
