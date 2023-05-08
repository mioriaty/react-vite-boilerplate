/**
 * Giả thuật:
 * - Selection Sort là một thuật toán sắp xếp đơn giản hoạt động bằng cách tìm kiếm phần tử nhỏ nhất và đưa nó vào đầu mảng đã sắp xếp
 * - Hàm selectionSort nhận vào một mảng arr và trả về mảng đã được sắp xếp theo thứ tự tăng dần. Thuật toán bắt đầu bằng cách lặp qua mảng từ đầu đến n - 1 bằng một vòng lặp for. Trong mỗi lần lặp, nó sẽ tìm kiếm phần tử nhỏ nhất trong mảng chưa được sắp xếp bằng cách lặp qua mảng từ vị trí i + 1 đến n bằng một vòng lặp for. Nếu phần tử đang xét nhỏ hơn phần tử nhỏ nhất đã tìm thấy, nó sẽ được lưu trữ trong biến minIndex.
 * - Sau khi tìm được phần tử nhỏ nhất trong mảng chưa được sắp xếp, nó sẽ được đưa vào vị trí đầu tiên của mảng chưa được sắp xếp bằng cách đổi chỗ với phần tử đầu tiên của mảng chưa được sắp xếp. Quá trình lặp lại này sẽ được tiếp tục cho đến khi toàn bộ mảng được sắp xếp.
 * - Selection Sort có độ phức tạp thời gian là O(n^2), tương tự như Bubble Sort. Mặc dù nó không hiệu quả như những thuật toán sắp xếp nhanh hơn như Quick Sort hay Merge Sort, Selection Sort vẫn được sử dụng trong một số trường hợp đặc biệt.
 * */
export const selectionSort = (arr: number[]) => {
  const n = arr.length;

  // Lặp qua mảng từ đầu đến n - 1
  for (let i = 0; i < n - 1; i++) {
    // Tìm phần tử nhỏ nhất trong mảng chưa được sắp xếp
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Đưa phần tử nhỏ nhất vào vị trí đầu tiên của mảng chưa được sắp xếp
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }

  return arr;
};
