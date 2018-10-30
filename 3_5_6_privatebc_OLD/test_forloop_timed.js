(function theLoop (i) { 
    console.log('hi', i);
    setTimeout(function () {
        console.log('Inside'+i);
        if(--i) theLoop(i);
        
    },1000);
 })(10);