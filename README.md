# UI/UX Portfolio Showcase

A modern, interactive portfolio built with React, Tailwind CSS, and Framer Motion to showcase UI/UX skills and frontend development capabilities.

## Features

### 1. Modern Tech Stack
- React 18.2.0 with Vite for fast development
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations
- HeadlessUI and HeroIcons for accessible components
- React Intersection Observer for scroll-based animations

### 2. Dark Mode Support
- System preference detection
- Manual toggle with animated sun/moon icon
- Persistent preference storage
- Smooth transition animations
- Tailwind dark mode classes

### 3. Interactive Elements Showcase

#### Ripple Effect Buttons
- Material design-inspired ripple animations
- Click position-based ripple origin
- Multiple color variants
- Smooth fade-out transitions

#### Interactive Hover Cards
- Spring-based tilt animations
- Scale transformations
- Dynamic shadow effects
- Smooth transitions

#### Floating Elements
- Elevation animations on hover
- Dynamic shadow adjustments
- Indicator animations
- Natural movement using springs

### 4. Navigation Features
- Smooth scroll behavior
- Floating navigation menu
- Active section highlighting
- Responsive design
- Animated appearance/disappearance

### 5. UI Components
- Skill cards with icons and descriptions
- Project cards with image previews
- Contact form with validation
- Section transitions and animations

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/adriancubillos/showcase.git
```

2. Install dependencies:
```bash
cd showcase
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── DarkModeToggle.jsx
│   ├── InteractionsShowcase.jsx
│   ├── Navigation.jsx
│   ├── ProjectCard.jsx
│   ├── SkillCard.jsx
│   └── ContactForm.jsx
├── App.jsx            # Main application component
├── App.css            # Global styles
└── index.css          # Tailwind directives
```

## Customization

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Dark mode support
- Extended theme values
- Custom animations

### Adding New Components
The component structure is modular and extensible. New interactive elements can be added to the `InteractionsShowcase` component.

## Performance

- Optimized animations using Framer Motion
- Responsive images and lazy loading
- Efficient dark mode implementation
- Smooth scrolling and transitions

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- Responsive design for all screen sizes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
