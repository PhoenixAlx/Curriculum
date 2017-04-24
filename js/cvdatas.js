function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
class datasCV{
    constructor(){
        this.datas = JSON.parse(data);
    }
    get name_categories(){
        var cate_list=[];
        for (var i=0;i< this.datas.length;i++){
            var cate=this.datas[i].category;

            if ((cate_list.indexOf(cate)<0) ){
                cate_list.push(this.datas[i].category)
            }
        }

        return cate_list;
    }
    value(field){
        var valor="";
        for (var i=0;i< this.datas.length;i++){
            var name_field=this.datas[i].field;
            if (name_field == field){
                valor = this.datas[i].info;
                return valor;
            }
        }
    }
    all_values(field){
        var value_list=[];
        for (var i=0;i< this.datas.length;i++){
            var valor = this.datas[i];
            value_list.push(valor[field]);
        }

        return value_list;
    }
    all_values_uni(field){
        var value_list=[];
        for (var i=0;i< this.datas.length;i++){
            var valor = this.datas[i];
            value_list.push(valor[field]);
        }
        var unique = Array.from(new Set( value_list )); 

        return unique;
    }
}
