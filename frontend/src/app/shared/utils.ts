export function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function limitFieldSize(text :string): boolean {
    let size = 20;
    
    if (text.length > size)
        return (false);
    return (true);
}