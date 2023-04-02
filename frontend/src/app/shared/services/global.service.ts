export let isMobile = false;

export function set(bool: boolean) {
    isMobile = bool;
}

export function get() {
    return isMobile
}