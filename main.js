let b = document.getElementsByClassName("addButton")[0];
let i = document.getElementsByClassName("input")[0];
let ul = document.getElementsByClassName("ul")[0];

let list = [];

b.addEventListener("click", function () {
    if (document.getElementsByClassName("input")[0].value !== "") {
        let li = document.createElement("li");
        
        let doName = document.createElement("div");
        doName.classList.add("doName");
        doName.innerHTML = i.value;
        li.appendChild(doName);

        let star = document.createElement("button");
        star.classList.add("unstar");
        star.addEventListener("click", function () {
            console.log(this.classList[0]);
            if (this.classList.contains("unstar")) {
                this.classList.remove("unstar");
                this.classList.add("star");
            } else {
                this.classList.remove("star");
                this.classList.add("unstar");
            }
            // this.style.backgroundImage.url = "../img/star.png";
            console.log(this.classList[0]);
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
        
        let rem = document.createElement("rem");
        rem.classList.add("rem");
        rem.addEventListener("click", function () {
            hideParent(this);
            rewrite();
        });
        li.appendChild(rem);
        
        
        
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
    console.log(newList2);
    ul.innerHTML = '';
    newList2.forEach(element => {
        ul.appendChild(element);
    });
}

function newList()  {
    let newList = [];
    let clist = ul.childNodes;
    console.log(ul.childNodes);
    clist.forEach(element => {
        if (element.style.display !== 'none') {
            console.log("1")
            if (element.childNodes[1].classList.contains("star")) {
                console.log("2.1")
                if (! element.childNodes[2].checked) {
                    console.log("2.2")
                    newList.push(element);
                }
            }
        }
    });
    clist.forEach(element => {
        if (element.style.display !== 'none') {
            console.log("3")
            if (element.childNodes[1].classList.contains("unstar")) {
                console.log("4")
                if (! element.childNodes[2].checked) {
                    console.log("5")
                    newList.push(element);
                }
            }
        }
    });
    clist.forEach(element => {
        if (element.style.display !== 'none') {
            console.log("6")
            if (element.childNodes[1].classList.contains("unstar")) {
                console.log("7")
                if ( element.childNodes[2].checked) {
                    console.log("8")
                    newList.push(element);
                }
            }
        }
    });
    return newList;
}