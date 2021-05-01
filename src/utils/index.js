/* 将一维数转换成指定个数的子数组组成的二维数组 */
export const uChunkArray = (arr, size) => {
    if(!Array.isArray(arr) || size <= 0){
        return arr
    }

    let result = []
    //arr.length - size
    while(arr.length > size){
        result.push(arr.splice(0, size))
    }

    arr.length && result.push(arr)
    return result
}

//构造一个星星评分数组
export const uStarArray = (score) => {
    if(score < 0 || score == null ){
        return score
    }

    let result = Array(5)
    let floorScore = Math.floor(score)
    result.fill('off', 0, 5) // 默认全灰星 0分
    result.fill('on',0,floorScore)// 满星
    score > floorScore && result.fill('half',floorScore, floorScore + 1) //半星

    return result
}

