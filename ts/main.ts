import $ from 'jquery';

$('#txt-id').trigger('focus');

$('#btn-save').on('click', (eventData) => {

    eventData.preventDefault();

    const txtId = $('#txt-id');
    const txtName = $('#txt-name');
    const txtAddress = $('#txt-address');

    const id = (txtId.val() as string).trim();
    const name = (txtName.val() as string).trim();
    const address = (txtAddress.val() as string).trim();
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

    /* Let's check whether we need to update or save */
    if (txtId.attr('disabled')){
        const selectedRow = $("#tbl-customers tbody tr.selected");

        selectedRow.find("td:nth-child(2)").text(name);
        selectedRow.find("td:nth-child(3)").text(address);
        return; // It is an update, no need to continue
    }

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

    $("#tbl-customers tbody tr").off('click').on('click', function() {
        const id = $(this).find("td:first-child").text();
        const name = $(this).find("td:nth-child(2)").text();
        const address = $(this).find("td:nth-child(3)").text();

        txtId.val(id);
        txtId.attr('disabled', "true");
        txtName.val(name);
        txtAddress.val(address);

        $("#tbl-customers tbody tr").removeClass('selected');
        $(this).addClass('selected');
    });

    $(".trash").off('click').on('click', (eventData) => {
        if (confirm('Are you sure to delete?')) {
            $(eventData.target).parents("tr").fadeOut(500, function () {
                $(this).remove();
                showOrHideTfoot();
            });
        }
    });

});

function showOrHideTfoot() {
    const tfoot = $('#tbl-customers tfoot');
    ($('#tbl-customers tbody tr').length > 0) ? tfoot.hide() : tfoot.show();
}
