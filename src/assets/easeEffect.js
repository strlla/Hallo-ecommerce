const easeEffectVariants = {
    hidden: { opacity: 0, y: 30},
    show: { 
        opacity: 1,
        y: 0,
        transition: { 
            delay: 0.2,
            staggerChildren: 0.2,
            type: 'spring',
            ease: 'easeOut'
        }
        
    }
}

export default easeEffectVariants