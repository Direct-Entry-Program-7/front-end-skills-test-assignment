import $ from 'jquery';

$('#txt-id').trigger('focus');

$('#btn-save').on('click', ()=> {

    const id = $('#txt-id').val() as string;
    const name = $('#txt-name').val() as string;
    const address = $('#txt-address').val() as string;
    let valid = true;

    $('#txt-id, #txt-name, #txt-address').parent().removeClass('invalid');

    // if (address.trim().length < 3){
    //     $('#txt-address').parent().addClass('invalid');
    //     $('#txt-address').trigger('select');
    //     valid = false;
    // }
    //
    // if (!/[A-Za-z .]{3,}/.test(name.trim())){
    //     $('#txt-name').parent().addClass('invalid');
    //     $('#txt-name').trigger('select');
    //     valid = false;
    // }
    //
    // if (!/^C\d{3}$/.test(id.trim())){
    //     $('#txt-id').parent().addClass('invalid');
    //     $('#txt-id').trigger('select');
    //     valid = false;
    // }
    //
    // if (!valid) return;

    const rowHtml = `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${address}</td>
            <td><div class="trash"></div></td>
        </tr>
    `;

    $('#tbl-customers tbody').append(rowHtml);
    showOrHideTfoot();

    $(".trash").off('click');
    $(".trash").on('click', (eventData)=> {
       if (confirm('Are you sure to delete?')){
           $(eventData.target).parents("tr").remove();
           showOrHideTfoot();
       }
    });

});

function showOrHideTfoot(){
    ($('#tbl-customers tbody tr').length > 0)? $('#tbl-customers tfoot').hide(): $('#tbl-customers tfoot').show();
}
