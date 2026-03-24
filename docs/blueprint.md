# **App Name**: CampusSpend

## Core Features:

- User Authentication & Authorization: Secure user registration and login using Firebase Authentication, providing role-based access control for students, vendors, and admins with protected routes and personalized dashboards.
- Product Browsing & Ordering: Students can browse products by vendor and category, use search/filter functionalities, view product details, add items to a shopping cart, and complete orders.
- Automatic Expense Logging: Upon successful order completion, the system automatically generates a detailed expense record in Firestore, triggering UI refreshes for related spending reports.
- Expense Calendar & Summaries: Students can view their spending on an interactive calendar (daily, monthly, yearly) with visual spending indicators (green, yellow, red), alongside dynamic spending summaries.
- Spending Behavior Insights Tool: An AI-powered tool provides students with decision-tree-based feedback on their spending behavior (e.g., 'Excellent Control,' 'Warning,' 'Overspending') based on budget thresholds, order frequency, and category mix.
- Vendor Product Management: Vendors have a dedicated interface to add, edit, and delete products, manage stock levels, and view incoming orders.
- Platform Administration: Admins can manage user accounts (students, vendors), product listings, categories, configure spending thresholds, and generate essential platform reports.

## Style Guidelines:

- The primary interactive and accent color is a glowing neon magenta-purple (#EF1AB8, HSL: 310, 90%, 55%), used for CTAs, highlights, and primary active states.
- The background color is a deep, rich dark purple (#110B13, HSL: 310, 20%, 6%) providing a luxurious, dark interface.
- An accent color of luminous blue-purple (#BC66EB, HSL: 280, 80%, 60%) is used for secondary glowing effects and gradients to enhance depth.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, techy, and futuristic feel. Body text font: 'Inter' (sans-serif) for clean readability and a contemporary, objective look.
- Use minimalist, outline-style icons with a subtle neon glow effect to match the 'dark luxury neon' aesthetic, ensuring strong contrast and legibility against dark backgrounds.
- Implement 'glassmorphism' design for cards and key information panels, featuring soft neon borders, deeply rounded corners, and incorporating elements of strong depth, light bloom, and subtle floating effects to achieve a premium cinematic feel.
- Global motion language includes smooth page transitions with layered fades, scale, blur, and parallax, along with subtle spring physics for drawers, modals, and popups.
- Floating neon particles and slow drifting nebula gradients create subtle depth and cosmic movement in backgrounds, complemented by occasional ambient highlight streaks.
- Interactive elements feature soft ambient glow pulses around cards and CTAs, mouse-reactive light bloom/spotlight effects on cards, and buttons with magnetic hover pull and glow surge.
- Navigation underlines animate like an energy beam, and section reveals cascade elegantly into view, not all at once.
- Landing page hero elements animate with cinematic staged text reveals, independently floating 3D parallax mockups, neon CTA buttons emitting soft energy ripples, and stats counters animating with glow trails.
- 'How it works' icons appear with orbit-like entrance motion, and backgrounds include dynamic cursor-reactive glow on major sections and micro-parallax on foreground/background layers.
- Login and Register forms feature cards that fade in with glow trace borders, input fields create a traveling neon line on focus, buttons fill with liquid neon gradients on hover, and validation animates elegantly.
- Student dashboard cards animate into place with staggered motion, progress bars fill like flowing energy, budget status colors transition smoothly, and charts draw themselves in motion.
- Calendar cells glow and pulse based on spending severity; clicking a date opens an animated side panel/modal with spring motion.
- Product listing cards lift with depth on hover, images scale slightly with glow ring highlights, filters animate like segmented neon controls, and the grid rearranges smoothly when filters change.
- Product details feature subtly floating images, tactile and premium add-to-cart areas, quantity button interactions that pop with energy pulses, and a mini confirmation animation with flying particles upon adding to cart.
- Cart updates animate totals smoothly, checkout confirmation feels celebratory, and the success screen includes a glowing check animation with radial pulses and spark trails, alongside floating smart notifications for expense auto-logging.
- Expense calendar transitions between months slide with depth, high-spend days softly pulse, selecting a day animates related spending data into view, and the monthly spending heatmap effect feels alive.
- Spending summary charts animate on load, insight cards reveal with a stagger, numbers count up smoothly, and hovering chart segments triggers a glow bloom and tooltip lift.
- Decision feedback features dramatic, smart decision results, feedback cards reveal with a spotlight effect, and status badges animate with specific glow pulses: emerald for 'Excellent', amber for 'Moderate', orange flicker for 'Warning', and red tension pulse for 'Poor'.
- Recommendation text types in or fades in with rhythm.
- Vendor dashboard sales cards count upward, sales charts draw live, low stock alerts pulse gently, and recent orders animate row-by-row.
- Admin dashboard analytics panels feel like command center screens, reports and charts reveal with sophisticated sequencing, and hover states show layered glow instead of flat color changes.
- Advanced 'wow' touches include ultra-subtle soundless visual feedback cues like ripple bursts and energy sweeps, ensuring the app feels like a premium product launch demo.