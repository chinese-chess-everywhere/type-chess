import type { 是, 否, 不可能 } from './utils'

/**
 * 整数相关的定义
 */
export type 零 = {
  是零吗: 是
}

export type 加一<T extends 整数> = {
  前一个数: T
  是零吗: 否
}

export type 整数 = 零 | { 前一个数: 整数; 是零吗: 否 }

export type 减一<某个数 extends 整数> = 某个数 extends 加一<infer 前一个数>
  ? 前一个数
  : 不可能

export type 一 = 加一<零>
export type 二 = 加一<一>
export type 三 = 加一<二>
export type 四 = 加一<三>
export type 五 = 加一<四>
export type 六 = 加一<五>
export type 七 = 加一<六>
export type 八 = 加一<七>
export type 九 = 加一<八>

/**
 * 偏序比较运算
 */
export type 相等<
  第一个数 extends 整数,
  第二个数 extends 整数
> = 第一个数 extends 零
  ? 第二个数 extends 零
    ? 是
    : 否
  : 第二个数 extends 零
  ? 否
  : 相等<减一<第一个数>, 减一<第二个数>>

export type 大于<
  第一个数 extends 整数,
  第二个数 extends 整数
> = 第一个数 extends 零
  ? 否
  : 第二个数 extends 零
  ? 是
  : 大于<减一<第一个数>, 减一<第二个数>>

export type 小于<
  第一个数 extends 整数,
  第二个数 extends 整数
> = 第一个数 extends 零
  ? 第二个数 extends 零
    ? 否
    : 是
  : 第二个数 extends 零
  ? 否
  : 小于<减一<第一个数>, 减一<第二个数>>

export type 大于等于<
  第一个数 extends 整数,
  第二个数 extends 整数
> = 是 extends 相等<第一个数, 第二个数> ? 是 : 大于<第一个数, 第二个数>

export type 小于等于<
  第一个数 extends 整数,
  第二个数 extends 整数
> = 是 extends 相等<第一个数, 第二个数> ? 是 : 小于<第一个数, 第二个数>

export type 将两个整数从小到大排序<数组> = 数组 extends [
  infer 整数1,
  infer 整数2
]
  ? 整数1 extends 整数
    ? 整数2 extends 整数
      ? 是 extends 大于<整数1, 整数2>
        ? [整数2, 整数1]
        : [整数1, 整数2]
      : 不可能
    : 不可能
  : 不可能

/**
 * 开始测试
 */
type 相等0 = 相等<五, 六>
type 相等1 = 相等<八, 八>

type 减一0 = 相等<减一<四>, 二>
type 减一1 = 相等<减一<四>, 三>

type 加一0 = 相等<加一<四>, 五>
type 加一1 = 相等<加一<四>, 七>

type 小于0 = 小于<八, 三>
type 小于1 = 小于<二, 二>
type 小于2 = 小于<零, 一>
type 小于3 = 小于<二, 五>

type 大于0 = 大于<八, 三>
type 大于1 = 大于<二, 二>
type 大于2 = 大于<零, 一>
type 大于3 = 大于<五, 零>

type 小于等于0 = 小于等于<八, 三>
type 小于等于1 = 小于等于<二, 二>
type 小于等于2 = 小于等于<零, 一>
type 小于等于3 = 小于等于<二, 五>

type 大于等于0 = 大于等于<八, 三>
type 大于等于1 = 大于等于<二, 二>
type 大于等于2 = 大于等于<零, 一>
type 大于等于3 = 大于等于<五, 零>

type 排序0 = 将两个整数从小到大排序<[五, 三]>
type 排序1 = 将两个整数从小到大排序<[三, 五]>
type 排序2 = 将两个整数从小到大排序<[三, 三]>
