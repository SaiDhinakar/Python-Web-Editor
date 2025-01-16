// async function show_result() {
//     const editor = document.getElementById("editor");
//     const output = document.getElementById("output");
//     const code = editor.value;
    
//     // Disable the run button while executing
//     const runButton = document.getElementById("btn");
//     runButton.disabled = true;
    
//     try {
//         const response = await fetch('/api/execute', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ code: code })
//         });
//         const data = await response.json();
        
//         if (data.success) {
//             output.value = data.output;
//             output.style.color = 'black'
//         } else {
//             let val = data.error;
//             try{
//                 val = val.split('\n');
//                 if (length(val)>1){
//                 val = val[0]+val[4];
//                 }
//             }
//             catch{
//                 val = val;
//             }
//             output.value = `Error: ${val}`;
//             output.style.color = 'red';
//         }
//     } catch (error) {
//         output.value = `Network Error: ${error.message}`;
//     } finally {
//         runButton.disabled = false;
//     }
// }

// // Add keyboard shortcut (Ctrl/Cmd + Enter) to run code
// document.getElementById("editor").addEventListener("keydown", function(e) {
//     if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
//         e.preventDefault();
//         show_result();
//     }
// });


async function show_result() {
    const editor = document.getElementById("editor");
    const output = document.getElementById("output");
    const runButton = document.getElementById("btn");
    const loading = document.getElementById("loading");
    const code = editor.value;
    
    // Disable button and show loading
    runButton.disabled = true;
    loading.style.display = "inline-block";
    output.value = "Running code...";
    
    try {
        const response = await fetch('/api/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code })
        });
        
        const data = await response.json();
        
        // Add animation class to output
        output.style.opacity = '0';
        
        setTimeout(() => {
            if (data.success) {
                output.value = data.output;
            } 
            else {
                let val = data.error;
                try{
                    val = val.split('\n');
                    if(val.len > 1)
                        val = val[0]+'\n'+val[4]+'\n'+val[5];
                    // console.log(val);
                }
                catch{
                    val = val;
                }
                output.value = `${val}`;
            }
            output.style.opacity = '1';
        }, 200);
        
    } catch (error) {
        output.value = `Network Error: ${error.message}`;
    } finally {
        // Re-enable button and hide loading
        runButton.disabled = false;
        loading.style.display = "none";
    }
}

// Add keyboard shortcut (Shift + Enter) to run code
document.getElementById("editor").addEventListener("keydown", function(e) {
    if ((e.shiftKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        show_result();
    }
});

// Add animation when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.container, .result');
    containers.forEach((container, index) => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
});