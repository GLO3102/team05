define(['jquery'], function($) {
    var ERROR_MODAL_SELECTOR = "#error-modal";
    var ERROR_MODAL_CONTENT_SELECTOR = "#error-modal-content";
    function showError(errorMessage) {
        $(ERROR_MODAL_CONTENT_SELECTOR).text(errorMessage);
        $(ERROR_MODAL_SELECTOR).modal('show');
    }


    return {
        showError: showError
    };
});
