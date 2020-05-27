
class handleTLLT {
    
    constructor(arrayTL , arrayTT){

        this.arrayTL = arrayTL ; 
        this.arrayTT = arrayTT;
    }

    handleData(){

        var purposeArray = []; 
        for(var i = 0 ; i < this.arrayTL.length ; i++){
            var flag = {
                tentheloai : "",
                dsloaitin  : []
            }

        
            flag.tentheloai = this.arrayTL[i].ten ;
            for(var j = 0 ; j < this.arrayTT.length ; j++)
            {
                if(this.arrayTT[j].tentheloai == this.arrayTL[i].ten){

                    flag.dsloaitin.push({tenloaitin:this.arrayTT[j].tenloaitin, 
                                         tenkhongdau:this.arrayTT[j].tenkhongdau}
                                            ) ; 

                }
            }
            purposeArray.push(flag); 
        }
        return purposeArray ; 
    }
}
module.exports = handleTLLT ; 