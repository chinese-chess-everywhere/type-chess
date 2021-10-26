import type { 不可能, 是 } from '../utils'
import type { 红色, 黑色 } from '../color'

import type { 零, 一, 二, 三, 四, 五, 七, 八, 九 } from '../integer'
import type { 棋子坐标 } from '../position'

type 黑将的可能位置 =
  | 棋子坐标<三, 零>
  | 棋子坐标<三, 一>
  | 棋子坐标<三, 二>
  | 棋子坐标<四, 零>
  | 棋子坐标<四, 一>
  | 棋子坐标<四, 二>
  | 棋子坐标<五, 零>
  | 棋子坐标<五, 一>
  | 棋子坐标<五, 二>

type 红将的可能位置 =
  | 棋子坐标<三, 七>
  | 棋子坐标<三, 八>
  | 棋子坐标<三, 九>
  | 棋子坐标<四, 七>
  | 棋子坐标<四, 八>
  | 棋子坐标<四, 九>
  | 棋子坐标<五, 七>
  | 棋子坐标<五, 八>
  | 棋子坐标<五, 九>

type 黑将可以放在这里吗<位置> = 位置 extends 黑将的可能位置 ? 是 : 不可能
type 红将可以放在这里吗<位置> = 位置 extends 红将的可能位置 ? 是 : 不可能

export type 将可以放在这里吗<颜色, 位置> = 颜色 extends 红色
  ? 红将可以放在这里吗<位置>
  : 颜色 extends 黑色
  ? 黑将可以放在这里吗<位置>
  : 不可能

/**
 * 测试代码
 */
type 黑将00 = 将可以放在这里吗<黑色, 棋子坐标<零, 零>>
type 红将00 = 将可以放在这里吗<红色, 棋子坐标<零, 零>>
type 黑将31 = 将可以放在这里吗<黑色, 棋子坐标<三, 一>>
type 红将31 = 将可以放在这里吗<红色, 棋子坐标<三, 一>>
type 黑将47 = 将可以放在这里吗<黑色, 棋子坐标<四, 七>>
type 红将47 = 将可以放在这里吗<红色, 棋子坐标<四, 七>>
