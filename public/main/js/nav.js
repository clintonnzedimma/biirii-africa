/*
* This is the logic for the navigation bar
*
*/


//This code toggle the side bar for mobile view
(function(){
    //close side bar
    document.querySelector('.cancel').addEventListener("click",()=>{
        document.querySelector('.side-bar').classList.remove("open");
        let extendTabs = document.querySelectorAll(".extend-data");
        extendTabs.forEach(extendTab => {
            extendTab.classList.remove("open");
        });
    });

    // open side bar
    document.querySelector('.menu-bar').addEventListener("click",()=>{
        document.querySelector('.side-bar').classList.add("open");
    });

    // Open gender data tab
    let navExtensions = document.querySelectorAll('.nav-extend');
    navExtensions.forEach(navExtension => {
        navExtension.addEventListener("click",(e)=>{
            let extension = navExtension.getAttribute('data-extend');
            let extendTab = document.querySelector(".extend-data[data-extendTab="+extension+"]");
            if(extendTab){
                extendTab.classList.add("open");
            } else {
                return false;
            }
        });
    });
    // Close extend tab
    let backBtns = document.querySelectorAll('.back');
    backBtns.forEach(backBtn => {
        backBtn.addEventListener("click", (e)=>{
            let extendTabs = document.querySelectorAll(".extend-data");
            extendTabs.forEach(extendTab => {
                extendTab.classList.remove("open");
            });
        })
    })
})()