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
    let aUpperOnly = a.replace(/[a-z]+/, '');
    // First check all uppercase contains in each string
    let memoizedTable1 = Array(aUpperOnly.length + 1).fill([]).map(() => {
        return Array(b.length + 1).fill(0);
    });
    let memoizedIndexs = [];
    for (let i = 1; i <= aUpperOnly.length; i++) {
        memoizedIndexs.push([]);
        let checkRow = false;
        for (let j = 1; j < b.length; j++) {
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

    
    let bUsed = Array(b.length + 1).fill(false);
    // Write your code here
    let memoizedTable2 = Array(a.length + 1).fill([]).map(() => {
        return Array(b.length + 1).fill(0);
    });
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (!checkUpperCase(a[i - 1]) && !bUsed[j] && a[i - 1].toUpperCase() === b[j - 1]) {
                memoizedTable2[i][j] = memoizedTable2[i-1][j-1] + 1;
            } else {
                memoizedTable2[i][j] = memoizedTable2[i - 1][j] > memoizedTable2[i][j - 1] ? memoizedTable2[i - 1][j] : memoizedTable2[i][j - 1];
            }
        }
    }
    if (memoizedTable2[a.length][b.length] === b.length - countUsed) {
        return 'YES';
    }
    return 'NO';
}

function checkUpperCase(char) {
    return /^[A-Z]$/.test(char);
}

console.log(abbreviation('ababbaAbAB', 'AABABB'));
