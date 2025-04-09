"use client"

import Image from "next/image";

export default function AboutImage(props) {
    return (
        <Image
            src={props.url}
            alt={props.alt}
            width={props.width}
            height={props.height}
            className="w-full h-auto object-cover"
            onError={(e) => {
                e.target.src = "https://placehold.co/600x400"
            }}
        />
    );
}