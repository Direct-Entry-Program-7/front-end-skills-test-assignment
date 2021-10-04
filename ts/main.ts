import $ from 'jquery';

const pageSize = calculatePageSize();
console.log(pageSize);

$('#txt-id').trigger('focus');

/* Add or update a row */
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

    // if (address.length < 3) {
    //     txtAddress.parent().addClass('invalid').trigger('select');
    //     valid = false;
    // }
    //
    // if (!/[A-Za-z .]{3,}/.test(name)) {
    //     txtName.parent().addClass('invalid').trigger('select');
    //     valid = false;
    // }
    //
    // if (!/^C\d{3}$/.test(id.trim())) {
    //     txtId.parent().addClass('invalid').trigger('select');
    //     valid = false;
    // }
    //
    // if (!valid) return;

    /* Let's check whether we need to update or save */
    if (txtId.attr('disabled')) {
        const selectedRow = $("#tbl-customers tbody tr.selected");

        selectedRow.find("td:nth-child(2)").text(name);
        selectedRow.find("td:nth-child(3)").text(address);
        return; // It is an update, no need to continue
    }

    // if(existCustomer(id)){
    //     alert("Customer already exists");
    //     txtId.trigger('select');
    //     return;
    // }

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
    $("#btn-clear").trigger('click');

});

const tbody = $("#tbl-customers tbody");

/* Table row selection event listener */
tbody.on('click', 'tr',  function () {

    const id = $(this).find("td:first-child").text();
    const name = $(this).find("td:nth-child(2)").text();
    const address = $(this).find("td:nth-child(3)").text();

    $('#txt-id').val(id).attr('disabled', "true");
    $('#txt-name').val(name);
    $('#txt-address').val(address);

    $("#tbl-customers tbody tr").removeClass('selected');
    $(this).addClass('selected');
});

/* Table row deletion event listener */
tbody.on('click',  '.trash', (eventData) => {
    if (confirm('Are you sure to delete?')) {
        $(eventData.target).parents("tr").fadeOut(500, function () {
            $(this).remove();
            showOrHideTfoot();
            $('#btn-clear').trigger('click');
        });
    }
});

/* Reset button event listener */
$('#btn-clear').on('click', ()=>{
   $("#tbl-customers tbody tr.selected").removeClass('selected');
   $("#txt-id").removeAttr('disabled').trigger('focus');
});

/* Utility functions */
function existCustomer(id: string): boolean{
    // let result: boolean = false;
    //
    // $("#tbl-customers tbody tr td:first-child").each((index, elm) => {
    //     if ($(elm).text() === id){
    //         result = true;
    //         return false;
    //     }
    // });
    // return result;

    const ids = $("#tbl-customers tbody tr td:first-child");

    for (let i = 0; i < ids.length; i++) {
        if ($(ids[i]).text() === id){
            return true;
        }
    }

    return false;
}

function showOrHideTfoot() {
    const tfoot = $('#tbl-customers tfoot');
    ($('#tbl-customers tbody tr').length > 0) ? tfoot.hide() : tfoot.show();
}

function calculatePageSize(): number{
    const tFoot = $("#tbl-customers tfoot");
    tFoot.hide();

    const rowHtml = `
        <tr>
            <td>C001</td>
            <td>Manoj</td>
            <td>Dehiwala</td>
            <td><div class="trash"></div></td>
        </tr>
    `;

    const tbl = $("#tbl-customers");

    while (true) {
        tbl.find('tbody').append(rowHtml);
        const bottom = tbl.outerHeight(true)! + tbl.offset()!.top;
        const top = $(window).height()! - ($('footer').height()! + 47);

        if (bottom >= top){
            const pageSize = tbl.find("tbody tr").length - 1;

            tbl.find("tbody tr").remove();
            tFoot.show();
            return pageSize;
        }
    }

}
