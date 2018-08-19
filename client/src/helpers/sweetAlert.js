import swal from 'sweetalert';

const sweetAlert = {
    core(icon, title, text, buttons = null) {
        return swal({
            icon,
            title,
            text,
            buttons
        });
    },

    error(title, text = null) {
        return this.core('error', title, text);
    },

    success(title, text = null) {
        return this.core('success', title, text);
    },

    confirm(title, text = null) {
        return this.core('warning', title, text, this.buttons)
    },

    buttons: {
        cancel: {
            text: "Cancel",
            value: false,
            visible: true,
            closeModal: true,
        },
        confirm: {
            text: "Confirm",
            value: true,
            visible: true,
            closeModal: false
        }

    }
};

export default sweetAlert;
