import $ from 'jquery';

$('#txt-id').trigger('focus');

$('#btn-save').on('click', ()=> {

    let id = $('#txt-id').val() as string;
    let name = $('#txt-name').val() as string;
    let address = $('#txt-address').val() as string;

    $('#txt-id, #txt-name, #txt-address').parent().removeClass('invalid');

    if (address.trim().length < 3){
        $('#txt-address').parent().addClass('invalid');
        $('#txt-address').trigger('select');
    }

    if (!/[A-Za-z .]+/.test(name.trim())){
        $('#txt-name').parent().addClass('invalid');
        $('#txt-name').trigger('select');
    }

    if (!/^C\d{3}$/.test(id.trim())){
        $('#txt-id').parent().addClass('invalid');
        $('#txt-id').trigger('select');
    }

});
