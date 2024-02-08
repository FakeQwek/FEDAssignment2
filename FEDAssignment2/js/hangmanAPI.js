//setting the oAuth key and clientID
const oAuth = "6vsaryozvkalsvqacwmc1l4f5ayxdt";

//setting the lists that will be used
const clientId = "eassc2nhlz71317bkeqe3ftj9xugl7";
let regex = /^[a-zA-Z]+$/;
let string = "";
let word = document.getElementById("word");
let tryCount = document.getElementById("tries");
let next = document.getElementById("next");

//getting the html elements for a-z buttons
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

//fetching the top 100 current live streams
fetch("https://api.twitch.tv/helix/streams?first=100", {
    method: "GET",
    headers: {
        "Client-ID": clientId,
        "Authorization": "Bearer " + oAuth
    }
})
.then(response => {
    return response.json();
})
.then(data => {
    let count = 0;
    let tries = 0;

    for(let i = 0; i < data.data.length; i++) {
        if(regex.test(data.data[i].user_name) === true && data.data[i].user_name.length < 10) {
            string = data.data[i].user_name;
        }
    }

    for (let i = 0; i < string.length; i++) {
        if (string[i]) {
            let html = `<div class="col"><h1 class="text-white border-bottom border-black d-inline-block ` + string[i].toUpperCase() + `">` + string[i].toUpperCase() + `</h1></div>`
            word.insertAdjacentHTML("beforeend", html);
        }
    }
    
    // Event listener for letter A
    a.addEventListener("click", func => {
        let A = document.getElementsByClassName("A");
        for(let j = 0; j < A.length; j++) {
            A[j].classList.remove("text-white");
            A[j].classList.add("text-black");
            count += 1;
        }
        a.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter B
    b.addEventListener("click", func => {
        let B = document.getElementsByClassName("B");
        for(let j = 0; j < B.length; j++) {
            B[j].classList.remove("text-white");
            B[j].classList.add("text-black");
            count += 1;
        }
        b.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter C
    c.addEventListener("click", func => {
        let C = document.getElementsByClassName("C");
        for(let j = 0; j < C.length; j++) {
            C[j].classList.remove("text-white");
            C[j].classList.add("text-black");
            count += 1;
        }
        c.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter D
    d.addEventListener("click", func => {
        let D = document.getElementsByClassName("D");
        for (let j = 0; j < D.length; j++) {
            D[j].classList.remove("text-white");
            D[j].classList.add("text-black");
            count += 1;
        }
        d.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter E
    e.addEventListener("click", func => {
        let E = document.getElementsByClassName("E");
        for (let j = 0; j < E.length; j++) {
            E[j].classList.remove("text-white");
            E[j].classList.add("text-black");
            count += 1;
        }
        e.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter F
    f.addEventListener("click", func => {
        let F = document.getElementsByClassName("F");
        for (let j = 0; j < F.length; j++) {
            F[j].classList.remove("text-white");
            F[j].classList.add("text-black");
            count += 1;
        }
        f.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter G
    g.addEventListener("click", func => {
        let G = document.getElementsByClassName("G");
        for (let j = 0; j < G.length; j++) {
            G[j].classList.remove("text-white");
            G[j].classList.add("text-black");
            count += 1;
        }
        g.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    h.addEventListener("click", func => {
        let H = document.getElementsByClassName("H");
        for (let j = 0; j < H.length; j++) {
            H[j].classList.remove("text-white");
            H[j].classList.add("text-black");
            count += 1;
        }
        h.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter I
    i.addEventListener("click", func => {
        let I = document.getElementsByClassName("I");
        for (let j = 0; j < I.length; j++) {
            I[j].classList.remove("text-white");
            I[j].classList.add("text-black");
            count += 1;
        }
        i.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter J
    j.addEventListener("click", func => {
        let J = document.getElementsByClassName("J");
        for (let j = 0; j < J.length; j++) {
            J[j].classList.remove("text-white");
            J[j].classList.add("text-black");
            count += 1;
        }
        j.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter K
    k.addEventListener("click", func => {
        let K = document.getElementsByClassName("K");
        for (let j = 0; j < K.length; j++) {
            K[j].classList.remove("text-white");
            K[j].classList.add("text-black");
            count += 1;
        }
        k.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    l.addEventListener("click", func => {
        let L = document.getElementsByClassName("L");
        for (let j = 0; j < L.length; j++) {
            L[j].classList.remove("text-white");
            L[j].classList.add("text-black");
            count += 1;
        }
        l.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter M
    m.addEventListener("click", func => {
        let M = document.getElementsByClassName("M");
        for (let j = 0; j < M.length; j++) {
            M[j].classList.remove("text-white");
            M[j].classList.add("text-black");
            count += 1;
        }
        m.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter N
    n.addEventListener("click", func => {
        let N = document.getElementsByClassName("N");
        for (let j = 0; j < N.length; j++) {
            N[j].classList.remove("text-white");
            N[j].classList.add("text-black");
            count += 1;
        }
        n.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter O
    o.addEventListener("click", func => {
        let O = document.getElementsByClassName("O");
        for (let j = 0; j < O.length; j++) {
            O[j].classList.remove("text-white");
            O[j].classList.add("text-black");
            count += 1;
        }
        o.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter P
    p.addEventListener("click", func => {
        let P = document.getElementsByClassName("P");
        for (let j = 0; j < P.length; j++) {
            P[j].classList.remove("text-white");
            P[j].classList.add("text-black");
            count += 1;
        }
        p.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter Q
    q.addEventListener("click", func => {
        let Q = document.getElementsByClassName("Q");
        for (let j = 0; j < Q.length; j++) {
            Q[j].classList.remove("text-white");
            Q[j].classList.add("text-black");
            count += 1;
        }
        q.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter R
    r.addEventListener("click", func => {
        let R = document.getElementsByClassName("R");
        for (let j = 0; j < R.length; j++) {
            R[j].classList.remove("text-white");
            R[j].classList.add("text-black");
            count += 1;
        }
        r.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter S
    s.addEventListener("click", func => {
        let S = document.getElementsByClassName("S");
        for (let j = 0; j < S.length; j++) {
            S[j].classList.remove("text-white");
            S[j].classList.add("text-black");
            count += 1;
        }
        s.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter T
    t.addEventListener("click", func => {
        let T = document.getElementsByClassName("T");
        for (let j = 0; j < T.length; j++) {
            T[j].classList.remove("text-white");
            T[j].classList.add("text-black");
            count += 1;
        }
        t.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter U
    u.addEventListener("click", func => {
        let U = document.getElementsByClassName("U");
        for (let j = 0; j < U.length; j++) {
            U[j].classList.remove("text-white");
            U[j].classList.add("text-black");
            count += 1;
        }
        u.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter V
    v.addEventListener("click", func => {
        let V = document.getElementsByClassName("V");
        for (let j = 0; j < V.length; j++) {
            V[j].classList.remove("text-white");
            V[j].classList.add("text-black");
            count += 1;
        }
        v.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter W
    w.addEventListener("click", func => {
        let W = document.getElementsByClassName("W");
        for (let j = 0; j < W.length; j++) {
            W[j].classList.remove("text-white");
            W[j].classList.add("text-black");
            count += 1;
        }
        w.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter X
    x.addEventListener("click", func => {
        let X = document.getElementsByClassName("X");
        for (let j = 0; j < X.length; j++) {
            X[j].classList.remove("text-white");
            X[j].classList.add("text-black");
            count += 1;
        }
        x.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter Y
    y.addEventListener("click", func => {
        let Y = document.getElementsByClassName("Y");
        for (let j = 0; j < Y.length; j++) {
            Y[j].classList.remove("text-white");
            Y[j].classList.add("text-black");
            count += 1;
        }
        y.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
    
    // Event listener for letter Z
    z.addEventListener("click", func => {
        let Z = document.getElementsByClassName("Z");
        for (let j = 0; j < Z.length; j++) {
            Z[j].classList.remove("text-white");
            Z[j].classList.add("text-black");
            count += 1;
        }
        z.disabled = true;
        tries += 1;
        
        check(count, string, tries);
    });
})


//check if the word is solved and change the try counter
function check(count, string, tries) {
    if (count >= string.length) {
        tryCount.innerHTML = `<h2>Tries:</h2>
                          <h2 class="text-center">` + tries + `</h2>`

    //disables all buttons after the word is fully guessed
    a.disabled = true;
    b.disabled = true;
    c.disabled = true;
    d.disabled = true;   
    e.disabled = true;
    f.disabled = true;
    g.disabled = true;
    h.disabled = true;
    i.disabled = true;
    j.disabled = true;
    k.disabled = true;
    l.disabled = true;
    m.disabled = true;
    n.disabled = true;
    o.disabled = true;
    p.disabled = true;
    q.disabled = true;
    r.disabled = true;
    s.disabled = true;
    t.disabled = true;
    u.disabled = true;
    v.disabled = true;
    w.disabled = true;
    x.disabled = true;
    y.disabled = true;
    z.disabled = true;
    next.classList.remove("disabled");
    next.innerText = "Solved!";
    next.addEventListener("click", func => {
        location.reload();
    }) 
    }
    else {
        tryCount.innerHTML = `<h2>Tries:</h2>
                          <h2 class="text-center">` + tries + `</h2>`
    }
}

