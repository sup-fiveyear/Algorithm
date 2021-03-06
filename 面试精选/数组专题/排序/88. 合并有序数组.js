/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

/**
 *
  
  之所以从尾巴开始比较，是为了将结果比较大的元素添加到nums1的尾部，这样避免了“搬移数组”

  搬移数组是说，如果从小到大比较并移动元素的话，需要将元素向后串移（不太理解的简单跑一下从小到大即可）

            v     ！
       [3,4,5,0,0,0]

       [1,2,3]
            ^

v 指针物理意义：nums1 需要被比较的元素，当nums1移动(左移)到数组头部时（< 0） 则不再考虑移动。
^ 指针物理意义：nums1 需要被比较的元素，同上。
！指针物理意义：v 和 ^ 比较后，将大的元素移动至这里，而后向左移动。


            v     ！
       [3,4,5,0,0,0]                    
                        5 > 3 v-- !--
       [1,2,3]
            ^

          v     ！
       [3,4,5,0,0,5]                    
                        4 > 3 v-- !--
       [1,2,3]
            ^

        v     ！
       [3,4,5,0,4,5]                    
                        3(v) >= 3(^) v-- !--
       [1,2,3]
            ^

      v     ！
       [3,4,5,3,4,5]                    
                        * cornercase: v出界，需要将^所指向的每一个元素拷贝至!指针位置          [1,2,3]                        每拷贝一次，^-- !-- 当^出界后，结束。
            ^

总结需要考虑的问题：
  1. 需要循环(拷贝)的满足条件： ^大于0 也就是说还有元素可以拷贝
  2. cornercase: 
      由于是将nums2合如nums1(如果是nums1大的话（上述例子的返例），也无妨)，所以只需要关注当
      v指针<0后开始特殊拷贝。
  3. 谁大移动谁并拷贝     
 *
 */
var merge = function (nums1, m, nums2, n) {
  let length = m + n; // !指针， v 指针用m，同理^指针用n,不过在移动时候先--再移动。
  while (n > 0) {
    if (m <= 0) {
      // v 指针出界，进行特殊拷贝
      nums1[--length] = nums2[--n];
    }
    // 谁大移动谁，进行比较
    nums1[--length] = nums1[m - 1] >= nums2[n - 1] ? nums1[--m] : nums2[--n];
  }
};
merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
