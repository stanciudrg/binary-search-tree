export default function mergeSort(numbers) {
  // Recursion base case
  if (numbers.length == 1) {
    return numbers;
  } else {
    // Find the midpoint of the array
    const mid = numbers.length / 2;
    // Sort the first half of the array
    const firstHalf = mergeSort(numbers.slice(0, mid));
    // Sort the second half of the array
    const secondHalf = mergeSort(numbers.slice(mid, numbers.length));

    // Merge the sorted versions of the first and second halves of the array
    return merge(firstHalf, secondHalf);
  }
}

function merge(firstArray, secondArray) {
  const newArray = [];
  let i = 0;
  let j = 0;
  let k = 0;

  // Compare each element of the first array with each element of the second array
  // until reaching the end of one of the arrays or the end of both arrays
  while (i < firstArray.length && j < secondArray.length) {
    // Push into the newArray the winning element
    if (firstArray[i] < secondArray[j]) {
      newArray[k++] = firstArray[i++];
    } else {
      newArray[k++] = secondArray[j++];
    }
  }

  // Loop through the remaining elements of each array, if applicable.
  // Do not reinitialize the i variable, continue from where the while loop left it
  for (i; i < firstArray.length; i++) {
    newArray[k++] = firstArray[i];
  }

  for (j; j < secondArray.length; j++) {
    newArray[k++] = secondArray[j];
  }

  return newArray;
}
