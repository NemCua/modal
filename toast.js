export function ToastMessage(text, toast) {
    this.text = text;
    this.toast = toast
    this.openToast = function () {
        // Tạo toast element
        let html;
        if (this.toast === "problem") {
            html = '<path d="M256 344C242.746 344 232 354.746 232 368S242.746 392 256 392S280 381.254 280 368S269.254 344 256 344ZM256 304C264.844 304 272 296.844 272 288V128C272 119.156 264.844 112 256 112S240 119.156 240 128V288C240 296.844 247.156 304 256 304ZM256 16C123.451 16 16 123.451 16 256S123.451 496 256 496S496 388.549 496 256S388.549 16 256 16ZM256 464C141.309 464 48 370.691 48 256S141.309 48 256 48S464 141.309 464 256S370.691 464 256 464Z"></path>'
        } else if (this.toast === "success") {
            html = '<path d="M256 16C123.451 16 16 123.451 16 256S123.451 496 256 496S496 388.549 496 256S388.549 16 256 16ZM256 448C150.131 448 64 361.869 64 256S150.131 64 256 64S448 150.131 448 256S361.869 448 256 448ZM335.031 175.031L224 286.062L176.969 239.031C167.594 229.656 152.406 229.656 143.031 239.031S133.656 263.594 143.031 272.969L207.031 336.969C211.719 341.656 217.844 344 224 344S236.281 341.656 240.969 336.969L368.969 208.969C378.344 199.594 378.344 184.406 368.969 175.031S344.406 165.656 335.031 175.031Z"></path></svg>'
        } else if (this.toast === 'fail') {
            html = '<path d="M256 16C123.451 16 16 123.451 16 256S123.451 496 256 496S496 388.549 496 256S388.549 16 256 16ZM256 448C150.131 448 64 361.869 64 256S150.131 64 256 64S448 150.131 448 256S361.869 448 256 448ZM336.969 175.031C327.594 165.656 312.406 165.656 303.031 175.031L256 222.062L208.969 175.031C199.594 165.656 184.406 165.656 175.031 175.031S165.656 199.594 175.031 208.969L222.062 255.998L175.031 303.029C165.656 312.404 165.656 327.592 175.031 336.967C184.404 346.34 199.588 346.348 208.969 336.967L256 289.936L303.031 336.967C312.404 346.34 327.588 346.348 336.969 336.967C346.344 327.592 346.344 312.404 336.969 303.029L289.938 255.998L336.969 208.969C346.344 199.594 346.344 184.406 336.969 175.031Z"></path></svg>'
        }
        const toast = document.createElement('div');
        toast.className = `toast-message toast-${this.toast}-container`;

        toast.innerHTML = `
<svg class="toast-${this.toast}-icon svg-toast" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${html}
</svg>
<p class="toast-problem-content">${this.text}</p>
`;

        document.body.appendChild(toast);

        // Kích hoạt animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Tự động đóng sau 2s
        setTimeout(() => {
            this.closeToast(toast);
        }, 2100);
    };

    this.closeToast = function (toast) {
        toast.classList.remove('show');
        // Đợi hiệu ứng biến mất rồi xoá phần tử
        setTimeout(() => {
            toast.remove();
        }, 500);
    };
}

// Ví dụ sử dụng
