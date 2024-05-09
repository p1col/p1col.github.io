/**
 * 提示信息
 * @property x 横坐标
 * @property y 纵坐标
 * @property z 所在的九宫格序号
 * @property val 当前格内的数字
 * @property readonly 只读，标识题面原有的数字
 * @property options 当前格能填入的数字集合，以二进制表示，1 为已填，0 为可填
 */
export type Tip = {
  x: number;
  y: number;
  z: number;
  val: number;
  readonly: boolean;
  options: string;
};

/**
 * 提示信息合集
 */
export type SudokuInfo = Record<string, Tip>;

/**
 * 根据坐标计算九宫格序号
 * @param x 行坐标
 * @param y 列坐标
 * @returns 所在九宫格序号
 */
const getZone = (x: number, y: number): number => Math.floor(x / 3) * 3 + Math.floor(y / 3);

/**
 * 将数字转换需要的二进制格式对应的十进制数，用于后续计算
 * 数字：[1,2,3,4,5,6,7,8,9]
 * num: 1
 * 二进制: 100000000 ==>  256
 * num: 4
 * 二进制: 000100000 ==>  32
 * num: 8
 * 二进制: 000000010 ==>  2
 * @param num 数字
 * @returns 十进制数，映射当前数字在 [1-9] 中的位置
 */
const numToInt2 = (num: number) => (num > 0 ? 2 ** (9 - num) : 0);

/**
 * 在二进制字符串前补 '0' 直至长度为 9
 * @param str 二进制字符串
 * @returns 九位数二进制字符串
 */
const addPrefix = (str: string) => '0'.repeat(9 - str.length) + str;

/**
 * 位运算加法
 * @param oldVal 原有的值
 * @param newVal 要加上的数字
 * @returns 加法结果
 */
const addNum = (oldVal: number, newVal: number): number => oldVal | numToInt2(newVal);

/**
 * 位运算减法
 * @param oldVal 原有的值
 * @param newVal 要减去的数字
 * @returns 减法结果
 */
const delNum = (oldVal: number, newVal: number): number => oldVal & (511 - numToInt2(newVal));

/**
 * 获取 infoMap 对应的键名
 * @param x 横坐标
 * @param y 纵坐标
 * @returns infoMap 的键名
 */
export const getKeyName = (x: number, y: number): string => `${x}-${y}`;

export class Sudoku {
  info: SudokuInfo = {};
  question: number[][];

  constructor(question: number[][]) {
    this.question = question;
    this.setTips(this.getNumberExist());
  }
  // 根据题面获取初始 info
  getNumberExist() {
    let rows: number[] = new Array(9).fill(0);
    let cols: number[] = new Array(9).fill(0);
    let zones: number[] = new Array(9).fill(0);
    let x = 0;
    while (x < 9) {
      let y = 0;
      while (y < 9) {
        // 剪枝，跳过 0
        if (this.question[x][y] > 0) {
          // 翻转二进制位映射的数字顺序，从 1 到 9 排列
          const z = getZone(x, y);

          // 标记已存在的数字
          rows[x] = addNum(rows[x], this.question[x][y]);
          cols[y] = addNum(cols[y], this.question[x][y]);
          zones[z] = addNum(zones[z], this.question[x][y]);
        }

        y++;
      }
      x++;
    }
    return { rows, cols, zones };
  }
  setTips({ rows, cols, zones }: Record<string, number[]>) {
    let x = 0;
    while (x < 9) {
      let y = 0;
      while (y < 9) {
        let z = getZone(x, y);
        const readonly = !!this.question[x][y];
        let options = '';
        if (!readonly) {
          options = (rows[x] | cols[y] | zones[z]).toString(2);
          // 前面翻转了二进制映射的数字顺序，此处必须补零确保顺序不变
          options = addPrefix(options);
        }
        this.info[getKeyName(x, y)] = {
          x,
          y,
          z,
          val: this.question[x][y],
          readonly,
          options,
        };

        y++;
      }
      x++;
    }
  }
  updateTip(x: number, y: number, val: number) {
    const cell = this.info[getKeyName(x, y)];
    if (
      !cell ||
      (typeof cell === 'object' && Object.keys(cell).length === 0) ||
      (!cell.val && !val)
    ) {
      return;
    }
    // 原本有值并且和新值不等，删除旧数
    this.question[x][y] = val;
    let row = 0;
    while (row < 9) {
      let col = 0;
      while (col < 9) {
        let zone = getZone(row, col);
        let target = this.info[getKeyName(row, col)];
        if ((row === x || col === y || zone === cell.z) && !target.readonly) {
          let options = addNum(delNum(parseInt(target.options, 2), cell.val), val).toString(2);
          // 前面翻转了二进制映射的数字顺序，此处必须补零确保顺序不变
          target.options = addPrefix(options);
          console.log(
            `修改${row}-${col}的选项为：${options}。旧值：${cell.x}-${cell.y}-${cell.val}当前值为：${val}`
          );
        }
        col++;
      }
      row++;
    }
    cell.val = val;
  }
}
