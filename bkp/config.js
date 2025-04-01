// Configuration options for the website
const config = {
    // Color scheme - you can adjust these values to change the color scheme of the website
    colors: {
        primaryBlue: '#0088ff',
        accentBlue: '#00c3ff',
        darkBlue: '#004080',
        darkBg: '#121212',
        darkerBg: '#0a0a0a',
    },
    
    // Animation settings
    animations: {
        speedFast: 0.3, // seconds
        speedMedium: 0.5, // seconds
        speedSlow: 0.8, // seconds
    },
    
    // Feature toggles
    enableCustomCursor: true, // Set to false to disable the custom cursor
    enableParallaxEffects: true, // Set to false to disable parallax scrolling effects
    
    // Contact form settings
    contactForm: {
        enableFormValidation: true,
        sendToEmail: 'your.email@example.com', // Replace with your email (for server configuration)
    },
    
    // Social media URLs
    socialMedia: {
        twitter: 'https://twitter.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        dribbble: 'https://dribbble.com/yourusername',
        behance: 'https://behance.net/yourusername',
    }
};

export default config;

