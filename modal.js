export function Modal(html) {
    this.html = html;
    let currentOverlay = null; // Để quản lý overlay hiện tại

    this.openModal = function() {
        return new Promise((resolve, reject) => {
            if (currentOverlay) {
                // Nếu đã có modal mở, bạn có thể chọn không làm gì,
                // đóng modal cũ, hoặc reject Promise này.
                // Ở đây, chúng ta sẽ reject để tránh mở nhiều modal cùng lúc.
                console.warn("Một modal khác đang được mở. Hãy đóng nó trước.");
                return reject("Một modal khác đang được mở.");
            }

            let overlay = document.createElement("div");
            overlay.className = "overlay";
            document.querySelector("body").appendChild(overlay);
            currentOverlay = overlay; // Lưu overlay hiện tại

            let modalDiv = document.createElement("div"); // Đổi tên biến để tránh nhầm lẫn với constructor Modal
            modalDiv.className = "modal";
            modalDiv.innerHTML = this.html; // Gán HTML được truyền vào
            overlay.appendChild(modalDiv);
            let xmark = document.createElement("div")
            xmark.innerHTML=`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!-- Font Awesome Pro 6.0.0-alpha2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M312.973 375.032C322.342 384.401 322.342 399.604 312.973 408.973S288.401 418.342 279.032 408.973L160 289.941L40.968 408.973C31.599 418.342 16.396 418.342 7.027 408.973S-2.342 384.401 7.027 375.032L126.059 256L7.027 136.968C-2.342 127.599 -2.342 112.396 7.027 103.027S31.599 93.658 40.968 103.027L160 222.059L279.032 103.027C288.401 93.658 303.604 93.658 312.973 103.027S322.342 127.599 312.973 136.968L193.941 256L312.973 375.032Z"></path></svg>
            `
            modalDiv.appendChild(xmark)
            xmark.className="xmark"
            const closeModalHandler = (reason) => {
                this.closeModal();
                reject(reason);
            };
            xmark.onclick = () => {
                console.log("Đóng modal bằng nút X");
                closeModalHandler("Modal đã được đóng bằng nút X.");
            };
            overlay.onclick = (event) => {
                if (event.target === overlay) { // Chỉ đóng khi click trực tiếp vào overlay
                    console.log("Đóng modal bằng cách click vào overlay");
                    closeModalHandler("Modal đã được đóng khi click vào overlay.");
                }
            };
            const escapeKeyListener = (event) => {
                if (event.key === "Escape") {
                    console.log("Đóng modal bằng phím Escape");
                    // Loại bỏ event listener này trước khi đóng để tránh bị gọi lại nếu modal được mở lại nhanh chóng
                    document.removeEventListener('keydown', escapeKeyListener);
                    closeModalHandler("Modal đã được đóng bằng phím Escape.");
                }
            };
            const form = modalDiv.querySelector("form");
            if (form) {
                form.onsubmit = (e) => {
                    e.preventDefault(); // Chặn reload trang

                    const formData = {}; // Tạo một đối tượng để lưu trữ dữ liệu form
                    
                    // Lấy tất cả các input elements bên trong form
                    const inputs = form.querySelectorAll("input[type='text'], input[type='email'], input[type='number'], textarea, select"); // Mở rộng selector nếu cần

                    inputs.forEach(input => {
                        // Sử dụng thuộc tính 'name' của input làm key cho đối tượng formData.
                        // Nếu không có 'name', bạn có thể dùng 'className', 'id', hoặc một thuộc tính tùy chỉnh.
                        // Đảm bảo các input có thuộc tính 'name' duy nhất và có ý nghĩa.
                        if (input.name) {
                            formData[input.name] = input.value;
                        } else if (input.className) {
                            // Fallback sử dụng className nếu không có name (chỉ lấy class đầu tiên nếu có nhiều)
                            // Cẩn thận: class có thể không duy nhất hoặc chứa nhiều giá trị
                            const key = input.className.split(' ')[0]; // Lấy class đầu tiên
                            if (key) {
                                formData[key] = input.value;
                            }
                        } else {
                            console.warn("Input không có thuộc tính 'name' hoặc 'className' để làm key:", input);
                        }
                    });

                    console.log("Dữ liệu form đã nhập:", formData);
                    // this.closeModal(); // Đóng modal sau khi xử lý
                    resolve(formData); // Resolve Promise với đối tượng chứa dữ liệu form
                };
            }

            // (Tùy chọn) Xử lý đóng modal khi click ra ngoài
            overlay.onclick = (event) => {
                if (event.target === overlay) {
                    this.closeModal();
                    reject("Modal đã được đóng bởi người dùng (click ra ngoài)."); // Reject nếu modal bị đóng mà không submit
                }
            };

        });
    }

    this.closeModal = function() {
        if (currentOverlay && currentOverlay.parentNode) {
            currentOverlay.parentNode.removeChild(currentOverlay);
            currentOverlay = null; // Reset lại để có thể mở modal khác
        }
    }
}

// Định nghĩa HTML cho modal1 với thuộc tính 'name' cho các input

// Chú ý: "userName" có thể nên là "productName" nếu đây là form sản phẩm.
// Mình đã sửa `name="userName"` thành `name="productName"` trong HTML.

// --- Cách sử dụng ---

// Giả sử bạn có các nút để mở các modal
// <button id="openModal1">Mở Modal 1</button>
// <button id="openModal2">Mở Modal 2</button>

// document.getElementById("openModal1")?.addEventListener("click", async () => {
//     try {
//         console.log("Đang mở Modal 1...");
//         const dataFromModal1 = await modal1.openModal();
//         console.log("Dữ liệu từ Modal 1:", dataFromModal1);
//         // Xử lý dataFromModal1 ở đây (ví dụ: gửi lên server, hiển thị ra trang, ...)
//         // dataFromModal1 sẽ là một object kiểu: { name: "...", age: "...", email: "..." }
//         alert(`Modal 1: Tên - ${dataFromModal1.name}, Tuổi - ${dataFromModal1.age}, Email - ${dataFromModal1.email}`);
//     } catch (error) {
//         console.error("Lỗi hoặc Modal 1 bị đóng:", error);
//     }
// });

// document.getElementById("openModal2")?.addEventListener("click", () => {
//     console.log("Đang mở Modal 2...");
//     modal2.openModal()
//         .then(dataFromModal2 => {
//             console.log("Dữ liệu từ Modal 2:", dataFromModal2);
//             // dataFromModal2 sẽ là một object kiểu: { productId: "...", productName: "...", stock: "..." }
//             alert(`Modal 2: ID - ${dataFromModal2.productId}, Tên SP - ${dataFromModal2.productName}, Tồn kho - ${dataFromModal2.stock}`);
//         })
//         .catch(error => {
//             console.error("Lỗi hoặc Modal 2 bị đóng:", error);
//         });
// });

// Để test nhanh, bạn có thể gọi trực tiếp:

