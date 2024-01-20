import { motion } from 'framer-motion';

const Loading = ({className}) => {
    return (
        <motion.div className={`flex space-x-2 justify-center items-center min-h-screen h-full z-[999] bg-slate-950 absolute w-screen ${className}  
        `}>
            <span className='sr-only'>Loading...</span>
            <motion.div
                className='h-8 w-8 bg-white rounded-full animate-bounce'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: -0.3 }}
            ></motion.div>
            <motion.div
                className='h-8 w-8 bg-white rounded-full animate-bounce'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: -0.15 }}
            ></motion.div>
            <motion.div
                className='h-8 w-8 bg-white rounded-full animate-bounce'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            ></motion.div>
        </motion.div>
    );
};

export default Loading;
