import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import React, { useRef } from 'react'
import { useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';

const Hero = () => {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, sethasClicked] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [loadedVideos, setloadedVideos] = useState(0);

    const totalVideos = 4;

    const nextVideoRef = useRef(null)

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () => {
        sethasClicked(true)
        setCurrentIndex(upcomingVideoIndex)
    }

    const handleVideoLoad = () => {
        setloadedVideos((prev) => prev + 1)
    }

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`

    useGSAP(() => {
        if (hasClicked) {
            gsap.set("#next-video", {
                visibility: "visible"
            });

            gsap.to("#next-video", {
                transformOrigin: "center center",
                scale: 1,
                width: "100%",
                height: "100%",
                duration: 1,
                ease: "power1.inOut",
                onStart: () => nextVideoRef.current.play(),
            });
            gsap.from("#current-video", {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.5,
                ease: "power1.inOut",
            });
        }
    },
        {
            dependencies: [currentIndex],
            revertOnUpdate: true,
        }
    )


    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
            <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden  bg-blue-75'>
                <div>
                    <div className='mask-clip-path absolute-center absolute z-50 size-64 rounded-lg cursor-pointer overflow-hidden'>
                        <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                            <video
                                ref={nextVideoRef}
                                src={getVideoSrc(upcomingVideoIndex)}
                                loop
                                muted
                                id='current-video'
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>

                    {/* Main video */}
                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        id='next-video'
                        className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                        onLoadedData={handleVideoLoad}
                    />

                    <video
                        src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        // autoPlay
                        loop
                        muted
                        className='absolute left-0 top-0 size-full object-cover object-center'
                        onLoadedData={handleVideoLoad}

                    />
                </div>
                <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
                    G<b>a</b>ming
                </h1>

                <div className='absolute top-0 left-0 z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading text-blue-100'>
                            R<b>e</b>def<b>ine</b>
                        </h1>
                        <p className='mb-5  max-w-64 font-robert-regular text-blue-100'>
                            Enter the Metagame  <br />
                            Unleash the Play Economy
                        </p>
                        <Button
                            id="watch-trailer"
                            title="Watch trailer"
                            leftIcon={<TiLocationArrow />}
                            containerClass="bg-yellow-300 flex-center gap-1" />
                    </div>
                </div>
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                G<b>A</b>MING
            </h1>
        </div>
    )
}

export default Hero