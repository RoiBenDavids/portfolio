'use strict'

$(document).ready(init);
$('.contact-submit-btn').click(onContactSubmit);

function init() {
    renderProjs();
}



function renderProjs() {
    var projs = getProjsNAT();
    var strHTML = '';
    for (var i = 0; i < projs.length; i++) {
        strHTML += `
        <div class="col-md-4 col-sm-6 portfolio-item" >
<a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
  <div class="portfolio-hover" onclick="renderModal(${i})">
    <div class="portfolio-hover-content">
      <i class="fa fa-plus fa-3x"></i>
    </div>
  </div>
  <img class="img-fluid" src="img/portfolio/${projs[i].name}.jpg" alt="">
  </a>
  <div class="portfolio-caption">
  <h4>${projs[i].name}</h4>
  <p class="text-muted">${projs[i].title}</p>
  </div>
</div>
    `
        $('.portfolio-area').html(strHTML)
    }
}


function renderModal(projIdx) {
    console.log(projIdx);
    var proj = getProjByIdx(projIdx)
    var publishedAt = new Date(proj.publishedAt * 1000)
    console.log(publishedAt);
    var strHTML =
        `
   <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${proj.name}</h2>
                <p class="item-intro text-muted">${proj.title}</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.name}.jpg" alt="">
                <p>${proj.desc}</p>
                <ul class="list-inline">
                  <li>${publishedAt}</li>
                  <a class="btn btn-primary mt-4" href="proj/${proj.name}/index.html" target="_blank">To Project</a>
                </ul>
                <button class="btn btn-primary " data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   `

    $('#portfolioModal1').html(strHTML);

}

function onContactSubmit() {
    console.log($('#nameInput').val(), $('#emailInput').val(), $('#textInput').val());
    // window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=bendaroi@gmail.com&su=PROTFOLIO&body=${'from : ',$('#nameInput').val(),$('#textInput').val()}&bcc=${$('#emailInput').val()}`)
    $('#nameInput').val('')
    $('#emailInput').val('')
    $('#textInput').val('')
}