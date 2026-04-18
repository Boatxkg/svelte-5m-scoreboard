import { get } from 'svelte/store'
import { allState } from '../stores/stores'

export function keydown(event:KeyboardEvent){
    const key  = event.code
    // console.log(key)     
    const CurrentState = get(allState);
    if (key == "Tab"){
        console.log("down tap")
        allState.update((n) => ({...n, isOpening: !n.isOpening }))
    }
}