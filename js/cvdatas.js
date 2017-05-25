function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
class datasCV{
    constructor(data,lang){
        this.datas= data;
        this.lang=lang;
        this.all_langs = Object.keys(data);
    }
    get data(){
        return this.datas[this.lang];
    }
    get name_categories(){
        let cate_list=[];
        for (let i=0;i< this.datas[this.lang].length;i++){
            let cate=this.datas[this.lang][i].category;

            if ((cate_list.indexOf(cate)<0) ){
                cate_list.push(this.datas[this.lang][i].category)
            }
        }

        return cate_list;
    }
    get categories(){
        let cate_list={};
        for (let i=0;i< this.datas[this.lang].length;i++){
            let cate=this.datas[this.lang][i].category;
            let id_cate=this.datas[this.lang][i].id_category;
            let cate_keys=Object.keys(cate_list);
            if ((cate_keys.indexOf(id_cate)<0) ){
                cate_list[id_cate]=cate;
            }
        }

        return cate_list;
    }
    fieldByCat(category){
        let field_list=[];
        for (let i=0;i< this.datas[this.lang].length;i++){
            let cate=this.datas[this.lang][i].category;
            if (cate == category){
                let field=this.datas[this.lang][i].field;
                field_list.push(field);
            }
        }

        return field_list;
    }
    value(field){
        let valor="";
        for (let i=0;i< this.datas[this.lang].length;i++){
            let name_field=this.datas[this.lang][i].field;
            if (name_field == field){
                valor = this.datas[this.lang][i].info;
                return valor;
            }
        }
    }
    all_values(field){
        let value_list=[];
        for (let i=0;i< this.datas[this.lang].length;i++){
            let valor = this.datas[this.lang][i];
            value_list.push(valor[field]);
        }

        return value_list;
    }
    all_values_uni(field){
        let value_list=[];
        for (let i=0;i< this.datas[this.lang].length;i++){
            let valor = this.datas[this.lang][i];
            value_list.push(valor[field]);
        }
        let unique = Array.from(new Set( value_list )); 

        return unique;
    }
}
