import { snapshot } from 'log-snapshot'
import answer from 'the-answer'
import add from './add'

export function test(obj: object): () => number {
    return () => {
        snapshot(obj)
        console.log(add('1', '2'))
        return answer
    }
}
