import { configure } from 'mobx'
import Data from 'store/data'

class Store {
    data: Data

    constructor() {
        this.data = new Data()
    }
}

const store = new Store()

export default store

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    disableErrorBoundaries: true,
})
