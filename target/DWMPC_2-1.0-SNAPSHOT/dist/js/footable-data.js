/*FooTable Init*/
$(function () {
	"use strict";

	/*Init FooTable*/
	$('#footable_1,#footable_3').footable();

	/*Editing FooTable*/

	var $modal = $('#editor-modal'),
		$editor = $('#editor'),
		$editorTitle = $('#editor-title'),
		ft = FooTable.init('#footable_2', {
			editing: {
				enabled: true,
				addRow: function(){
					$modal.removeData('row');
					$editor[0].reset();
					$editorTitle.text('Add a new row');
					$modal.modal('show');
				},
				editRow: function(row){
					var values = row.val();
					$editor.find('#id').val(values.id);
					$editor.find('#firstName').val(values.firstName);
					$editor.find('#lastName').val(values.lastName);
					$editor.find('#jobTitle').val(values.jobTitle);
					$editor.find('#Qualification').val(values.Qualification);
					$editor.find('#Training').val(values.Training);
					$editor.find('#Contact').val(values.Training);
					$editor.find('#action').val("EditingEmployee");

					$modal.data('row', row);
					$editorTitle.text('Edit row #' + values.id);
					$modal.modal('show');
				},
				deleteRow: function(row){
					if (confirm('Are you sure you want to delete the row?')){
						row.delete();
					}
				}
			}
		}),
		uid = 10;

	$editor.on('submit', function(e){
		if (this.checkValidity && !this.checkValidity()) return;
		e.preventDefault();
		var row = $modal.data('row'),
			values = {
				id: $editor.find('#id').val(),
				firstName: $editor.find('#firstName').val(),
				lastName: $editor.find('#lastName').val(),
				jobTitle: $editor.find('#jobTitle').val(),
				Qualification: $editor.find('#Qualification').val(),
				Training: $editor.find('#Training').val(),
				Content: $editor.find('#Contact').val(),
				Action: $editor.find('#Action').val()
			};

		if (row instanceof FooTable.Row){
			row.val(values);
		} else {
			values.id = uid++;
			ft.rows.add(values);
		}
		$modal.modal('hide');
	});
});
		