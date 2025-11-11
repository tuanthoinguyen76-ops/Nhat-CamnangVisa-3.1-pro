async function runInstaller() {
  const status = document.getElementById("status");
  status.innerHTML = "⏳ Đang tải dữ liệu...";
  
  try {
    // Tải index gốc (đang bị ẩn)
    const html = await fetch("github/index.html").then(r => r.text());
    status.innerHTML = "✅ Tải thành công. Đang khởi chạy...";

    // Tạo DOM ẩn
    const hidden = document.createElement("div");
    hidden.style.display = "none";
    hidden.innerHTML = html;
    document.body.appendChild(hidden);

    // Chạy toàn bộ <script> bên trong index gốc
    hidden.querySelectorAll("script").forEach(s => {
      if (s.src) {
        const tag = document.createElement("script");
        tag.src = s.src;
        document.body.appendChild(tag);
      } else {
        eval(s.innerText);
      }
    });

    status.innerHTML = "✅ Hoàn tất cài đặt!";
  }
  catch (err) {
    status.innerHTML = "❌ Lỗi khi tải hoặc chạy " + err;
  }
}

