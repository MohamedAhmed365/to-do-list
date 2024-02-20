let b = document.getElementsByClassName("addButton")[0];
let a = document.getElementsByClassName("add")[0];
let i = document.getElementsByClassName("input")[0];
let ul = document.getElementsByClassName("ul")[0];

let list = [];

b.addEventListener("click", function () {
    if (document.getElementsByClassName("input")[0].value !== "") {
        let li = document.createElement("li");
        li.setAttribute("editing", "false");
        let doName = document.createElement("div");
        doName.classList.add("doName");
        doName.innerHTML = i.value;
        li.appendChild(doName);

        let star = document.createElement("button");
        star.classList.add("unstar");
        star.addEventListener("click", function () {
            // console.log(this.classList[0]);
            if (this.classList.contains("unstar")) {
                this.classList.remove("unstar");
                this.classList.add("star");
            } else {
                this.classList.remove("star");
                this.classList.add("unstar");
            }
            // this.style.backgroundImage.url = "../img/star.png";
            // console.log(this.classList[0]);
            // console.log("star");
            rewrite();
        });
        li.appendChild(star);

        let done = document.createElement("input");
        done.setAttribute("type", "checkbox");
        done.classList.add("done");
        done.addEventListener("change", function () {
            rewrite();
        });
        li.appendChild(done);

        let rem = document.createElement("button");
        rem.classList.add("rem");
        rem.addEventListener("click", function () {
            hideParent(this);
            rewrite();
        });
        li.appendChild(rem);

        let edit = document.createElement("button");
        edit.classList.add("edit");
        edit.addEventListener("click", function () {
            b.style.display = "none";
            i.focus();
            i.style.marginLeft = "7%";
            this.parentElement.setAttribute("editing", "true");
            editing()
            let olde = this;
            let old = this.parentElement.childNodes[0].innerHTML
            i.value = old;

            let ok = document.createElement("button");
            ok.classList.add("ok");
            ok.addEventListener("click", function () {
                if (i.value !== "") {
                    olde.parentElement.childNodes[0].innerHTML = i.value;
                    olde.parentElement.setAttribute("editing", "false");
                    editing2()
                    i.style.marginLeft = "10%";
                    i.value = "";
                    b.style.display = "inline-block";
                    ok.style.display = "none";
                    can.style.display = "none";
                } else {
                    i.setAttribute("placeholder", "empty input");
                }
            });

            let can = document.createElement("button");
            can.classList.add("can");
            can.addEventListener("click", function () {
                olde.parentElement.setAttribute("editing", "false");
                editing2()
                i.style.marginLeft = "10%";
                i.value = "";
                b.style.display = "inline-block";
                ok.style.display = "none";
                can.style.display = "none";
            });
            a.appendChild(ok);
            a.appendChild(can);
        });
        li.appendChild(edit);
        
        let wait = document.createElement("button");
        wait.classList.add("wait");
        wait.style.display = "none";
        li.appendChild(wait);

        // li.innerHTML = `
        // <div class="doName">
        //             ${i.value}
        //         </div>
        //         <button class="star"></button>
        //         <input type="checkbox" name="done" id="done" class="done">
        //         <button class="rem" action="hideParent(${this})"></button>
        // `;
        list.push(li);
        ul.appendChild(li);
        document.getElementsByClassName("input")[0].value = "";
        rewrite();
        i.focus();
    } else {
        i.setAttribute("placeholder", "empty input");
    }
});

function hideParent(element) {
    // Access the parent element of the button and hide it
    element.parentElement.style.display = 'none';
}

i.addEventListener("focus", function () {
    i.setAttribute("placeholder", "")
});


function rewrite() {
    let newList2 = newList();
    // console.log(newList2);
    ul.innerHTML = '';
    newList2.forEach(element => {
        ul.appendChild(element);
    });
}

function newList() {
    let newList = [];
    let clist = ul.childNodes;
    // console.log(ul.childNodes);
    clist.forEach(element => {
        if (element.style.display !== 'none') {
            // console.log("1")
            if (element.childNodes[1].classList.contains("star")) {
                // console.log("2.1")
                if (!element.childNodes[2].checked) {
                    // console.log("2.2")
                    newList.push(element);
                }
            }
        }
    });
    clist.forEach(element => {
        if (element.style.display !== 'none') {
            // console.log("3")
            if (element.childNodes[1].classList.contains("unstar")) {
                // console.log("4")
                if (!element.childNodes[2].checked) {
                    // console.log("5")
                    newList.push(element);
                }
            }
        }
    });
    clist.forEach(element => {
        if (element.style.display !== 'none') {
            // console.log("6")
            if (element.childNodes[1].classList.contains("unstar")) {
                // console.log("7")
                if (element.childNodes[2].checked) {
                    // console.log("8")
                    newList.push(element);
                }
            }
        }
    });
    return newList;
}

function editing() {
    let clist = ul.childNodes;
    clist.forEach(element => {
        if (element.getAttribute('editing') === "true") {
            console.log("1")
            element.childNodes[4].style.display = "none";
            element.childNodes[5].style.display = "inline-block";
        } else {
            console.log(element.childNodes);
            element.childNodes[4].style.display = "none";
        }
    });
}

function editing2() {
    let clist = ul.childNodes;
    clist.forEach(element => {
        element.childNodes[4].style.display = "inline-block";
        element.childNodes[5].style.display = "none";
    });
}