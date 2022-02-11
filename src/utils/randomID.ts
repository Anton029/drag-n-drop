import React, { memo } from 'react'

export const getRandomID = (minLength:number, maxLength:number) => {
    
    let id = "";
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
    const idLength = Math.round(Math.random() * (maxLength - minLength) + minLength)

    for(let i = 0; i < idLength; i++) {
        const rand = Math.round(Math.random() * (symbols.length - 1))
        id += symbols[rand]
    }

    return id
}