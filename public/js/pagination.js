var placePost = document.querySelector(".place-post-news"); 
var loadmoretitle  = document.querySelector(".load-more"); 
$(document).ready(function(){

    var page = 2; 
 
    $(".load-more").click(function(){
        
        var pageSend = (page-1)*5;  
            $.ajax({
                    url    :"/getNewsAjax",
                    method :"POST",
                    data   : {
                        page : pageSend 
                    }, 
                    success: function(data){
                        
                        if(data.length == 0 ){
                            loadmoretitle.style.backgroundColor = "gray"; 
                            loadmoretitle.style.userSelect = "none";
                        }

                        for(var i = 0 ; i < data.length ; i ++){
                            var news = `
                            <div class="wrapper-news">
                            <div class="img-news-outside">
                                <a href="/news/${data[i].data._id}">
                                  <img src=' ${data[i].data.image}' alt="#" class="img-news">
                                </a>
                            </div>
                                                       
                                <div class="content-news">
                                    <!-- !1  -->
                                    <div class="title-news">
                                        <a href="/news/${data[i].data._id}"> 
                                            <p >
                                            ${data[i].data.tieude}
                                            </p>
                                        </a>       
                                    </div>                          
                                    <!-- !2  -->
                                    <p class="date-news">
                                        ${data[i].data.createat}
                                    </p>
                                    <!-- !3  -->
                                    <div class="description-outside">
                                        <a href="/news/${data[i].data._id}">
                                            <p class="description">
                                                ${data[i].data.description}
                                            </p>
                                        </a>
                                    </div>
                                    <!-- !4   -->
                                    <div class="wrapper-like-com">
                                        <div class="count-like-com-share">
                                            <p> ${data[i].fb.reaction_count}</p>
                                            <p>${data[i].fb.comment_plugin_count}</p>
                                            <p>${data[i].fb.share_count}</p>
                                        </div>
                                        <div class="icon-like-com">
                                            <i class="fas fa-thumbs-up"></i>
                                            <i class="fas fa-comment"></i>
                                            <i class="fas fa-share-square"></i>
                                        </div>
                                    </div>
                                    </div>
                            
                          
                            </div> 
                            
                            
                            `
                            placePost.innerHTML+=news ; 
                        }     
                        console.log(data); 
                        page = page + 1; 
                        
                    }
            })
            
    })  

}); 
