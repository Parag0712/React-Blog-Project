import { motion } from 'framer-motion'
import React from 'react'

function AnimationContainer({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    )
}

export default AnimationContainer