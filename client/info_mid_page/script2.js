// 在 index2.html 中獲取查詢參數的值
const urlParams = new URLSearchParams(window.location.search);
const number = urlParams.get('number');
console.log(number); // 輸出藥材ID的值，例如 123

const APILINK = 'http://localhost:5000/info';
const main = document.getElementById("main");

SelectAllAPI = 'http://localhost:5000/getMedicineData';
ShowSourceAPI='http://localhost:5000/getMedicineSource';

console.log("here1");
select(SelectAllAPI);
console.log("here2");
select_source(ShowSourceAPI);
console.log("here3");

function select(url){ axios(url).then((res)=>{
        console.log(res.data);
        const idToFind = parseInt(number);
        var data = res.data.filter(item => item['藥材ID'] === idToFind);
        console.log(data);


        var herb_name_Container = document.getElementById('herb_name');
        var herb_name = data.map(item => item['藥材名']);
        //--------------------------------------------------
        var herb_latin_Container=document.getElementById('herb_latin');
        var herb_latin = data.map(item => item['拉丁生藥名稱']);
        //---------------------------------------------------
        var herb_Eng_Container=document.getElementById('herb_Eng')
        var herb_Eng = data.map(item => item['英文名稱']);
//---------------------------------------------------
        var herb_base_Container=document.getElementById('herb_base')
        var herb_base = data.map(item => item['基原']);
        //---------------------------------------------------
        var herb_amount_Container=document.getElementById('herb_amount')
        var herb_amount = data.map(item => item['含量']);
        //---------------------------------------------------
        var herb_use_Container=document.getElementById('herb_use')
        var herb_use = data.map(item => item['用途分類']);
//---------------------------------------------------
        var herb_attribute_Container=document.getElementById('herb_attribute')
        var herb_attribute = data.map(item => item['性味與歸經']);
        //---------------------------------------------------
        var herb_effect_Container=document.getElementById('herb_effect')
        var herb_effect = data.map(item => item['含量']);
        //---------------------------------------------------
        var herb_use_amount_Container=document.getElementById('herb_use_amount')
        var herb_use_amount = data.map(item => item['用途分類']);
        //---------------------------------------------------
        var herb_storage_Container=document.getElementById('herb_storage')
        var herb_storage = data.map(item => item['貯藏法']);

        herb_name_Container.innerHTML = '中文名：' + herb_name.join(', ');
        herb_latin_Container.innerHTML='拉丁生藥名稱: '+herb_latin.join(', ');
        herb_Eng_Container.innerHTML= "英文名稱: "+herb_Eng.join(', ');

        herb_base_Container.innerHTML= "基原: "+herb_base.join(', ');
        herb_amount_Container.innerHTML= "含量: "+herb_amount.join(', ');
        herb_use_Container.innerHTML= "用途分類: "+herb_use.join(', ');

        herb_attribute_Container.innerHTML= "性味與歸經: "+herb_attribute.join(', ');
        herb_effect_Container.innerHTML= "效能: "+herb_effect.join(', ');
        herb_use_amount_Container.innerHTML= "用法與用量: "+herb_use_amount.join(', ');
        herb_storage_Container.innerHTML="貯藏法: "+herb_storage.join(', ');
        });
}

function select_source(url){ axios(url).then((res)=>{
        const idToFind = parseInt(number);
        var data = res.data.filter(item => item['藥材ID'] === idToFind);
        console.log(data);
        const div_cardBox = document.createElement('div');
        div_cardBox.setAttribute('class',"med_info_box");
        div_cardBox.setAttribute('id' , "med_info_box");

        data.forEach(element => {
                const exit = document.getElementById(`Card_${element.藥名}_${element.資料來源ID}_${element.實驗條件ID}_${element.樣品編號ID}`)
                if(exit) return;

                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'med_info');
                div_card.setAttribute('id',`Card_${element.藥名}_${element.資料來源ID}_${element.實驗條件ID}_${element.樣品編號ID}`)
        
                const image = document.createElement('img');
                image.setAttribute('class', 'med_info_img');
                image.setAttribute('alt',`${element.藥名}_${element.資料來源ID}_${element.實驗條件ID}_${element.樣品編號ID}`);
                image.setAttribute('title',`${element.藥名}_${element.資料來源ID}_${element.實驗條件ID}_${element.樣品編號ID}`);
                image.src = `甘草1_1_1.png`;

                const title = document.createElement('p');
                title.innerHTML = `<font>${element.藥名}-${element.資料來源ID}-${element.實驗條件ID}-${element.樣品編號ID}</font>`;
        
                const link = document.createElement('a');
                link.href = `../leaf_page/leaf.html?herb_name=${element.藥名}&nameid=${element.藥材ID}&x=${element.資料來源ID}&y=${element.實驗條件ID}&z=${element.樣品編號ID}`
        
                link.appendChild(image);
                div_card.appendChild(link);
                div_card.appendChild(title);
                div_cardBox.appendChild(div_card);

        });
        main.appendChild(div_cardBox);
        });
}