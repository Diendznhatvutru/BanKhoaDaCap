document.addEventListener("DOMContentLoaded", function () {
  const courseForm = document.getElementById("course-form");
  const courseList = document.getElementById("course-list");
  const addCourseButton = document.getElementById("add-course-button");
  const courseModal = document.getElementById("course-modal");
  const closeModal = document.querySelector(".close");
  const searchInput = document.getElementById("search-input");

  // Hiện modal thêm khóa học
  addCourseButton.addEventListener("click", function () {
    courseModal.classList.remove("hidden");
    document.getElementById("modal-title").innerText = "Thêm Khóa Học";
    courseForm.reset(); // Đặt lại biểu mẫu
    document.getElementById("course-id").removeAttribute("readonly"); // Cho phép người dùng nhập mã khóa học
  });

  // Đóng modal khi nhấn nút X
  closeModal.addEventListener("click", function () {
    courseModal.classList.add("hidden");
  });

  // Đóng modal khi nhấn ngoài modal
  window.addEventListener("click", function (event) {
    if (event.target == courseModal) {
      courseModal.classList.add("hidden");
    }
  });

  // Xử lý việc gửi biểu mẫu
  courseForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn gửi mặc định

    const courseId =
      document.getElementById("course-id").value ||
      Math.random().toString(36).substring(7).toUpperCase(); // Cho phép nhập mã khóa học hoặc tạo ngẫu nhiên nếu trống
    const courseName = document.getElementById("course-name").value;
    const courseDescription =
      document.getElementById("course-description").value;
    const instructor = document.getElementById("instructor").value;

    // Thêm thẻ khóa học vào danh sách
    const courseCard = document.createElement("div");
    courseCard.className = "course-card";
    courseCard.innerHTML = `
          <h3>${courseName}</h3>
          <p><strong>Mã Khóa Học:</strong> ${courseId}</p>
          <p><strong>Giảng Viên:</strong> ${instructor}</p>
          <p><strong>Mô Tả:</strong> ${
            courseDescription || "Không có mô tả"
          }</p>
          <p><strong>Ngày Tạo:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Ngày Cập Nhật:</strong> ${new Date().toLocaleString()}</p>
          <button class="edit-button">Sửa</button>
          <button class="delete-button">Xóa</button>
      `;

    courseList.appendChild(courseCard);
    courseModal.classList.add("hidden"); // Ẩn modal sau khi thêm khóa học
  });

  // Xử lý xóa và sửa khóa học
  courseList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
      const confirmation = confirm(
        "Bạn có chắc chắn muốn xóa khóa học này không?"
      );
      if (confirmation) {
        const card = event.target.closest(".course-card");
        courseList.removeChild(card); // Xóa thẻ khóa học
      }
    }

    if (event.target.classList.contains("edit-button")) {
      // Logic để chỉnh sửa thông tin khóa học
      alert("Chức năng sửa khóa học đang được triển khai!");
    }
  });

  // Tìm kiếm khóa học
  searchInput.addEventListener("input", function () {
    const filter = searchInput.value.toLowerCase();
    const courseCards = courseList.getElementsByClassName("course-card");

    Array.from(courseCards).forEach((card) => {
      const courseName = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = courseName.includes(filter) ? "" : "none"; // Hiển thị hoặc ẩn thẻ khóa học
    });
  });
});
