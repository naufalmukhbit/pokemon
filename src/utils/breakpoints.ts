const breakpoints = [320, 576, 768, 992, 1200];
const screen = breakpoints.map((width) => `@media (min-width: ${width}px)`);

export default screen;