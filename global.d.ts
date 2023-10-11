import * as ReactDom from 'react-dom'

declare module 'react-dom' {
    function experimental_useFormState<S, P>(
        action: (state: S, payload: P) => Promise<S>,
        initialState?: S,
        url?: string
    ): initialState extends undefined ? [S | undefined, (payload: P) => Promise<void>]
        : [S, (payload: P) => Promise<void>]
}