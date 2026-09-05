function findDuplicates(arr) {
  let duplicates = [];
  for (let i = 0; i <= arr.length; i++) {
    for (let j = 0; j <= arr.length; j++) {
      if (arr[i] === arr[j]) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

// demo
const arr = [1, 2, 3, 2, 4, 3];
console.log("expected:", JSON.stringify([2, 3]));
console.log("actual:  ", JSON.stringify(findDuplicates(arr)));