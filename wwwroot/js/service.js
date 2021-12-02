var dataTable;
$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Admin/service/GetAll",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "category.name", "width": "20%" },
            { "data": "price", "width": "15%" },
            { "data": "frequency.frequencyCount", "width": "15%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/Admin/service/Upsert/${data}" class="btn btn-success text-white" style='cursor: pointer; width: 100px'>
                            <i class="far fa-edit"></i> Edit
                        </a>
                        &nbsp;
                        <a onclick=Delete("/Admin/service/Delete/${data}") class="btn btn-danger text-white" style='cursor: pointer; width: 100px'>
                            <i class="far fa-trash-alt"></i> Delete
                        </a>
                    </div>`;
                },
                "width": "30%"
            }
        ],
        "language": {
            "emptyTable": "No records found."
        }
    });
}

function Delete(url) {
    swal({
        title: "Are you sure you want to delete?",
        text: "You will not be able to restore the data",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF6B55",
        confurmButtonText: "Yes, delete it.",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "DELETE",
            url: url,
            success: function (data) {
                if (data.success) {
                    toastr.success(data.message);
                    dataTable.ajax.reload();
                }
                else {
                    toastr.error(data.message);
                }
            }
        })
    })
}

function ShowMessage() {
    toastr.success(msg);
}