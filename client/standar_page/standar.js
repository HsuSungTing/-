LinkAPI = 'http://localhost:8002/ref_link';
StandarDataAPI = 'http://localhost:8002/standar';
const urlParams = new URLSearchParams(window.location.search);
const {stanId } = Object.fromEntries(urlParams.entries());


function ref_link_block_maker(url, sourceId){
    axios(url).then((res)=>{
        console.log(res.data);
        const div_linkBox = document.getElementById("link-part");

        const ref_link = document.createElement('a');
        ref_link.setAttribute('class', 'link-text-color');
        ref_link.setAttribute('target','_blank');
        ref_link.innerHTML = `<font>參考文獻</font>`;

        const ref_text = document.createElement('p');
        ref_text.setAttribute('style',"margin:10px;");
        
        res.data.forEach(element => {
            if(element.Source_id=== Number(sourceId)){
                ref_link.setAttribute("href",`${element.Source_link}`);
                ref_text.innerHTML = `${element.Source_name}`;
            }
        });
        
        div_linkBox.appendChild(ref_link);
        div_linkBox.appendChild(ref_text);
    });
    
}
  
function getSampleData(url){
    axios(url).then((res)=>{
        res.data.forEach(element => {
            nameid=element.Med_id;
            herb_name=element.Med_name;
            soruceId = element.Source_id;
            document.getElementById("med_info").setAttribute("href",`../info_mid_page/index2.html?number=${nameid}`);
            document.getElementById("med_ref").setAttribute("href", `../info_mid_page/index2.html?number=${nameid}`);
            document.getElementById("herb-name").innerHTML = `${herb_name}`; 
            ref_link_block_maker(LinkAPI,soruceId);
        });
    });
}

getSampleData(StandarDataAPI + `?stanId=${stanId}&tbName=SampleData&max=${1}`);
document.getElementById("med_name").setAttribute("href","../home_page/index.html");
//document.getElementById("sample").innerHTML=getStandarData(StandarDataAPI + `?stanId=${stanId}&tbName=StandardData&max=${1}`);
getStandarData(StandarDataAPI + `?stanId=${stanId}&tbName=StandardData&max=${1}`);

function getStandarData(url){
    console.log(url);
    axios(url).then((res)=>{
        res.data.forEach(element => {
            Standard_name = document.getElementById("sample");
            Standard_name.innerHTML = element.Standard_name;
            Standard_name.style.textAlign = 'left';
        });
    });
    
}
