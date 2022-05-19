/**
 * 两数之和: 暴力O(n^2), map
 * */

const nums = [2, 7, 11, 15]
const tar = 9

const twoSum = (nums: number[], target: number): number[] | undefined => {
  // 创建一个映射表
  const map = new Map()
  // 遍历数组nums, 将数组跟target做一个映射关系
  for (let i in nums) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i]
    } else {
      map.set(nums[i], i)
    }
  }
}

twoSum(nums, tar)
