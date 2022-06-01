function longestIncreasingSubsequence(arr) {
    // Ý tưởng: đi duyệt tuần tự mảng, đi tới đâu memory tới đó vào 1 mảng.
    // Các phẩn tử trong mảng là giá trị nhỏ nhất để đạt được độ dài = index của phẩn tử đó + 1.
    // Khi này các phẩn tử trong mảng memory sẽ luôn được sắp xếp theo thứ tự tăng dần. 
    // => Có thể sử dụng binary search để tìm kiếm xem với phần tử hiện tại thì có thể thay thì có thể 
    //    cập nhật được giá trị trong bảng memory không. (Các phẩn tử trong mảng là giá trị nhỏ nhất để đạt được độ dài = index của phẩn tử đó + 1)
    let memoriedTable = [arr[0]];
    for (let index = 1; index < arr.length; index++) {
        const element = arr[index];
        if (element > memoriedTable[memoriedTable.length -1]) {
            memoriedTable.push(element);
        } else {
            const changeIndex = binarySearch(memoriedTable, element);
            if (changeIndex >= 0) {
                memoriedTable[changeIndex] = element;
            }
        }
    }
    return memoriedTable.length;
}

/**
 * Find index of element smallest greater than value
 * @param {*} arr 
 * @param {*} value 
 */
function binarySearch(arr, value) {
    let l =0, r = arr.length -1;
    while(r >= l) {
        let mid = Math.ceil((l+r)/2);
        if (arr[mid] > value && (arr[mid-1] < value || mid ===0)) {
            return mid;
        } else if (arr[mid] > value) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return -1;
}

const fs = require('fs');
const data = fs.readFileSync('./input08.txt', 'utf-8').split(/\n/);
data.shift();
let tc = data.map(s => parseInt(s));
console.log(tc.length);

console.log(longestIncreasingSubsequence(tc));
