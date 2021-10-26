import type { 不可能 } from './utils'
import type { 这是合法的棋子颜色吗, 棋子颜色 } from './color'
import type { 这是合法的棋子种类吗, 棋子种类 } from './kind'

/**
 * 棋子
 */
export type 棋子<
  某颜色 extends 棋子颜色 = 棋子颜色,
  某种类 extends 棋子种类 = 棋子种类
> = {
  颜色: 某颜色
  种类: 某种类
}

export type 合法的棋子<某个棋子> = 某个棋子 extends 棋子<infer 颜色, infer 种类>
  ? 颜色 extends 这是合法的棋子颜色吗<颜色>
    ? 种类 extends 这是合法的棋子种类吗<种类>
      ? 棋子<颜色, 种类>
      : 不可能
    : 不可能
  : 不可能
