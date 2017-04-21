
class datasCV{
    constructor(){
        this.datas = JSON.parse(data);
    }
    get name_categories(){
        var cate_list=[];
        for (var i=0;i< this.datas.length;i++){
            var cate=this.datas[i].category;
            if ((cate_list.indexOf(cate)<0) && (cate == this.datas[i].field)){
                cate_list.push(this.datas[i].text_field)
            }
        }
        return cate_list;
    }
    
}
