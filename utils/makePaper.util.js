import shuffleArray from "./shuffle.util.js";

function makePaper(arr,  marks)
{
    let ans= []; 

    arr= shuffleArray(arr);

    for(var i = 0; i < arr.length ; i++)
    {
         
        
        if ((marks - arr[i].marks) >= 0)
        {
            marks = marks - arr[i].marks;
            ans.push(arr[i]);
        }
    }
    return ans;
}


export default makePaper;