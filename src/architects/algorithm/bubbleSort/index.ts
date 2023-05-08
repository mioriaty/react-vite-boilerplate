/**
 * Giải thuật:
 * - Là 1 thuật toán sắp xếp hoạt động bằng cách lặp lại việc đổi chỗ các phần tử kế cận nếu chúng đang ở thứ tự sai
 * - Hàm bubbleSort nhận vào một mảng arr và trả về mảng đã được sắp xếp theo thứ tự tăng dần. Thuật toán bắt đầu bằng cách lặp qua mảng từ đầu đến cuối bằng một vòng lặp for. Trong mỗi lần lặp, nó sẽ lặp qua mảng từ đầu đến n - i - 1 bằng một vòng lặp for khác để so sánh các phần tử kế cận và đổi chỗ nếu cần thiết.
 * - Nếu phần tử thứ j lớn hơn phần tử thứ j + 1, chúng sẽ được đổi chỗ bằng cách sử dụng biến tạm temp. Sau khi vòng lặp hoàn thành, phần tử lớn nhất sẽ được đưa vào vị trí cuối cùng của mảng. Quá trình lặp lại này sẽ được tiếp tục cho đến khi không có phần tử nào cần được đổi chỗ nữa.
 * - Bubble Sort có độ phức tạp thời gian là O(n^2), nghĩa là thời gian thực hiện tăng theo bình phương của kích thước đầu vào. Nó được coi là một trong những thuật toán sắp xếp chậm nhất và ít được sử dụng trong các ứng dụng thực tế.
 * */

export const bubbleSort = (arr: number[]) => {
  const n = arr.length;

  // Lặp qua mảng từ đầu đến cuối
  for (let i = 0; i < n - 1; i++) {
    // Lặp qua mảng từ đầu đến n - i - 1
    for (let j = 0; j < n - i - 1; j++) {
      // Nếu phần tử thứ j lớn hơn phần tử thứ j + 1 thì ta đổi chỗ chúng
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};
