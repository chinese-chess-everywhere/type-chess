import type { 空, 是, 否, 不可能 } from './utils'
import type { 棋子 } from './chess'
import type { 红色, 黑色 } from './color'
import type { 将, 士, 象, 马, 车, 炮, 兵 } from './kind'
import type {
  棋子坐标,
  棋子横坐标,
  棋子纵坐标,
  最大横坐标,
  最大纵坐标,
} from './position'
import type { 零, 一, 二, 五, 相等, 减一, 加一, 整数 } from './integer'

/**
 * 棋局单元，描述棋盘上的一个棋位
 */
type 单元格内容参数 = 棋子 | 空

/**
 * 一
 */
export type 棋局单元 = {
  内容: 单元格内容参数
  下一个: 棋局单元 | 空
}

type 构造棋局单元<内容参数, 下一个> = 内容参数 extends 单元格内容参数
  ? 下一个 extends 棋局单元 | 空
    ? {
        内容: 内容参数
        下一个: 下一个
      }
    : 不可能
  : 不可能

type 从内容构造棋局单元<
  内容参数 extends 单元格内容参数,
  下一个 extends 棋局单元 | 空
> = {
  内容: 内容参数
  下一个: 下一个
}

/**
 * 棋局行，描述棋局上的一行棋位
 */
type 行内容参数 = [
  单元格内容参数,
  单元格内容参数,
  单元格内容参数,
  单元格内容参数,
  单元格内容参数,
  单元格内容参数,
  单元格内容参数,
  单元格内容参数,
  单元格内容参数
]

export type 棋局行 = {
  内容: 棋局单元 // 棋局单元形成的链表，指向第一个
  下一行: 棋局行 | 空
}

type 构造棋局行<内容参数, 下一行> = 内容参数 extends 行内容参数
  ? 下一行 extends 棋局行 | 空
    ? 内容参数 extends [
        infer 第零格,
        infer 第一格,
        infer 第二格,
        infer 第三格,
        infer 第四格,
        infer 第五格,
        infer 第六格,
        infer 第七格,
        infer 第八格
      ]
      ? {
          内容: 构造棋局单元<
            第零格,
            构造棋局单元<
              第一格,
              构造棋局单元<
                第二格,
                构造棋局单元<
                  第三格,
                  构造棋局单元<
                    第四格,
                    构造棋局单元<
                      第五格,
                      构造棋局单元<
                        第六格,
                        构造棋局单元<第七格, 构造棋局单元<第八格, 空>>
                      >
                    >
                  >
                >
              >
            >
          >
          下一行: 下一行
        }
      : 不可能
    : 不可能
  : 不可能

type 从内容构造棋局行<单元链表 extends 棋局单元, 下一行 extends 棋局行 | 空> = {
  内容: 单元链表
  下一行: 下一行
}

/**
 * 棋局，描述整个棋盘上所有的棋位
 */
type 棋局内容参数 = [
  行内容参数,
  行内容参数,
  行内容参数,
  行内容参数,
  行内容参数,
  行内容参数,
  行内容参数,
  行内容参数,
  行内容参数,
  行内容参数
]

export type 棋局 = {
  内容: 棋局行 // 棋局行形成的链表，指向第一个
}

export type 构造棋局<内容 extends 棋局内容参数 = 棋局内容参数> = 内容 extends [
  infer 第零行,
  infer 第一行,
  infer 第二行,
  infer 第三行,
  infer 第四行,
  infer 第五行,
  infer 第六行,
  infer 第七行,
  infer 第八行,
  infer 第九行
]
  ? {
      内容: 构造棋局行<
        第零行,
        构造棋局行<
          第一行,
          构造棋局行<
            第二行,
            构造棋局行<
              第三行,
              构造棋局行<
                第四行,
                构造棋局行<
                  第五行,
                  构造棋局行<
                    第六行,
                    构造棋局行<
                      第七行,
                      构造棋局行<第八行, 构造棋局行<第九行, 空>>
                    >
                  >
                >
              >
            >
          >
        >
      >
    }
  : 不可能

export type 从内容构造棋局<行链表 extends 棋局行> = {
  内容: 行链表
}

/**
 * 帮助函数
 */

/**
 * 在链表中获取指定行号的一行
 */
type 根据链表获取棋局指定行<
  行链表 extends 棋局行 | 空,
  行号 extends 棋子纵坐标
> = 行链表 extends 棋局行
  ? 是 extends 相等<行号, 零>
    ? 行链表
    : 根据链表获取棋局指定行<行链表['下一行'], 减一<行号>>
  : 不可能

type 获取棋局指定行<
  某棋局 extends 棋局,
  行号 extends 棋子纵坐标
> = 根据链表获取棋局指定行<某棋局['内容'], 行号>

/**
 * 在链表中获取指定列号的一个单元格
 */
type 根据链表获取棋局某行的指定单元格<
  单元链表 extends 棋局单元 | 空,
  列号 extends 棋子横坐标
> = 单元链表 extends 棋局单元
  ? 是 extends 相等<列号, 零>
    ? 单元链表
    : 根据链表获取棋局某行的指定单元格<单元链表['下一个'], 减一<列号>>
  : 不可能

type 获取某行的指定单元格<
  某行 extends 棋局行,
  列号 extends 棋子横坐标
> = 根据链表获取棋局某行的指定单元格<某行['内容'], 列号>

/**
 * 获取单元格内容
 */
type 获取某个单元内容<某单元 extends 棋局单元> = 某单元['内容']

/**
 * 获取棋局某位置的棋子
 */
export type 获取棋局某位置的单元<
  某棋局 extends 棋局,
  某位置 extends 棋子坐标
> = 某位置 extends 棋子坐标<infer 横坐标, infer 纵坐标>
  ? 获取某行的指定单元格<获取棋局指定行<某棋局, 纵坐标>, 横坐标>
  : 不可能

export type 获取棋局某位置的棋子<
  某棋局 extends 棋局,
  某位置 extends 棋子坐标
> = 获取某个单元内容<获取棋局某位置的单元<某棋局, 某位置>>

/**
 * 将棋局中的指定行替换为新的棋局行，替换之后，返回新的棋局
 */
export type 将棋局的某行替换为指定行<
  某棋局 extends 棋局,
  行号 extends 棋子纵坐标,
  新内容 extends 棋局单元,
  当前迭代行号 extends 整数
> = 当前迭代行号 extends 棋子纵坐标
  ? 根据链表获取棋局指定行<
      某棋局['内容'],
      当前迭代行号
    > extends infer 原先的这行
    ? 原先的这行 extends 棋局行
      ? 是 extends 相等<行号, 当前迭代行号>
        ? 从内容构造棋局行<新内容, 原先的这行['下一行']> // 如果是一行的开头，重新构造整个行，把原来的后续单元挂接过来就行了
        : 从内容构造棋局行<
            原先的这行['内容'],
            将棋局的某行替换为指定行<某棋局, 行号, 新内容, 加一<当前迭代行号>>
          >
      : 不可能
    : 不可能
  : 空

/**
 * 将棋局中的指定行替换为新的棋局行，替换之后，返回新的棋局
 */
export type 将棋局行的某单元替换为指定单元<
  某行 extends 棋局行,
  列号 extends 棋子横坐标,
  新内容 extends 单元格内容参数,
  当前迭代列号 extends 整数
> = 当前迭代列号 extends 棋子横坐标
  ? 根据链表获取棋局某行的指定单元格<
      某行['内容'],
      当前迭代列号
    > extends infer 原先的这个单元
    ? 原先的这个单元 extends 棋局单元
      ? 是 extends 相等<列号, 当前迭代列号>
        ? 从内容构造棋局单元<新内容, 原先的这个单元['下一个']> // 如果是一行的开头，重新构造整个行，把原来的后续单元挂接过来就行了
        : 从内容构造棋局单元<
            原先的这个单元['内容'],
            将棋局行的某单元替换为指定单元<
              某行,
              列号,
              新内容,
              加一<当前迭代列号>
            >
          >
      : 不可能
    : 不可能
  : 空

/**
 * 替换棋子内容后，返回新的棋局
 */
export type 将棋局某位置替换为指定棋子<
  某棋局 extends 棋局,
  某位置 extends 棋子坐标,
  某棋子或者空 extends 单元格内容参数
> = 获取棋局某位置的单元<某棋局, 某位置> extends infer 原位置的单元
  ? 原位置的单元 extends 棋局单元
    ? 某位置 extends 棋子坐标<infer 横坐标, infer 纵坐标>
      ? 获取棋局指定行<某棋局, 纵坐标> extends infer 原有的行
        ? 原有的行 extends 棋局行
          ? 从内容构造棋局<
              将棋局的某行替换为指定行<
                某棋局,
                纵坐标,
                将棋局行的某单元替换为指定单元<
                  原有的行,
                  横坐标,
                  某棋子或者空,
                  零
                >,
                零
              >
            >
          : 不可能
        : 不可能
      : 不可能
    : 不可能
  : 不可能

/**
 * 默认棋局
 */
export type 默认棋局 = 构造棋局<
  [
    [
      棋子<黑色, 车>,
      棋子<黑色, 马>,
      棋子<黑色, 象>,
      棋子<黑色, 士>,
      棋子<黑色, 将>,
      棋子<黑色, 士>,
      棋子<黑色, 象>,
      棋子<黑色, 马>,
      棋子<黑色, 车>
    ],
    [空, 空, 空, 空, 空, 空, 空, 空, 空],
    [空, 棋子<黑色, 炮>, 空, 空, 空, 空, 空, 棋子<黑色, 炮>, 空],
    [
      棋子<黑色, 兵>,
      空,
      棋子<黑色, 兵>,
      空,
      棋子<黑色, 兵>,
      空,
      棋子<黑色, 兵>,
      空,
      棋子<黑色, 兵>
    ],
    [空, 空, 空, 空, 空, 空, 空, 空, 空],
    [空, 空, 空, 空, 空, 空, 空, 空, 空],
    [
      棋子<红色, 兵>,
      空,
      棋子<红色, 兵>,
      空,
      棋子<红色, 兵>,
      空,
      棋子<红色, 兵>,
      空,
      棋子<红色, 兵>
    ],
    [空, 棋子<红色, 炮>, 空, 空, 空, 空, 空, 棋子<红色, 炮>, 空],
    [空, 空, 空, 空, 空, 空, 空, 空, 空],
    [
      棋子<红色, 车>,
      棋子<红色, 马>,
      棋子<红色, 象>,
      棋子<红色, 士>,
      棋子<红色, 将>,
      棋子<红色, 士>,
      棋子<红色, 象>,
      棋子<红色, 马>,
      棋子<红色, 车>
    ]
  ]
>

/**
 * 测试代码
 */
type 测试行0 = 获取棋局指定行<默认棋局, 零>
type 测试行1 = 获取棋局指定行<默认棋局, 二>

type 获取某行的棋子0 = 获取某行的指定单元格<测试行0, 零>
type 获取某行的棋子1 = 获取某行的指定单元格<测试行1, 一>

type 获取棋子1 = 获取棋局某位置的棋子<默认棋局, 棋子坐标<零, 零>>
type 获取棋子2 = 获取棋局某位置的棋子<默认棋局, 棋子坐标<一, 零>>
type 获取棋子3 = 获取棋局某位置的棋子<默认棋局, 棋子坐标<一, 二>>

type 在行中替换棋子0 = 将棋局行的某单元替换为指定单元<
  测试行0,
  一,
  棋子<红色, 车>,
  零
>

type 在行中替换棋子1 = 将棋局行的某单元替换为指定单元<
  测试行0,
  五,
  棋子<红色, 车>,
  零
>

type 在棋局中替换行0 = 将棋局的某行替换为指定行<
  默认棋局,
  零,
  测试行1['内容'],
  零
>

type 在棋局中替换行1 = 将棋局的某行替换为指定行<
  默认棋局,
  一,
  测试行0['内容'],
  零
>

type 在棋局替换棋子0 = 将棋局某位置替换为指定棋子<
  默认棋局,
  棋子坐标<零, 零>,
  棋子<红色, 车>
>

type 在棋局替换棋子1 = 将棋局某位置替换为指定棋子<
  默认棋局,
  棋子坐标<零, 五>,
  棋子<红色, 车>
>

type 在棋局替换棋子2 = 将棋局某位置替换为指定棋子<
  默认棋局,
  棋子坐标<五, 五>,
  棋子<红色, 车>
>
