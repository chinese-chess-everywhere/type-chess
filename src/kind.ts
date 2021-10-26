import type { 否 } from './utils'

/**
 * 棋子种类
 */
export type 将 = '将'
export type 士 = '士'
export type 象 = '象'
export type 马 = '马'
export type 车 = '车'
export type 炮 = '炮'
export type 兵 = '兵'

export type 棋子种类 = 将 | 士 | 象 | 马 | 车 | 炮 | 兵

export type 这是合法的棋子种类吗<种类> = 种类 extends 棋子种类 ? 种类 : 否
