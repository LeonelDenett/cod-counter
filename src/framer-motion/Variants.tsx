// Preloader
const fade =  {
    start: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
};
const preLoader =  {
    start: {scale: 0.7},
    animate: {scale: 1, borderRadius: "2rem", transition: {type: "spring", duration: 0.7, delay: 0.4}},
    exit: {opacity: 0}
};
const preLoaderIcon = {
    start: {scale: 1.2},
    animate: {rotate: 360, transition: {ease: "linear", duration: 2, repeat: Infinity}},
    exit: {opacity: 0}
};
const zoomingIn = {
    start: {scale: 1},
    animate: {scale: 1.05, transition: {yoyo: 20}},
    exit: {scale: 1.5}
}
const logo = {
    start: {scale: 0.5},
    animate: {scale: 1, transition: {type: "spring", duration: 0.7, delay: 0.4}},
    exit: {opacity: 0}
}
// Layout
const layout = {
    start: {opacity: 0},
    animate: {opacity: 1, transition: { type: "spring", delay: 0.7}},
    exit: {opacity: 0}
}
// Dashboard Page
const dashboard = {
    start: {opacity: 0},
    animate: {opacity: 1, transition: { type: "spring", delay: 0.7}},
    exit: {opacity: 0}
}

export { fade, preLoader, preLoaderIcon, zoomingIn, logo, layout, dashboard};