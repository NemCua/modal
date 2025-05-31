export function Modal(html) {
    this.html = html;
    let currentOverlay = null; // Để quản lý overlay hiện tại

    this.openModal = function (callbackFunction) {
        return new Promise((resolve, reject) => {
            if (currentOverlay) {
                console.warn("Một modal khác đang được mở. Hãy đóng nó trước.");
                return reject("Một modal khác đang được mở.");
            }
    
            let overlay = document.createElement("div");
            overlay.className = "overlay";
            document.body.appendChild(overlay);
            currentOverlay = overlay;
    
            // 👉 Chặn cuộn
            document.body.classList.add("modal-open");
    
            let modalDiv = document.createElement("div");
            modalDiv.className = "modal";
            modalDiv.innerHTML = this.html;
            overlay.appendChild(modalDiv);
    
            let xmark = document.createElement("div");
            xmark.className = "xmark";
            xmark.innerHTML = `
                <svg class="svg-modal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M312.973 375.032C322.342 384.401 322.342 399.604 312.973 408.973S288.401 418.342 279.032 408.973L160 289.941L40.968 408.973C31.599 418.342 16.396 418.342 7.027 408.973S-2.342 384.401 7.027 375.032L126.059 256L7.027 136.968C-2.342 127.599 -2.342 112.396 7.027 103.027S31.599 93.658 40.968 103.027L160 222.059L279.032 103.027C288.401 93.658 303.604 93.658 312.973 103.027S322.342 127.599 312.973 136.968L193.941 256L312.973 375.032Z"></path>
                </svg>
            `;
            modalDiv.appendChild(xmark);
    
            if (typeof callbackFunction === "function") {
                callbackFunction();
            }
    
            const closeModalHandler = (reason) => {
                this.closeModal();
                reject(reason);
            };
    
            xmark.onclick = () => {
                console.log("Đóng modal bằng nút X");
                closeModalHandler("Modal đã được đóng bằng nút X.");
            };
    
            overlay.onclick = (event) => {
                if (event.target === overlay) {
                    console.log("Đóng modal bằng cách click vào overlay");
                    closeModalHandler("Modal đã được đóng khi click vào overlay.");
                }
            };
    
            const escapeKeyListener = (event) => {
                if (event.key === "Escape") {
                    console.log("Đóng modal bằng phím Escape");
                    document.removeEventListener('keydown', escapeKeyListener);
                    closeModalHandler("Modal đã được đóng bằng phím Escape.");
                }
            };
            document.addEventListener('keydown', escapeKeyListener);
    
            const form = modalDiv.querySelector("form");
            if (form) {
                form.onsubmit = (e) => {
                    e.preventDefault();
                    this.closeModal();
                    let formData = {};
                    const inputs = form.querySelectorAll("input, textarea, select");
    
                    inputs.forEach(input => {
                        if (!input.name) return;
                        if (input.type === 'checkbox') {
                            formData[input.name] = input.checked;
                        } else {
                            formData[input.name] = input.value;
                        }
                    });
    
                    console.log("Dữ liệu form đã nhập:", formData);
                    resolve(formData);
                };
            }
        });
    }
    
    this.closeModal = function () {
        if (currentOverlay && currentOverlay.parentNode) {
            currentOverlay.parentNode.removeChild(currentOverlay);
            currentOverlay = null;
        }
        // 👉 Khôi phục cuộn
        document.body.classList.remove("modal-open");
    }
    
}



export function modalAlert(text){
    new Modal(
        `
        <strong>${text}</strong>
        `
    ).openModal()
}
export function modalConfirm(message) {
    return new Promise((resolve) => {
        // Tạo overlay
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        // Khi click vào overlay (nền đen) thì đóng
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
                resolve(false);
            }
        });

        // Tạo modal
        const modal = document.createElement("div");
        modal.classList.add("modal");

        // Xmark để đóng
        const xmark = document.createElement("div");
        xmark.classList.add("xmark");
        xmark.innerHTML = `<svg class="svg-modal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M231 256L374.6 112.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L186 210.7 42.4 67.1C29.9 54.6 9.6 54.6-2.9 67.1s-12.5 32.8 0 45.3L140.9 256 2.9 398.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L186 301.3l143.6 143.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L231 256z"/></svg>`;
        xmark.onclick = () => {
            document.body.removeChild(overlay);
            resolve(false);
        };

        // Nội dung thông báo
        const content = document.createElement("p");
        content.classList.add("confirm-text");
        content.innerHTML = message;

        // Nút OK xác nhận
        const btn = document.createElement("button");
        btn.classList.add("confirm-button");
        btn.textContent = "OK";
        btn.onclick = () => {
            document.body.removeChild(overlay);
            resolve(true);
        };

        // Gắn mọi thứ vào DOM
        modal.appendChild(xmark);
        modal.appendChild(content);
        modal.appendChild(btn);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    });
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

