export let favourite=$state({
    colour:'tomato',
    count: 0
})

export function setColour(newColour) {
    favourite.colour = newColour;
    favourite.count ++
}