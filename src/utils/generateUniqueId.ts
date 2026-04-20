const generateUniqueId = () => {
  // Epoch tùy chỉnh (ví dụ: lấy mốc từ 1/1/2024)
  const customEpoch = 1704067200000;
  const now = Date.now();

  // Lấy số miliseconds chênh lệch (khoảng 9 chữ số)
  const diff = now - customEpoch;

  // Lấy 9 số cuối của hiệu số này + 1 số ngẫu nhiên cuối cùng để tránh trùng nếu tạo cùng 1ms
  const id = String(diff).slice(-9) + Math.floor(Math.random() * 10);

  return id.padStart(10, "0");
};

export default generateUniqueId;
