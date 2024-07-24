import { motion } from 'framer-motion'
import { FC } from 'react'
const FadeIn: FC<{ children: React.ReactNode, props?: any, style?: any }> = ({ children, ...props }) => {
    return (
        <motion.div
            {...props}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' } },
                exit: { opacity: 0 }
            }}

        >

            {children}
        </motion.div>
    )
}
export default FadeIn;