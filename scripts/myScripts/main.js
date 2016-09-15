$(function () {
    $('.search-text').on('focus', function () {
        $('.search-list').css("display", "block");
    }).on('blur', function(){
        $('.search-list').css("display","none");
    });
    $('.list-group-item').on('mousedown', function(event){
        event.preventDefault();
    }).on('click', function(){
        $('input').val(this.textContent).blur();
    });

    $('.menu-sub>dl>dd>a').on('mousedown', function(event){
        event.preventDefault();
    }).on('click', function(){
        $('input').val(this.textContent);
        $('.menu-sub').addClass('dn');
    });

/*
    $('.sidebar > li').on('click', function(){
        $('input').val(this.textContent).blur();
    })*/
/*

    $('ol').on('mousedown', function(event) {
        event.preventDefault();
    }).on('click', 'li', function() {
        $('input').val(this.textContent).blur();
    });
*/
    $('.menu-box').hover(function(){
        $(this).addClass('current');
        $(this).children('.menu-sub').removeClass('dn');
    }, function(){
        $(this).removeClass('current');
        $(this).children('.menu-sub').addClass('dn');
    });

    var techs = new Array();
    var prods = new Array();
    var designs = new Array();
    var a = 0;
    var b = 0;
    var c = 0;

    function showInfo(job) {
        $('.title').html(job.title);
        $('.area').html(job.area);
        $('.company').html(job.company);
        $('.experience').html(job.experience);
        $('.education').html(job.education);
        $('.salary').html(job.salary);
        $('.update').html(job.update);
        $("#category").html(job.category.type);
    }

    $(function () {
        $.getJSON('json/jobs.json', null, function (data) {
            var recmdJobs = "";
            $(data).each(function (index, job) {
                if (job.category.id == 1) {
                    techs[a++] = job;
                }
                if (job.category.id == 2) {
                    prods[b++] = job;
                }

                if (job.category.id == 3) {
                    designs[c++] = job;
                }

                recmdJobs +=
                    '<li class="list-group-item">' +
                    '  <div class="row">' +
                    '    <div class="col-lg-7">' +
                    '      <h4 class="job-title">' +
                    '        <span>' + job.title + '</span> <span>[' + job.area + ']</span>' +
                    '        <small class="update-date">' + job.update + '</small>' +
                    '      </h4>' +
                    '      <p>' +
                    '        <span class="salary">' + job.salary + '</span>' +
                    '        <span class="experience">&nbsp;&nbsp;&nbsp;' + job.experience + ' / ' + job.education + '</span>' +
                    '      </p>' +
                    '    </div>' +
                    '    <div class="col-lg-5">' +
                    '      <h4 class="job-company">' + job.company + '</h4>' +
                    '      <p>' + job.industry + ' / ' + job.companyCate + '</p>' +
                    '    </div>' +
                    '    <div class="col-lg-12 job-welfare">"' + job.welfare + '"</div>' +
                    '  </div>' +
                    '</li>';
            });

            $("#panel-1 > ul").append(recmdJobs);

            $(techs).each(function (index, job) {
                $("#tech").append($("<div>").addClass("list-group").append($("<a>").addClass("list-group-item").html(job.title).attr("href", "javascript:void(0)").data("b", job).on("click", function () {
                    var b = $(this).data("b");
                    showInfo(b);
                })));
            });
            $(prods).each(function (index, job) {
                $("#prod").append($("<div>").addClass("list-group").append($("<a>").addClass("list-group-item").html(job.title).attr("href", "javascript:void(0)").data("b", job).on("click", function () {
                    var b = $(this).data("b");
                    showInfo(b);
                })));
            });
            $(designs).each(function (index, job) {
                $("#design").append($("<div>").addClass("list-group").append($("<a>").addClass("list-group-item").html(job.title).attr("href", "javascript:void(0)").data("b", job).on("click", function () {
                    var b = $(this).data("b");
                    showInfo(b);
                })));
            });
            $("a[href='#tech']").append($("<span>").addClass("badge pull-right").html(techs.length));
            $("a[href='#prod']").append($("<span>").addClass("badge pull-right").html(prods.length));
            $("a[href='#design']").append($("<span>").addClass("badge pull-right").html(designs.length));
        });
    });
});
