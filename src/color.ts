import type { 否 } from './utils'

/**
 * 棋子颜色
 */
export type 黑色 = '黑'
export type 红色 = '红'

export type 棋子颜色 = 黑色 | 红色

export type 这是合法的棋子颜色吗<颜色> = 颜色 extends 棋子颜色 ? 颜色 : 否
