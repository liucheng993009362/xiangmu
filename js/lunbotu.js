$(function(){
    var $len=$('.slide ul li').size();
    var index=0;
    var $pic=$('.slide ul li');
    myShow();
    function myShow(){
        $pic.eq(index).find('.img1').animate({left:0},1000,function(){
            $pic.eq(index).find('.img2').css({display:'block'});
            $pic.eq(index).find('.img2').animate({left:0},1000);
        })
    }
    setInterval(function(){
        index++;
        if(index>=$len){
            index=0;
        }
        $pic.eq(index).fadeIn(300).siblings().fadeOut(300);
        $('.nav ul li').eq(index).addClass('select').siblings().removeClass('select');
        myShow();
        $pic.eq(index).siblings().find('.img1').css({left:'-720px'});
        $pic.eq(index).siblings().find('.img2').css({left:'-20px','display':'none'})
    },3000)
})
$(function(){
    //需求分析:当页面滚动的时候,如果滚动距离超过top的高度,Q-nav就固定在顶部
    //获取相关元素
    var topB = $id('topaBar');//top
    var logo = $id('logo-bar');
    var qNav = $id('float-logo');//要固定的导航栏
    var topHeight = topB.offsetHeight+logo.offsetHeight;//top的高度
    var navHeight = qNav.offsetHeight;//导航栏的高度
    var main = $id('banner');
    //绑定scroll事件
    window.onscroll = function(){
        //如果滚动距离超过top的高度
        if(scroll().top>topHeight){
            qNav.style.display = 'block';
            main.style.paddingTop = navHeight+"px";
        }else{
            qNav.style.display = 'none';
            main.style.paddingTop = 0;
        }
    }
})
$(function(){
    var div=document.getElementsByClassName('center-1')[0];
    var input=div.children[0];
    var ul=div.children[3];
    var flag=true;
    input.addEventListener('compositionstart',function(){
        flag = false;
    })
    input.addEventListener('compositionend',function(){
        flag = true;
    })
    input.oninput = function(){
        setTimeout(function(){
            if(flag){
                var keyword = input.value;
                ajax({
                    dataType:'jsonp',
                    url:'https://suggest.taobao.com/sug',
                    data:{
                        code:"utf-8",
                        q:keyword,
                        _ksTS:"1563970517892_385",
                        k:1,
                        area:"c2c",
                        bucketid:10

                    },
                    success:function(data){
                        var result = data.result;//是一个数组
                        var str = "";
                        result.forEach(function(value){
                            str+="<li>"+value[0]+"</li>"
                        })
                        ul.innerHTML = str;
                    }
                })
            }
        },0)
    }
})
$(function(){
    var div=document.getElementsByClassName('tab')[0];
    var input=div.children[0];
    var ul=div.children[3];
    var flag=true;
    input.addEventListener('compositionstart',function(){
        flag = false;
    })
    input.addEventListener('compositionend',function(){
        flag = true;
    })
    input.oninput = function(){
        setTimeout(function(){
            if(flag){
                var keyword = input.value;
                ajax({
                    dataType:'jsonp',
                    url:'https://suggest.taobao.com/sug',
                    data:{
                        code:"utf-8",
                        q:keyword,
                        _ksTS:"1563970517892_385",
                        k:1,
                        area:"c2c",
                        bucketid:10

                    },
                    success:function(data){
                        var result = data.result;//是一个数组
                        var str = "";
                        result.forEach(function(value){
                            str+="<li>"+value[0]+"</li>"
                        })
                        ul.innerHTML = str;
                    }
                })
            }
        },0)
    }
})