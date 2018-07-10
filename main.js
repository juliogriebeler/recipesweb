	$('.openAddModal').on('click',function(){
		openModal("add.html");
	});
	$('.openEditModal').on('click',function(){
		openModal("edit.html");
	});
	
$.ready(function(){
});


function openModal(content){
	$('.modal-body').load(content,function(){
		$('#recipesModal').modal({show:true});
	});
}