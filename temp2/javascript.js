$(document).ready(function() {
	$.ajax({url: '/putdata', success: function(data){
		$('#quote').html('"'+data.quote+'"');
		$('#name').html('- '+data.name);
		$('#fbaboutme').html(data.fbaboutme);
		$('#aboutme').html(data.aboutme);
		$('#end').html(data.endnote);
		$('#email').html(data.email);
		if(data.education==undefined){
		}
		else{
			for(let i=0; i<data.education.length; i++){
				let x = `<li class="container mt-5 pt-2 pb-2 mb-5 d-flex">
							<div class="container-fluid p-0 dot">
								<i class="fa fa-circle" style="color: #5bc0de" aria-hidden="true"></i>
							</div>
							<div class="container-fluid p-2 listitem">
								<p class="h4 mb-1 tilehead">${data.education[i].head}</p>
								<p class="h5 subhead mb-4">${data.education[i].time}</p>
								<p class="h6 text">${data.education[i].body}</p>
							</div>
						</li>`;
				$('#timelist').append(x);
			}
		}
		let cont = `<li class="container mt-5 pt-2 pb-2 mb-5 d-flex">
						<div class="container-fluid p-0 dot">
							<i class="fa fa-circle" style="color: #5bc0de" aria-hidden="true"></i>
						</div>
						<div class="container-fluid p-2 listitem">
							<p class="h4 mb-0 mt-1 cont">Continued...</p>
						</div>
					</li>`;
		$('#timelist').append(cont);
		let page = { 'page' : '<!DOCTYPE html><html lang="en">' + document.documentElement.innerHTML + '</html>'};
		$.post({
			url : '/generatepage',
			data : page,
			success : function(data){
				$('#down')[0].click();
			}
		});
	}});
});
