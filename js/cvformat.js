

class CV{
    constructor(datas_cv){
        this.name_lang={'es':{'es':'español','en':'inglés','cat':'catalán'},'en':{'es':'spanish','en':'english','cat':'catalan'},'cat':{'es': 'espanyol', 'en': 'anglès', 'cat': 'català'}};
        this.menus={};
        this.datas_cv= datas_cv;
        this.loadCVFull(this.datas_cv.lang);
        //this.loadMenuLang();
        this.addEventLang();
        this.addEventMenuButton();

    }
    setLang(lang){
       this.datas_cv.lang=lang;
    }
    addEventLang(){
        for (let i in this.datas_cv.all_langs){
            let l=this.datas_cv.all_langs[i];
            let nl=this.name_lang[this.datas_cv.lang][l];
            let elem=document.getElementById(this.menus["lang"].element[nl]);
            elem.addEventListener("click", ()=>{
                this.setLang(l);
                this.loadCVFull(this.datas_cv.lang);

                this.addEventLang();
            });
        }

    }
    moveScreen(){
      let menu=document.getElementById("principal_1");
      let info=document.getElementById("principal_2");
      if (menu.style.display=="none" || menu.style.display==""){

          $( "#principal_1" ).fadeIn( "slow", function() {
            // Animation complete
            menu.style.display="flex";
            console.log(  info.style.marginLeft)
            info.style.marginLeft=menu.offsetWidth+"px";
            console.log(  info.style.marginLeft)
          });

      }else{
        $( "#principal_1" ).fadeOut( "slow", function() {
          // Animation complete
          menu.style.display="none";
          info.style.marginLeft=0;
        });

          //menu.style.width="0";

      }
    }
    moveScreenOnlyResize(){
      let menu=document.getElementById("principal_1");
      let info=document.getElementById("principal_2");
      $( "#principal_1" ).fadeIn( "slow", function() {
        // Animation complete
        menu.style.display="flex";
        console.log(  info.style.marginLeft)
        info.style.marginLeft=menu.offsetWidth+"px";
        console.log(  info.style.marginLeft)
      });
    }
    addEventMenuButton(){

        let img=document.getElementById("menu_button_img");

        img.addEventListener("click", ()=>{
            this.moveScreen();

        });


    }
    loadMenuLang(){
        let langs=[];
        for (let i in this.datas_cv.all_langs){
            langs.push(this.name_lang[this.datas_cv.lang][datas_cv.all_langs[i]])
        }
        let options_lang={"es":"Idioma","en":"Language",'cat':'Idioma'}
        let m= new menu("menu_lang");
        m.extra_event=this.moveScreenOnlyResize;
        m.imgMenu="img/lang.png";
        m.imgTextMenu=options_lang[this.datas_cv.lang];
        m.top="10px";
        m.left="20px";
        m.zIndex=12000;
        m.putMenu();
        m.addOptions({"elements":langs});
        this.menus["lang"]=m;

    }
    loadMenuCategories(){
        let cate=this.datas_cv.all_values_uni("category");
        let options_lang={"es":["ver","detalles"],"en":["show","details"],"cat":["veure", "detalls"]}
        let text_icon={"es":["Detalles"],"en":["Details"],'cat':['Detalls']}
        let ol=options_lang[this.datas_cv.lang]
        let m_cat= new menu("menu_categories");
        m_cat.extra_event=this.moveScreenOnlyResize;
        m_cat.top="20px";
        m_cat.left="20px";
        m_cat.zIndex=11000;
        m_cat.imgMenu="img/category.png";
        m_cat.imgTextMenu=text_icon[this.datas_cv.lang];
        m_cat.putMenu();
        m_cat.addOptions({"elements":cate});
        for (let c in cate){
            let ol_new=ol.map((a)=>a+" "+cate[c])
            m_cat.addOptions({"elements":ol_new,parent:cate[c]});

            let cat_elem=[];
            let cat_elem_field={};
            for (let i=0;i< this.datas_cv.data.length;i++){
                if (cate[c]==this.datas_cv.data[i].category){
                    if (this.datas_cv.data[i].text_field !=""){
                        cat_elem.push(this.datas_cv.data[i].text_field);
                        cat_elem_field[this.datas_cv.data[i].field]=this.datas_cv.data[i].text_field;
                    }
                }
            }
            m_cat.addOptions({"elements":cat_elem,parent:ol_new[1]});
            let ol_ele=document.getElementById(m_cat.element[ol_new[0]]);
            ol_ele.innerHTML=ol_ele.innerHTML+'<label class="switch"><input type="checkbox" id="check_'+m_cat.element[ol_new[0]]+'" checked><div class="slider round"></div></label>';
            let show=document.getElementById("check_"+m_cat.element[ol_new[0]]);
            show.addEventListener("click", ()=>{
                let categ=this.datas_cv.categories;
                for (let ca in categ){
                    if (categ[ca]==cate[c]){
                        let div_show=document.getElementById("div_"+ca);
                        if (show.checked){
                            div_show.style.display="block";
                        }else{
                            div_show.style.display="none";
                        }
                    }
                }

            });


            cat_elem.map((a)=>{
                let ol_cat_elem=document.getElementById(m_cat.element[a]);
                ol_cat_elem.innerHTML=ol_cat_elem.innerHTML+'<label class="switch"><input type="checkbox" id="check_'+m_cat.element[a]+'" checked><div class="slider round"></div></label>';
                let show=document.getElementById("check_"+m_cat.element[a]);
                let key_field="";
                for (let cef in cat_elem_field){
                    if (cat_elem_field[cef]==a){
                        key_field=cef;
                    }
                }
                //this.datas_cv.data[i].field

                show.addEventListener("click", ()=>{
                    let div_show=document.getElementById("p_"+key_field);
                    if (show.checked){
                           div_show.style.display="block";
                     }else{
                           div_show.style.display="none";
                     }



                });

            });

        }


    }
    getDataUri(url, callback) {
      let img = new Image();

      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = function () {
          let canvas = document.createElement("canvas");
          canvas.width =this.width;
          canvas.height =this.height;

          let ctx = canvas.getContext("2d");
          ctx.drawImage(this, 0, 0);

          var dataURL = canvas.toDataURL("image/png");

          callback(dataURL);
      };

      img.src = url;
    }
    createPDF(dataUri){
      let columns_header=[]
      let footer_data=[{ text: "\n"+this.datas_cv.value("name")+"\n",alignment: 'center',style:'dataFooter'}];
      let sections=[{columns:[{ text: this.datas_cv.value("name"), alignment: 'center',style: 'header' }]}];
      if (dataUri!=""){
          let sections=[{columns:[{ text: this.datas_cv.value("name"), alignment: 'center',style: 'header' },{ image: dataUri,height: 100, width: 100, margin: [ 0,0,10,0] }]}];
      }

      let cate=this.datas_cv.all_values_uni("id_category");
      let name_cate=this.datas_cv.all_values_uni("category");
      for (let c=0;c< cate.length;c++){
          let ca=cate[c];
          let div_show_cat=document.getElementById("div_"+ca);
          if (div_show_cat.style.display!=null && div_show_cat.style.display!="none"){
            let section={text: name_cate[c].toUpperCase(), style: 'section',decoration: 'underline',margin: [ 0,12,0,12]};
            let list_section=[]
            for (let i=0;i< this.datas_cv.data.length;i++){




                if (ca==this.datas_cv.data[i].id_category){
                  let div_show=document.getElementById("p_"+this.datas_cv.data[i].field);

                  if ((div_show!=null) && (div_show.style.display!="none" ) ){
                    if (this.datas_cv.data[i].field=="email"){
                        footer_data.push({ text: this.datas_cv.data[i].info,alignment: 'center',style:'dataFooter'})
                    }
                    if (this.datas_cv.data[i].field!="photoCV"){
                        let info_date="";
                        if (this.datas_cv.data[i].units!=undefined && this.datas_cv.data[i].units!=""){
                            info_date='('+this.datas_cv.data[i].value+" "+this.datas_cv.data[i].units+')';
                        }
                        let name_point=this.datas_cv.data[i].text_field+' '+info_date;
                        let text_point=' '+this.datas_cv.data[i].info;
                        let row={text:[{text:name_point,bold: true},{text:text_point}],margin: [ 0,6,0,6]}
                        list_section.push(row);

                    }
                  }
                }

            }
            let data_section={type:'none',ul:list_section};
            sections.push(section);
            sections.push(data_section);
          }
      }


      let docDefinition = {
        pageSize: 'A4',
        pageMargins: [ 40, 60, 40, 60 ],
        footer: function(currentPage, pageCount,pageSize) {return [
                                                            { canvas: [{type: 'line',
                                                      					x1: 35, y1: 0,
                                                      					x2: pageSize.width-35, y2: 0,
                                                      					lineWidth: 1 }]
                                                            },
                                                            footer_data,
                                                            { text:currentPage.toString() + '/' + pageCount,alignment: 'right',style:'dataFooter',margin: [ 0,0,6,0]}
                                                          ] },
        content: sections,
        styles: {
         header: {
           fontSize: 22,
           bold: true
         },
         dataFooter:{
           fontSize: 10,
           italic: true,
         },
         section: {
           italic: true,
           fontSize: 18,
           bold: true
         }
       }
      };
      pdfMake.createPdf(docDefinition).download('curriculumFMA.pdf');
      //pdfMake.createPdf(docDefinition).open();


    }
    loadMenuExport(){
        let options_export={"es":["exportar a PDF"],"en":["export to PDF"],"cat":["exportar a PDF"]}
        let text_icon={"es":["Exportar"],"en":["Export"],'cat':['Exportar']}
        let exportar=options_export[this.datas_cv.lang]
        let m= new menu("menu_export");
        m.extra_event=this.moveScreenOnlyResize;
        m.imgMenu="img/export.png";
        m.imgTextMenu=text_icon[this.datas_cv.lang];
        m.top="20px";
        m.left="20px";
        m.zIndex=10000;
        m.putMenu();
        m.addOptions({"elements":exportar});

        let elem_exp=document.getElementById(m.element[exportar[0]]);



        elem_exp.addEventListener("click", ()=>{
            let hostname=window.location.host;
            if (hostname ==""){
              this.createPDF("");
            }else{
              this.getDataUri('img/perfil.jpg', (dataUri)=> {
                this.createPDF(dataUri);
              });
            }

          });


    }
    loadMenuSupport(){
        let options_support={"es":["Cuestiones"],"en":["issues"],"cat": ["Qüestions"]}
        let text_icon={"es":["Sugerencias"],"en":["Issues"],"cat": ["Suggeriments"]};
        let options_menu=options_support[this.datas_cv.lang]
        let m= new menu("menu_support");
        m.extra_event=this.moveScreenOnlyResize;
        m.imgMenu="img/issue.png";
        m.imgTextMenu=text_icon[this.datas_cv.lang];
        m.top="20px";
        m.left="20px";
        m.zIndex=9000;
        m.putMenu();
        m.addOptions({"elements":options_menu});

        let elem_supp=document.getElementById(m.element[options_menu[0]]);
        elem_supp.addEventListener("click", ()=>{
           let url="https://github.com/PhoenixAlx/Curriculum/issues";
           window.open(url, '_blank');


        });

    }
    loadInformation(){
        //load sections
        let sections='<section role="main" class="container_16 " >';
        let cate=this.datas_cv.all_values_uni("id_category");
        let name_cate=this.datas_cv.all_values_uni("category");
        for (let c=0;c< cate.length;c++){
            let ca=cate[c];
            let section='<div class="grid_16"><div id="div_'+ca+'" class="grid_16  '+ca+'"><h3>'+name_cate[c]+'</h3>';

            for (let i=0;i< this.datas_cv.data.length;i++){

                if (ca==this.datas_cv.data[i].id_category){

                    if (this.datas_cv.data[i].field!="photoCV"){
                        let info_date="";
                        if (this.datas_cv.data[i].units!=undefined && this.datas_cv.data[i].units!=""){
                            info_date=' ('+this.datas_cv.data[i].value+" "+this.datas_cv.data[i].units+')';
                        }
                        section=section+'<p id="p_'+this.datas_cv.data[i].field+'"><b>'+this.datas_cv.data[i].text_field+''+info_date+'</b> <span class="cv_data_extra">'+this.datas_cv.data[i].info+'</span></p>';
                    }
                }
            }
            section=section+'</div></div>';

            sections=sections+section;
        }
        sections=sections+'</section>';
        $("#container").html(sections);
        //$("#container").append(sections);
    }
    loadHeader(){
        let nameTitle=this.datas_cv.value("name");
        let header='<div class="container_16"><hgroup><h1>'+nameTitle+'</h1></hgroup><figure>		<img src="img/perfil.jpg" alt="'+nameTitle+'"></figure></div>'
        $("#div_header").html(header);
    }
    loadCVFull(lang){
        this.setLang(lang);
        this.loadMenuLang();
        this.loadMenuCategories();
        this.loadMenuExport();
        this.loadMenuSupport();
        this.loadHeader();
        this.loadInformation();
    }
}
