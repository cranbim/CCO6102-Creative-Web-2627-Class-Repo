export let counter=$state({
    count:0
})

export function increment(){
    counter.count++
}