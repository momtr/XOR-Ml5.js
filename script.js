let nn;
let drawing = [];
const EPOCHS = 1000;

function preload() {

    console.log("init model");

    // define a config options object
    const CONFIG = {
        inputs: 2,
        outputs: 1
    }

    nn = ml5.neuralNetwork(CONFIG);
}

function setup() {
    createCanvas(600,600);


    // add data to the neural network
    for(let i = 0; i < EPOCHS; i++) {
        nn.data.addData([1,1], [0]);
        nn.data.addData([1,0], [1]);
        nn.data.addData([0,1], [1]);
        nn.data.addData([0,0], [0]);
    }

    // normalize data
    nn.data.normalize();

    // train the network
    nn.train(whileTraining, finishedTraining);

}

function draw() {
    background(40);

    if(drawing != []) {
        for(let i = 0; i < drawing.length; i++) {
            let col = drawing[i][0];
            let y = drawing[i][1];
            let x = drawing[i][2];
            fill(col);
            rect(x,y,10,10);
        }
    }
}

function whileTraining(epoch, loss) {
    console.log("Epoch: " + epoch + "/31" + " | Loss: " + loss.val_loss);
}

function finishedTraining() {
    console.log("finished training!");

    // draw XOR pattern

    // after training - predict!

    for(let i = 0; i < width; i+=10) {
        for(let j = 0; j < height; j+=10) {
            nn.predict([i/height, j/width], (err,data) => {
                if(err === undefined) {
                    color = data[0].value;
                    drawing.push([map(color,0,1,0,255), i, j]);
                } else {
                    console.log("error occured!", err);
                } 
            });
        }
    }
}