import React from 'react'
    
function Container({children}) {
    return (
        <div className='bg-black w-full max-w-6xl mx-auto px-4
        '>
            {children}
        </div>
    );
}

export default Container