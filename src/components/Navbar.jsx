import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {

    const [isAudioPlaying, setisAudioPlaying] = useState(false);
    const [isIndicatorActive, setisIndicatorActive] = useState(false)

    const navContainerRef = useRef(null)
    const audioRef = useRef(null)

    const audioToggle = () => {
        setisAudioPlaying((prev) => !prev)
        setisIndicatorActive((prev) => !prev)
    }

    useEffect(() => {
        if (isAudioPlaying) {
            audioRef.current.play()
        }
        else {
            audioRef.current.pause()
        }
    }, [isAudioPlaying])

    return (
        <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-0'>
            <header className='absolute top-1/2 w-full -translate-y-1/2' >
                <nav className='flex size-full items-center justify-between p-4'>
                    <div className='flex items-center gap-7'>
                        <img src="/img/logo.png" alt="logo" className='w-10' />
                        <Button
                            id={"product-button"}
                            title={"Products"}
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>

                    <div className='flex h-full items-center '>
                        <div className='hidden md:block'>
                            {navItems.map((item) => (
                                <a key={item} className='nav-hover-btn' href={`#${item.toLowerCase()}`} > {item}</a>
                            ))}
                        </div>

                        <button className='flex items-center ml-10 space-x-0.5' onClick={audioToggle} >
                            <audio ref={audioRef} src="./audio/loop.mp3" loop />

                            {[1, 2, 3, 4].map((bar) => (
                                <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''} `}
                                    style={{ animationDelay: `${bar * 0.1}s` }}
                                />
                            ))}

                        </button>
                    </div>
                </nav>
            </header>
        </div >
    )
}

export default Navbar