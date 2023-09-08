const hrscontainer=document.getElementById("hrs")
const Mincontainer=document.getElementById("Min")
let alarmlist=[]
const allalarm=document.getElementById("alarm")
const showbutton=document.getElementById("show")
showbutton.hidden=false


const StopAlarmbtn=document.getElementById("Stop")
StopAlarmbtn.disabled=true;
console.log(StopAlarmbtn)
let view=false
//Making Hourslist 
let hrs=""
for(let i=0;i<25;i++)
{
    let currhr=i<10?"0"+i.toString():i.toString()
    hrs+=`<option id=${currhr} value=${currhr}>${currhr}</option> `
}
hrscontainer.innerHTML=hrs;
//Making Minutes list
let Min=""
for(let i=0;i<=60;i++)
{
    let currmin=i<10?"0"+i.toString():i.toString()
    Min+=`<option id=${currmin} value=${currmin}>${currmin}</option> `
}
Mincontainer.innerHTML=Min;



///////////////////////////////////////////////////
showbutton.addEventListener('click',()=>{showtime(hrscontainer.value,Mincontainer.value,alarmlist)})
function showtime(hrs,min,alarmlist)
{
    
    view=true
   // showbutton.hidden=true
    //cancelbutton.hidden=false
    alarmlist.push(`${hrs},${min}`)
    console.log(hrs,min,alarmlist)
    addalarm(alarmlist)
   

  
}
///////////////////////////////////////////////////
 const addalarm=(alarmlist)=>{
  let a=""
  for(let i=0;i<alarmlist.length;i++)
  {
    let ce=alarmlist[i].replace(",",":")  
    let desc="AM"
    let index=ce.indexOf(":")
    let deschrs=ce.slice(0,index)
    console.log(deschrs)
    if(deschrs>12)
    {
       desc="PM"
    }
    a+=`<div  class="alarmdivs" id=${alarmlist[i]}><h4>${ce+" "+desc}</h4>   <img class="del" id=${alarmlist[i]+'del'}  src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" width=20 height=20></div>`
  }
  allalarm.innerHTML=a;
  allalarms();
  

 }
 ///////////////////////////////list render()
 const allalarms=()=>{
  const divs=document.querySelectorAll(".del");

  divs.forEach(element => {
    element.addEventListener('click',()=>{
      const index=element.id.indexOf('d');
      const newid=element.id.slice(0,index);
      console.log(newid)
      del(newid)

      
    }) });
 }
 /////////////////////////deleting alarm
 const del=(id)=>{
 
   const newlist=alarmlist.filter((i)=>i!=id)
   alarmlist=newlist
   addalarm(alarmlist);
   checkcurrent(id);
   ringtone.pause()

 }
 /////////////////////////////////////for stoping on deleting
 const checkcurrent=(checktime)=>{
  let date=new Date()
  let chr=date.getHours()
  let cmin=date.getMinutes()
  let csec=date.getSeconds()

  const commaindex=checktime.indexOf(',')
  const thr=checktime.slice(0,commaindex)
  const tmin=checktime.slice(commaindex+1)
  if(thr==chr && cmin==tmin)
  {
    ringtone.pause()
    view=false;
    StopAlarmbtn.disabled=true;
    showbutton.disabled=false;
  }
 }



///////////////////////////////////////////////////////
//Importing ringtone
let ringtone=new Audio("ringtone.mp3")
const time=document.getElementById("time")
//Using SetInterval to display time
setInterval(()=>{
  let date=new Date()
  let chr=date.getHours()
  let cmin=date.getMinutes()
  let csec=date.getSeconds()
  if(alarmlist.length>0)
{
  allalarm.hidden=false;
}
if(alarmlist.length==0)
{

  allalarm.hidden=true;
}
  let ctime=`${chr}:${cmin}:${csec}`
  time.innerHTML=ctime
  for(let i=0;i<alarmlist.length;i++)
  {
    const commaindex=alarmlist[i].indexOf(',')
    const thr=alarmlist[i].slice(0,commaindex)
    const tmin=alarmlist[i].slice(commaindex+1)
    //console.log(thr,tmin)
    if(chr==thr && cmin==tmin && view==true)
  {
    
    ringtone.play();
    ringtone.loop=true;
    showbutton.disabled=true;
    StopAlarmbtn.disabled=false;
    if(cmin<10)
    {
      cmin=`0`+cmin;
    }
    
    StopAlarmbtn.addEventListener('click',()=>{  view=false; const delid=`${chr},${cmin}`; del(delid);})

  }
  }



},1000);

