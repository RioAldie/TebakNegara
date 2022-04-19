const container = document.getElementById('container');
const correct = document.getElementById('correct');
const wrong = document.getElementById('wrong');
const input = document.getElementById('answer');
const reswrong = document.getElementById('resWrong');
const resCorrect = document.getElementById('resCorrect');
const IdResult = document.getElementById('result');
const disable = document.getElementById('disable')
let answer = "";
let kunci = "";
let allCountry;
let scoreBenar = 0;
let scoreSalah = 0;
let soal = 1;

const country = async () =>{
    const response = await fetch('../json/data.json');

    let data = await response.json();
    let country = data.country;
    
    queryScoreBenar(scoreBenar);
    queryScoreSalah(scoreSalah)
    allCountry = country;
    if(soal == 1){
        question(1);
    }
}
country();

const question = (soal) =>{
    const { name, flag} = allCountry[soal];
    kunci = name;
    container.innerHTML = queryQuest(flag, name)
    console.log(kunci)
}
const queryQuest = (flag, name) =>{
    return ` 
    <div class="img-country">
    <img src=${flag} alt="">
    </div>
    `
}
function handleInput(e){
     answer = e.value;
}
function handleAnswer(){
    console.log("kunci", kunci)
    let hasil = false;
    if(answer == kunci){
        hasil = true;
        console.log("Benar")
        handleCorrect();
        createResult(hasil, kunci);
        
    }else{
        hasil = false;
        console.log("salah")
        handleWrong();
        createResult(hasil, kunci);
    }
    queryScoreBenar(scoreBenar);
    queryScoreSalah(scoreSalah);
    handleNext();
}
function handleNext(){
    soal = soal + 1;
    input.value = ""
    if(soal <= 11){
        return question(soal)
    }else{
        return popupRes();
    }
    
}
function popupRes(){
    disable.classList.toggle('active');
}
function handleCorrect(){
    return scoreBenar = scoreBenar + 1;
}
function handleWrong(){
    return scoreSalah =  scoreSalah + 1;
}
const queryScoreBenar = (score) =>{
    correct.innerHTML = `${score}`;
    resCorrect.innerHTML = `${score}`;

}
const queryScoreSalah = (score) =>{
    wrong.innerHTML = `${score}`;
    reswrong.innerHTML = `${score}`;
}
const createResult = (result) =>{
    if(result == true){
      return  IdResult.innerHTML = `<span>"Well Done Kido"</span>`;
        
    }
    if(result != true){
        return  IdResult.innerHTML = `<span>"Kamu Salah! ini bendera ${kunci}"</span>`;
       
    }
}
