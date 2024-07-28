'use client'

import BigSortButton from "@/components/general/BigSortButton";

//TODO: fix issue where passed in param for color does not change the actual color
export default function register(){ 
    return ( 
        <>
                <BigSortButton name="test" color="red"/>
                <BigSortButton name="test" color="light-grey"/>
        </>
    );
}