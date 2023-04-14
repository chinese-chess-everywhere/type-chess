import type { 走棋 } from './game'
import type { 渲染棋局 } from './render'
import type { 默认棋局 } from './situation'
import type { 一, 二, 三, 四, 五, 六, 七, 八, 九 } from './integer'
import type { 构造棋子坐标 } from './position'

// 当头炮
type 当头炮 = 走棋<默认棋局, 构造棋子坐标<一, 二>, 构造棋子坐标<四, 二>>
type 走棋结果1 = 渲染棋局<当头炮>

type 马来跳 = 走棋<当头炮, 构造棋子坐标<一, 九>, 构造棋子坐标<二, 七>>
type 走棋结果2 = 渲染棋局<马来跳>

type 开局吃马 = 走棋<默认棋局, 构造棋子坐标<一, 二>, 构造棋子坐标<一, 九>>
type 走棋结果3 = 渲染棋局<开局吃马>
