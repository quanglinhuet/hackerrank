
function steadyGene(gene) {
    let dict = { A: 0, C: 0, T: 0, G: 0 };
    for (let c of gene) {
        dict[c]++;
    }
    let l = 0, r = 0, length = gene.length, min = gen.length;
    while(l < length && r < length) {
        if(Object.keys(dict).every((key) => dict[key] * 4 <= length)) {
            if (min > r - l) {
                min = r - l;
            }
            dict[gene[++l]]++;
        } else {
            dict[gene[++r]]--;
        }
    }
    return min;
}


let gene = 'AAAAAAAA';
console.log(steadyGene(gene));