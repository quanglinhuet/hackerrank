/*
 * Complete the 'abbreviation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */
/**
 * ###################
 * Ý tưởng 1: [DOUBLE DP]  break ra nhiều cách lựa chọn các phần tử upcase ở B theo các phần tử upcase ở A bằng DP
 * Sau đó check khả thi từng cách bằng DP. Nếu có 1 cách ok => YES
 * ###################
 */
function abbreviation(a, b) {
    
    let aUpperIndexs = [];
    let aUpperOnly = '';
    let aArray = []
    let testString = '';
    for (let i = 0; i< a.length; i ++) {
        if (checkUpperCase(a[i])) {
            aUpperOnly += a[i];
            aUpperIndexs.push(i);
            if (testString !== '') {
                aArray.push(testString);
                testString = '';
            }
        } else {
            testString += a[i];
        }
    }
    // First check all uppercase contains in each string
    let memoizedTable1 = Array(aUpperOnly.length + 1).fill([]).map(() => {
        return Array(b.length + 1).fill(0);
    });
    let memoizedIndexs = [];
    for (let i = 1; i <= aUpperOnly.length; i++) {
        memoizedIndexs.push([]);
        let checkRow = false;
        for (let j = 1; j <= b.length; j++) {
            if (aUpperOnly[i-1] === b[j-1]) {
                memoizedTable1[i][j] = memoizedTable1[i-1][j-1] + 1;
                if(memoizedTable1[i-1][j-1] + 1>= i) {
                    memoizedIndexs[i-1].push(j-1);
                    checkRow = true;
                }
            } else {
                memoizedTable1[i][j] = memoizedTable1[i -1][j] > memoizedTable1[i][j-1] ? memoizedTable1[i -1][j] : memoizedTable1[i][j-1];
            }
        }
        if (!checkRow) {
            return 'NO';
        }
    }

    let wayTable = [];
    const makingWay = (deep, arr = []) => {
        if (deep < 0) {
            wayTable.push([...arr]);
            return;
        }
        for (const val of memoizedIndexs[deep]) {
            if (val < arr[0] || arr.length === 0) {
                arr.unshift(val)
                makingWay(deep - 1, arr);
                arr.shift();
            } else {
                break;
            }
        }
    }
    // Making all way to choise UpperCase in B
    makingWay(memoizedIndexs.length -1);

    const checkWay = (way, index) => {
        let aStart = index > 0 ? aUpperIndexs[index - 1] + 1 : 0;
        let aEnd = index < aUpperIndexs.length ? aUpperIndexs[index] -1 : a.length -1; 
        let bStart = index > 0 ? way[index - 1] + 1 : 0;
        let bEnd = index < way.length ? way[index] -1 : b.length -1;
        if (bEnd === bStart ) {
            return true;
        }
        let memoizedTable1 = Array(aEnd - aStart + 2).fill([]).map(() => Array(bEnd - bStart + 2).fill(0));
        return true;
    }

    for (let way of wayTable) {
        let success = true;
        for (let i = 0; i <= way.length && success; i++){
            if (!checkWay(way, i)) {
                success = false;
            }
        }
        if (success) {
            return 'YES';
        }
    }
    return 'NO';
}

function checkUpperCase(char) {
    return /^[A-Z]$/.test(char);
}

console.log(abbreviation('ababbaAbAB', 'AABABB'));
