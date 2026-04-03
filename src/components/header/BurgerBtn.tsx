import React from 'react';

type BurgerBtnProps = {
    isMenuOpen: boolean;
}

export default function BurgerBtn({isMenuOpen}: BurgerBtnProps) {

    return <React.Fragment>

        <div
            className={`
                w-8 h-1 rounded-full transition-all duration-300 bg-green
                ${isMenuOpen ? 'rotate-45 translate-y-[10px]' : ''}
            `}
        />

        <div
            className={`
                w-8 h-1 rounded-full transition-all duration-300 bg-green
                ${isMenuOpen ? 'opacity-0' : 'opacity-100'}
            `}
        />

        <div
            className={`
                w-8 h-1 rounded-full transition-all duration-300 bg-green
                ${isMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}
            `}
        />

    </React.Fragment>

}