let cnt=0;
$(document).ready(function(){
	let btn = $('#btn');
	let DATA = {};
	let timelinehtml = `<li class="container-fluid px-0 mt-3 mb-3 d-flex" id="li${cnt}" style="display:none! important;">
							<div class="container-fluid px-0 mx-2" style="width: 10%; margin: auto;">
								<div class="container-fluid mb-1 ubtn" id="ubtn${cnt}"></div>
								<div class="container-fluid mt-1 dbtn" id="dbtn${cnt}"></div>
							</div>
							<div class="container-fluid px-0" style="width: 90%;">
								<input type="text" class="form-control" id="tlhead${cnt}" style="font-weight: bold;" placeholder="Heading">
								<input type="text" class="form-control" id="tltime${cnt}" placeholder="Duration or subheading">
		   	 					<textarea class="form-control" id="tlabout${cnt}" rows="3" placeholder="Something about it"></textarea>
		   	 				</div>
						</li>`;
	$('#timeline').append(timelinehtml);
	cnt++;
	btn.click(function(){
		let education = [];
		for(let i=0; i<cnt; i++){
			let obj = {};
			if($('#tlhead'+i).val()!='' || $('#tltime'+i).val()!='' || $('#tlabout'+i).val()!=''){
				obj = {
					'head' : $('#tlhead'+i).val(),
					'time' : $('#tltime'+i).val(),
					'body' : $('#tlabout'+i).val()
				};
				education.push(obj);
			}
		}
		let data = {
			'name' : $('#quotename').val(),
			'quote' : $('#toptext').val(),
			'fbaboutme' : $('#fbaboutme').val(),
			'aboutme' : $('#aboutme').val(),
			'education' : education,
			'endnote' : $('#endnote').val(),
			'email' : $('#email').val()
		};

		$.post({
			url: '/savedata',
			data,
			success: function(){
				window.open('/temp2');
			}
		});
	});
});

function setbuttons() {
	for(let i=0; i<cnt; i++){
		if(i==0){
			$('#ubtn0').unbind("click").bind("click",function(){
			});
			$('#dbtn0').unbind("click").bind("click",function(){
				if(i+1<cnt) exchange(i,(i+1));
			});
		}
		else if(i==(cnt-1)){
			$('#ubtn'+i).unbind("click").bind("click",function(){
				if(i-1>=0) exchange(i,(i-1));
			});
			$('#dbtn'+i).unbind("click").bind("click",function(){	
			});
		}
		else{
			$('#ubtn'+i).unbind("click").bind("click",function(){
				if(i-1>=0) exchange(i,(i-1));
			});
			$('#dbtn'+i).unbind("click").bind("click",function(){
				if(i+1<cnt) exchange(i,(i+1));
			});
		}
	}
	$('#dbtn'+(cnt-1)).unbind("click").bind("click",function(){	
	});
}

function exchange(x,y){
	let h1,t1,a1,h2,t2,a2;
	h1=$('#tlhead'+x).val();
	t1=$('#tltime'+x).val();
	a1=$('#tlabout'+x).val();
	h2=$('#tlhead'+y).val();
	t2=$('#tltime'+y).val();
	a2=$('#tlabout'+y).val();

	$('#tlhead'+x).val(h2);
	$('#tltime'+x).val(t2);
	$('#tlabout'+x).val(a2);
	$('#tlhead'+y).val(h1);
	$('#tltime'+y).val(t1);
	$('#tlabout'+y).val(a1);
}

function addtimeline() {
	$('#li'+(cnt-1)).slideDown(500);
	let timelinehtml = `<li class="container-fluid px-0 mt-3 mb-3 d-flex" id="li${cnt}" style="display:none! important">
							<div class="container-fluid px-0 mx-2" style="width: 10%; margin: auto;">
								<div class="container-fluid mb-1 ubtn" id="ubtn${cnt}"></div>
								<div class="container-fluid mt-1 dbtn" id="dbtn${cnt}"></div>
							</div>
							<div class="container-fluid px-0" style="width: 90%;">
								<input type="text" class="form-control" id="tlhead${cnt}" style="font-weight: bold;" placeholder="Heading">
								<input type="text" class="form-control" id="tltime${cnt}" placeholder="Duration or subheading">
		   	 					<textarea class="form-control" id="tlabout${cnt}" rows="3" placeholder="Something about it"></textarea>
		   	 				</div>
						</li>`;
	$('#timeline').append(timelinehtml);
	setbuttons();
	cnt++;
}