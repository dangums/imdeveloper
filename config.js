// Opções de configuração para o website
const config = {
    // Esquema de cores - você pode ajustar esses valores para mudar o esquema de cores do website
    colors: {
        primaryBlue: '#0088ff',
        accentBlue: '#00c3ff',
        darkBlue: '#004080',
        darkBg: '#121212',
        darkerBg: '#0a0a0a',
    },
    
    // Configurações de animação
    animations: {
        speedFast: 0.3, // segundos
        speedMedium: 0.5, // segundos
        speedSlow: 0.8, // segundos
    },
    
    // Alternância de recursos
    enableCustomCursor: true, // Defina como false para desativar o cursor personalizado
    enableParallaxEffects: true, // Defina como false para desativar efeitos de paralaxe
    
    // Configurações do formulário de contato
    contactForm: {
        enableFormValidation: true,
        sendToEmail: 'seu.email@exemplo.com', // Substitua pelo seu email (para configuração do servidor)
    },
    
    // URLs de redes sociais
    socialMedia: {
        twitter: 'https://twitter.com/seuusuario',
        linkedin: 'https://linkedin.com/in/seuusuario',
        dribbble: 'https://dribbble.com/seuusuario',
        behance: 'https://behance.net/seuusuario',
    }
};

export default config;