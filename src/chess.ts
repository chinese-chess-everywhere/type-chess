import type { 不可能 } from './utils'
import type { 棋子颜色 } from './color'
import type { 棋子种类 } from './kind'

/**
 * 棋子
 */
export type 棋子 = {
  颜色: 棋子颜色
  种类: 棋子种类
}

export type 构造棋子<某颜色, 某种类> = 某颜色 extends 棋子颜色
  ? 某种类 extends 棋子种类
    ? {
        颜色: 某颜色
        种类: 某种类
      }
    : 不可能
  : 不可能
