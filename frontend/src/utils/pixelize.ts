export default class Pixelize {
  /**
   *クラスタリング
   *
   * @static
   * @param {Uint8ClampedArray} src
   * @param {Uint8ClampedArray} dst
   * @param {number} width
   * @param {number} height
   * @param {number} colors
   * @memberof Pixelize
   */
  public static kMeansFilter(
    src: Uint8ClampedArray,
    dst: Uint8ClampedArray,
    width: number,
    height: number,
    colors: number,
  ) {
    /**
     * ベクトル間距離
     *
     * @param {Uint8ClampedArray} vec1
     * @param {Uint8ClampedArray} vec2
     * @return {*}
     */
    const calcDistance = (vec1: Uint8ClampedArray, vec2: Uint8ClampedArray) => {
      let dist = 0
      for (let i = 0; i < vec1.length; i++) {
        dist += Math.pow(Math.abs(Number(vec2[i]) - Number(vec1[i])), 2)
      }
      dist = Math.sqrt(dist)
      return dist
    }

    const loopMax = 100 // ループ処理の最大回数

    // 初期化
    colors = parseInt(String(colors))
    const centroids = Array(colors) // 各クラスタ中心を保持

    for (let c = 0; c < colors; c++) {
      const rand_i = Math.floor(Math.random() * height)
      const rand_j = Math.floor(Math.random() * width)

      centroids[c] = src.slice((rand_j + rand_i * width) * 4, (rand_j + rand_i * width) * 4 + 3)
    }

    const clsts = Array(width * height) // 各画素の所属クラスタラベル（0～colors-1）を保持
    const clstsSum = Array(colors) // 各クラスタの重心計算用

    for (let c = 0; c < colors; c++) {
      clstsSum[c] = Array(3)
    }

    const clstsSize = Array(colors) // 各クラスタの重心計算用
    let count = 0

    // メイン処理
    let clstsPrev = JSON.parse(JSON.stringify(clsts))
    let exitFlg = false

    for (;;) {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const vec = src.slice((j + i * width) * 4, (j + i * width) * 4 + 3)
          let minDist = calcDistance(vec, centroids[0])
          let minClst = 0
          for (let c = 1; c < colors; c++) {
            const nextDist = calcDistance(vec, centroids[c])
            if (nextDist < minDist) {
              minDist = nextDist
              minClst = c
            }
          }
          clsts[j + i * width] = minClst
        }
      }

      // update centroids
      clstsSize.fill(0)
      for (let c = 0; c < colors; c++) {
        clstsSum[c].fill(0)
      }

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          const clst = clsts[j + i * width]
          for (let k = 0; k < 3; k++) {
            clstsSum[clst][k] += src[(j + i * width) * 4 + k]
          }
          clstsSize[clst] = clstsSize[clst] + 1
        }
      }

      for (let c = 0; c < colors; c++) {
        for (let k = 0; k < 3; k++) {
          centroids[c][k] = clstsSize[c] > 0 ? Math.floor(clstsSum[c][k] / clstsSize[c]) : 0
        }
      }

      exitFlg = JSON.stringify(clsts) === JSON.stringify(clstsPrev) || count > loopMax

      if (exitFlg) break

      clstsPrev = JSON.parse(JSON.stringify(clsts))
      count++
    }

    // クラスタリング結果を反映
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const clst = clsts[j + i * width]
        for (let k = 0; k < 3; k++) {
          dst[(j + i * width) * 4 + k] = centroids[clst][k]

          // 透明度は維持
          dst[(j + i * width) * 4 + 3] = src[(j + i * width) * 4 + 3]
        }
      }
    }
  }

  /**
   * ドット絵を見やすくする（拡大、グリッド線）
   *
   * @static
   * @param {*} inputImageData
   * @param {*} pixelSize
   * @param {*} grid
   * @return {*}
   * @memberof Pixelize
   */
  public static visualizePixel(inputImageData: ImageData, pixelSize: number, grid: boolean) {
    const vmax = 255 // 配列要素の最大値
    const gridStep = 10 // グリッド線をgridStepごとに太くする
    const newWidth = inputImageData.width * pixelSize
    const newHeight = inputImageData.height * pixelSize

    const outputImageData = new ImageData(
      inputImageData.width * pixelSize,
      inputImageData.height * pixelSize,
    )

    // 拡大
    for (let i = 0; i < newHeight; i++) {
      for (let j = 0; j < newWidth; j++) {
        const iOld = Math.floor(i / pixelSize)
        const jOld = Math.floor(j / pixelSize)
        for (let k = 0; k < 4; k++) {
          outputImageData.data[(j + i * newWidth) * 4 + k] =
            inputImageData.data[(jOld + iOld * inputImageData.width) * 4 + k]
        }
      }
    }

    // グリッド線
    if (grid) {
      for (let i = 0; i < newHeight; i++) {
        for (let j = 0; j < newWidth; j++) {
          if (
            i % pixelSize == 0 ||
            j % pixelSize == 0 ||
            (i + 1) % (pixelSize * gridStep) == 0 ||
            (j + 1) % (pixelSize * gridStep) == 0
          ) {
            let k = 0
            for (; k < 3; k++) {
              outputImageData.data[(j + i * newWidth) * 4 + k] = vmax
            }

            outputImageData.data[(j + i * newWidth) * 4 + k] = vmax
          }
        }
      }
    }
    return outputImageData
  }

  /**
   * imageDataからblobに変換
   *
   * @static
   * @param {string} dataurl
   * @return {*}
   * @memberof Pixelize
   */
  public static dataURLtoBlob(dataurl: string) {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1]
    const bstr = window.atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new Blob([u8arr], { type: mime })
  }
}
