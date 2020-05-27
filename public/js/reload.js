// var TOKEN = '378227049489227|3460ff745bbe7ef79a8c29eb117739ba'
// var URL = 'https://www.gadadev.tk/news/5d731645c7644f0017ec0e03'
  
window.addEventListener("load",()=>{
        var preLoad = document.querySelector(".preload"); 
        var wrapper = document.querySelector(".wrapper")
        // preload 
        preLoad.classList.add("finish-preload");
        setTimeout(()=>{
            wrapper.classList.remove("hidden-wrapper");
        },500)
       
        // $.ajax({
        //     url: 'https://graph.facebook.com/v3.0/',
        //     dataType: 'jsonp',
        //     type: 'GET',
        //     data: {fields: 'engagement', access_token:`${TOKEN}`,id:`${URL}`},
        //     success: function(data){
                
        //         $('.count-like-com-share .count-like').append(data.engagement.reaction_count);
        //         $('.count-like-com-share .count-share').append(data.engagement.share_count);
        //     },
        //     error: function(data){
        //         console.log(data); // send the error notifications to console
        //     }
        // });


 }); 
