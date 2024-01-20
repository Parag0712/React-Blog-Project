import React from 'react'
    
function CardContainer({children,className}) {
    return (
        <div className={`bg-black w-full max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-10 ${className}`}>
            {children}
        </div>
    );
}

export default CardContainer