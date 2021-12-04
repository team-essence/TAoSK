type Rank = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

export default class Status {
  /**
   * ステータス値からランクへ変換
   *
   * @static
   * @param {number} value
   * @return {Rank} [ 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'の形で返す ]
   * @memberof status
   */
  public static toRank(value: number): Rank {
    const rank = (value / 100) | 0

    if (rank === 0) return 'G'
    else if (rank === 1) return 'F'
    else if (rank === 2) return 'E'
    else if (rank === 3) return 'D'
    else if (rank === 4) return 'C'
    else if (rank === 5) return 'B'
    else if (rank === 6) return 'A'
    else return 'S'
  }

  /**
   * ランクにならない余りのステータス値を返す
   *
   * @static
   * @param {number} value
   * @return {number} [余りのステータス値]
   * @memberof status
   */
  public static toRemainderStatus(value: number): number {
    return value % 100
  }
}
