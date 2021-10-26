export type 不可能 = never
export type 空 = undefined
export type 是 = true
export type 否 = false

export type Cast<A, B> = A extends B ? A : B
export type Index<T, K, V = never> = K extends keyof T ? T[K] : V
export type Length<T> = Cast<Index<T, 'length', 0>, Number>

export type 数组行<T, I> = { [K in keyof T]: Index<T[K], I> }
