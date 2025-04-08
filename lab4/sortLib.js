const SORTING_ALGORITHMS = {
    // Лічильник дій: порівняння та переміщення
    initStats() {
      return {
        checks: 0,
        moves: 0,
        report() {
          console.log(`Comparisons: ${this.checks}, Swaps/Moves: ${this.moves}`);
        },
      };
    },
  
    // Обробка масивів з порожніми елементами
    normalizeArray(array) {
      let foundEmpty = false;
      for (let i = 0; i < array.length; i++) {
        if (array[i] === undefined) {
          array[i] = null;
          foundEmpty = true;
        }
      }
      if (foundEmpty) {
        console.log(
          "Note: Sparse array detected. Missing values replaced with null."
        );
      }
      return array;
    },
  
    // Бульбашкове сортування
    bubbleSort(data, ascending = true) {
      const stats = this.initStats();
      const arr = this.normalizeArray([...data]);
  
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          stats.checks++;
          const shouldSwap = ascending ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1];
          if (shouldSwap) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            stats.moves++;
          }
        }
      }
      stats.report();
      return arr;
    },
  
    // Сортування вибором
    selectSort(data, ascending = true) {
      const stats = this.initStats();
      const arr = this.normalizeArray([...data]);
  
      for (let i = 0; i < arr.length - 1; i++) {
        let target = i;
        for (let j = i + 1; j < arr.length; j++) {
          stats.checks++;
          const condition = ascending ? arr[j] < arr[target] : arr[j] > arr[target];
          if (condition) {
            target = j;
          }
        }
        if (target !== i) {
          [arr[i], arr[target]] = [arr[target], arr[i]];
          stats.moves++;
        }
      }
      stats.report();
      return arr;
    },
  
    // Сортування вставками
    insertSort(data, ascending = true) {
      const stats = this.initStats();
      const arr = this.normalizeArray([...data]);
  
      for (let i = 1; i < arr.length; i++) {
        const temp = arr[i];
        let j = i - 1;
        while (j >= 0) {
          stats.checks++;
          const shouldShift = ascending ? arr[j] > temp : arr[j] < temp;
          if (shouldShift) {
            arr[j + 1] = arr[j];
            stats.moves++;
            j--;
          } else break;
        }
        arr[j + 1] = temp;
      }
  
      stats.report();
      return arr;
    },
  
    // Сортування Шелла
    shellSortAlgo(data, ascending = true) {
      const stats = this.initStats();
      const arr = this.normalizeArray([...data]);
      const size = arr.length;
  
      for (let gap = Math.floor(size / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < size; i++) {
          const value = arr[i];
          let j = i;
  
          while (j >= gap) {
            stats.checks++;
            const shift = ascending ? arr[j - gap] > value : arr[j - gap] < value;
            if (shift) {
              arr[j] = arr[j - gap];
              stats.moves++;
              j -= gap;
            } else break;
          }
  
          arr[j] = value;
        }
      }
  
      stats.report();
      return arr;
    },
  
    // Швидке сортування (Quick Sort)
    quickSortAlgo(data, ascending = true) {
      const stats = this.initStats();
      const arr = this.normalizeArray([...data]);
  
      const partition = (arr, left, right) => {
        const pivot = arr[right];
        let i = left - 1;
  
        for (let j = left; j < right; j++) {
          stats.checks++;
          const condition = ascending ? arr[j] <= pivot : arr[j] >= pivot;
          if (condition) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            stats.moves++;
          }
        }
        [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
        stats.moves++;
        return i + 1;
      };
  
      const quickSortHelper = (arr, left, right) => {
        if (left < right) {
          const pivotIndex = partition(arr, left, right);
          quickSortHelper(arr, left, pivotIndex - 1);
          quickSortHelper(arr, pivotIndex + 1, right);
        }
      };
  
      quickSortHelper(arr, 0, arr.length - 1);
      stats.report();
      return arr;
    },
  };
  
  // Створення масивів для тестів
  const normalData = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * 1000)
  );
  const gappedData = Array.from({ length: 100 }, () =>
    Math.random() > 0.2 ? Math.floor(Math.random() * 1000) : undefined
  );
  
  // Набір алгоритмів
  const techniques = [
    ["Bubble Sort", SORTING_ALGORITHMS.bubbleSort],
    ["Selection Sort", SORTING_ALGORITHMS.selectSort],
    ["Insertion Sort", SORTING_ALGORITHMS.insertSort],
    ["Shell Sort", SORTING_ALGORITHMS.shellSortAlgo],
    ["Quick Sort", SORTING_ALGORITHMS.quickSortAlgo],
  ];
  
  // Тест звичайного масиву
  console.log("\n=== Стандартний масив (100 елементів) ===");
  techniques.forEach(([label, func]) => {
    console.log(`\n${label}:`);
    const outcome = func(normalData, true);
    console.log(`[${outcome}]`);
  });
  
  // Тест розрідженого масиву
  console.log("\n=== Масив з пропусками (100 елементів) ===");
  techniques.forEach(([label, func]) => {
    console.log(`\n${label}:`);
    const outcome = func(gappedData, true);
    console.log(`[${outcome}]`);
  });
  