// This file contains general helper functions used throughout the project.

export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

export const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
};