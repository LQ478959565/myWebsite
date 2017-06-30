$(function(){
    $(window).scroll(function() {
        var num1=$(window).scrollTop();
        var num2=$(window).height();
        if(num1>num2){
            $('.backTop').show();
        }else{
            $('.backTop').hide();
        }
        if(num1>=$('.skills').offset().top){
            $('.nav li a').removeClass('cur');
            $('.nav li').eq(4).find('a').addClass('cur');
        }else if(num1>=$('.projects').offset().top){
            $('.nav li a').removeClass('cur');
            $('.nav li').eq(3).find('a').addClass('cur');
        }else if(num1>=$('.work').offset().top){
            $('.nav li a').removeClass('cur');
            $('.nav li').eq(2).find('a').addClass('cur');
        }else if(num1>=$('.about').offset().top){
            $('.nav li a').removeClass('cur');
            $('.nav li').eq(1).find('a').addClass('cur');
        }else if(num1>=$('.home').offset().top){
            $('.nav li a').removeClass('cur');
            $('.nav li').eq(0).find('a').addClass('cur');
        }
    });
    //返回顶部
    $('.backTop').on('click',function(){
        $('html,body').animate({scrollTop:0},1000);
    });
    //头部导航栏单击事件 -- 设置网页滚动坐标值为自己的纵坐标
    $('.nav li').on('click',function(){
        $('.nav li a').removeClass('cur');
        $(this).find('a').addClass('cur');
        if($(this).index() == 0){
            return false
        }else{
            $('html,body').animate({scrollTop:$('.scroll').eq($(this).index()).offset().top},1000);
        }
    });
    var data = [{
            'type' : 'pc',
            'datas' : [{
                'imgSrc':'images/self.jpg',
                'title':'自助仪',
                'context':'帮助学生缓解压力，放松心情'
            },{
                'imgSrc':'images/shengya.jpg',
                'title':'生涯规划',
                'context':'帮助学生规划自己的生涯'
            },{
                'imgSrc':'images/nuanxinji.jpg',
                'title':'暖心机',
                'context':'一款测试学生心理压力的售货机'
            },{
                'imgSrc':'images/game.jpg',
                'title':'认知小游戏',
                'context':'通过游戏测试学生心理压力状况'
            },{
            'imgSrc':'images/putaojiu.jpg',
            'title':'波尔多葡萄酒Pc',
            'context':'介绍法国波尔多葡萄酒'
        },{
            'imgSrc':'images/the-eye.jpg',
            'title':'the eye 官网Pc',
            'context':'the eye公司官网'
        }]
    },{
        'type' : 'mobile',
        'datas' : [{
            'imgSrc':'images/xiaoyuanjia.jpg',
            'title':'小冤家',
            'context':'学生倾诉心里烦恼和压力的平台'
        },{
            'imgSrc':'images/mobile1.jpg',
            'title':'波尔多葡萄酒Mobile',
            'context':'介绍法国波尔多葡萄酒'
        },{
            'imgSrc':'images/the-eye-m.jpg',
            'title':'the eye 官网Mobile',
            'context':'the eye公司官网'
        }]
    }];
    var imgArr =[];
    var projectsList;
    $('.projects-item').on('click',function(){
        var getName = $(this).attr("name");
        dataUl(getName);
        $(this).addClass('projects-active').siblings().removeClass('projects-active');
    });
    function subDataUl(n) {
        $.each(data[n]["datas"], function (i) {
            projectsList += '<li class="col-md-4">' +
                                '<a class="projects-link" href="javascript:;">' +
                                    '<img src=' + data[n]["datas"][i]["imgSrc"] + '>' +
                                    '<div class="info-box">' +
                                        '<div class="center">' +
                                            '<h3 class="til">' + data[n]["datas"][i]["title"] + '</h3>' +
                                            '<p>' + data[n]["datas"][i]["context"] + '</p>' +
                                        '</div>' +
                                    '</div>' +
                                '</a>' +
                             '</li>';
            imgArr.push(data[n]["datas"][i]["imgSrc"]);
        });
    };
    function dataUl(num){
        projectsList = "";
        imgArr =[];
        if( num ==2  || num  == "" || num == undefined){
            $.each(data,function(k){
                subDataUl(k);
            });
        }else{
            subDataUl(num);
        }
        $('.projects-list').html(projectsList);
        projectsEvent();
    };
    dataUl();
    //myProject中每个li的hover和click事件
    function projectsEvent(){
        $('.projects-list>li').hover(function() {
            $(this).find('.info-box').stop().fadeIn();
            var $center = $(this).find('.center');
            $center.addClass("animationCss");
            /* $center.css({"top":"65%","opacity":"0"});
             $center.animate({"top":"50%","opacity":"1"},300);*/
        },function(){
            $(this).find('.info-box').stop().fadeOut();
            var $center = $(this).find('.center');
            $center.removeClass("animationCss");
        });
        $('.projects-list>li').on('click',function(){
            setBannerDatas();
            //遮罩层
            var bodyH=$('body').height();
            $('.mask').height(bodyH);
            $('.projects-img').show();
            $('html,body').css('overflow','hidden');
            bannerController($(this).index());
        });
        $('.projects-close').on('click',function(){
            $('.projects-img').hide();
            $('html,body').css('overflow','auto');
            clearInterval(timer);
            $("#bannerWrap").html('');
        });
    }
    //-------------
    function setBannerDatas(){
        var bannerImg='',bannerUl='',bannerOl='';
        bannerImg += ' <div class="banner-img">';
        bannerUl += '<ul>';
        bannerOl += '<ol>';
        $.each(imgArr, function (i) {
            bannerUl += '<li><img src="'+imgArr[i]+'"/></li>';
            bannerOl += '<li></li>';
        });
        bannerUl += '</ul>';
        bannerOl += '</ol>';

        console.log(bannerUl);
        bannerImg += bannerUl;
        bannerImg += bannerOl;
        bannerImg += '</div>';
        bannerImg += '<span class="left glyphicon glyphicon-chevron-left"></span>'+
                     '<span class="right glyphicon glyphicon-chevron-right"></span>';

        $("#bannerWrap").html(bannerImg);
    }
    //轮播
    var timer=null;
    function bannerController(index){
        var $num=index;//图片的索引号
        var $num1=index;//控制圆点
        $('.banner-img ul').css({marginLeft:-$num*$('.banner-img ul li').width()});
        $('.banner-wrap ol li').eq($num1).addClass('current').siblings().removeClass();
        var $listL = $('.banner-img ul li').length;
        //克隆节点 -- 第一张图
        $('.banner-wrap ul li:first').clone().appendTo('.banner-img ul');

        //left按钮功能
        $('.banner-wrap .left').click(function() {
            //ul往左走，改margin-left取值
            $num--;
            if($num<0){
                //第一件事：让ul的left取值瞬间归0
                $('.banner-img ul').css('marginLeft',-($('.banner-img ul li').length-1)*$('.banner-img ul li').width());
                $num=$listL-1;
            }
            $('.banner-img ul').stop().animate({marginLeft:-$num*$('.banner-img ul li').width()},1000);
            //把ul里面的li的索引号对应我们ol里面li，实现自己添加类，兄弟删除类
            $num1--;
            if($num1<0){$num1=$listL-1}
            $('.banner-wrap ol li').eq($num1).addClass('current').siblings().removeClass();
        });
        //right按钮功能
        $('.banner-wrap .right').click(function() {
            autoplay();
        });
        //圆点功能，点击时候ul也能走
        $('.banner-wrap ol li').click(function() {
            //获取事件源的索引号
            $num=$(this).index();
            $num1=$(this).index();
            $('.banner-img ul').stop().animate({marginLeft:-$num*$('.banner-img ul li').width()},1000);
            $('.banner-wrap ol li').eq($num1).addClass('current').siblings().removeClass();
        });
        //自动播放
        function autoplay(){
            $num++;
            if($num>$listL){
                //第一件事：让ul的left取值瞬间归0
                $('.banner-img ul').css('marginLeft',0);
                $num=1;
            }
            $('.banner-img ul').stop().animate({marginLeft:-$num*$('.banner-img ul li').width()},1000);
            //把ul里面的li的索引号对应我们ol里面li，实现自己添加类，兄弟删除类
            $num1++;
            if($num1>$listL-1){$num1=0}
            $('.banner-wrap ol li').eq($num1).addClass('current').siblings().removeClass();
        }
        timer=setInterval(autoplay,3000);
        //鼠标移上就停止播放，离开再播放
        $('.banner-img ul,.banner-wrap ol,.banner-wrap .left,.banner-wrap .right').hover(function() {
            clearInterval(timer);
            timer=null;
        }, function() {
            clearInterval(timer);
            timer=setInterval(autoplay,2000);
        });
    }
});
