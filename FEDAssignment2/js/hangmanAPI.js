let a = document.getElementById("a");
let b = document.getElementById("b");
let c = document.getElementById("c");
let d = document.getElementById("d");
let e = document.getElementById("e");
let f = document.getElementById("f");
let g = document.getElementById("g");
let h = document.getElementById("h");
let i = document.getElementById("i");
let j = document.getElementById("j");
let k = document.getElementById("k");
let l = document.getElementById("l");
let m = document.getElementById("m");
let n = document.getElementById("n");
let o = document.getElementById("o");
let p = document.getElementById("p");
let q = document.getElementById("q");
let r = document.getElementById("r");
let s = document.getElementById("s");
let t = document.getElementById("t");
let u = document.getElementById("u");
let v = document.getElementById("v");
let w = document.getElementById("w");
let x = document.getElementById("x");
let y = document.getElementById("y");
let z = document.getElementById("z");

let word = document.getElementById("word");

let string = "kaicenat";

for (let i = 0; i < string.length; i++) {
    if (string[i]) {
        console.log("sdf");
        let html = `<div><h1 class="text-white border-bottom border-black ` + string[i].toUpperCase() + `">` + string[i].toUpperCase() + `</h1></div>`
        word.insertAdjacentHTML("beforeend", html);
    }
}

a.addEventListener("click", func => {
    let A = document.getElementsByClassName("A");
    for(let j = 0; j < A.length; j++) {
        A[j].classList.remove("text-white");
        A[j].classList.add("text-black");
    }
})