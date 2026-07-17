const input = document.getElementById("input");
const output = document.getElementById("output");
const mode = document.getElementById("mode");
const amount = document.getElementById("amount");
const amountLabel = document.getElementById("amountLabel");

amount.oninput = () => {
    amountLabel.textContent = amount.value + "%";
};

function hexToRgb(hex){

    hex = hex.replace("#","");

    if(hex.length===3){

        hex = hex.split("").map(x=>x+x).join("");

    }

    return{

        r:parseInt(hex.substring(0,2),16),
        g:parseInt(hex.substring(2,4),16),
        b:parseInt(hex.substring(4,6),16)

    };

}

function rgbToHex(r,g,b){

    return "#" +

    [r,g,b]

    .map(v=>Math.round(v).toString(16).padStart(2,"0"))

    .join("")

    .toUpperCase();

}

function lighten(rgb,p){

    return{

        r:rgb.r+(255-rgb.r)*p,
        g:rgb.g+(255-rgb.g)*p,
        b:rgb.b+(255-rgb.b)*p

    };

}

function darken(rgb,p){

    return{

        r:rgb.r*(1-p),
        g:rgb.g*(1-p),
        b:rgb.b*(1-p)

    };

}

document.getElementById("convert").onclick = ()=>{

    const lines = input.value
        .split(/\r?\n/)
        .map(x=>x.trim())
        .filter(x=>x);

    const p = amount.value/100;

    const result = [];

    for(const line of lines){

        try{

            const rgb = hexToRgb(line);

            const newRGB = mode.value==="lighten"
                ? lighten(rgb,p)
                : darken(rgb,p);

            result.push(rgbToHex(
                newRGB.r,
                newRGB.g,
                newRGB.b
            ));

        }catch{

            result.push("INVALID");

        }

    }

    output.value = result.join("\n");

};

document.getElementById("copy").onclick = async ()=>{

    await navigator.clipboard.writeText(output.value);

};
