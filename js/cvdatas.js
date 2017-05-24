function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
class datasCV{
    constructor(lang){
        this.datas = data[lang];
        this.all_langs = Object.keys(data);
    }
    get name_categories(){
        let cate_list=[];
        for (let i=0;i< this.datas.length;i++){
            let cate=this.datas[i].category;

            if ((cate_list.indexOf(cate)<0) ){
                cate_list.push(this.datas[i].category)
            }
        }

        return cate_list;
    }
    value(field){
        let valor="";
        for (let i=0;i< this.datas.length;i++){
            let name_field=this.datas[i].field;
            if (name_field == field){
                valor = this.datas[i].info;
                return valor;
            }
        }
    }
    all_values(field){
        let value_list=[];
        for (let i=0;i< this.datas.length;i++){
            let valor = this.datas[i];
            value_list.push(valor[field]);
        }

        return value_list;
    }
    all_values_uni(field){
        let value_list=[];
        for (let i=0;i< this.datas.length;i++){
            let valor = this.datas[i];
            value_list.push(valor[field]);
        }
        let unique = Array.from(new Set( value_list )); 

        return unique;
    }
}
