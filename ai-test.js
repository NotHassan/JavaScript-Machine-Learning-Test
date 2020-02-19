/**
 * This JavaScript is a proof of concept of AI that can see the 
 * importance with certain variables and find the best value to 
 * use for those variables.
 * 
 * The AI runs datasets against an algorithm that checks to see 
 * if the first field is a 4, the third field is a 2, and the 
 * fourth field is a 0.
 * 
 * An example use case scenario of this would be the following: 
 * the 1st and 2nd field could be the x and y coordinates of a 
 * player on a 2D platformer. The 3rd and 4th could be the 
 * coordinates of an enemy. You could calculate the importance 
 * of an enemy based on their distance to your character. The AI 
 * could be trained to jump over the enemy based on how big of a 
 * threat they are (their importance) due to their distance.
 */

// The Algorithm simulates an action being done correctly or incorrectly by returning 1 or 0
function algorithm(dataset) {
    // The algorithm requires the 1st field to be 4, the 3rd to be 2, and the 5th to be 0
    if(dataset[0] == 4 && dataset[2] == 2 && dataset[4] == 0) {
        return 1;
    } else {
        return 0;
    }
}

// Function to train AI with 10000 datasets to find successful codes
function train() {
    datasets = [];
    successful = [];
    failed = [];
    
    // Train AI with 100000 sets of randomized data
    for(dset = 0; dset < 100000; dset++) {
        // Create random data set with the following syntax template: [0, 0, 0, 0, 0, 0]
        // Each field is a random number from 0 to 9
        datasets.push([(Math.floor(Math.random() * 10)), (Math.floor(Math.random() * 10)), (Math.floor(Math.random() * 10)), (Math.floor(Math.random() * 10)), (Math.floor(Math.random() * 10)), (Math.floor(Math.random() * 10))]);

        // Run dataset against algorithm to see if successful (1) or failed (0)
        if(algorithm(datasets[dset]) == 1) {
            successful.push(datasets[dset]);
        } else if(algorithm(datasets[dset]) == 0) {
            failed.push(datasets[dset]);
        }
    }
}

// Function to learn about similarities and importance of certain code fields within datasets
function learn() {
    importance = [];
    weightings = [];
    code = [];

    // Loop through all successful codes
    for(i = 0; i < successful.length; i++) {
        weights = [];

        // Loop through fields in successful codes
        for(val = 0; val < successful[0].length; val++) {
            num = 0;

            // From this point to the end of the outerloop is used to calculate the similarities within the successful codes
            for(x = 0; x < successful.length; x++) {
                if(successful[i][val] == successful[x][val]) {
                    num += 1;
                }
            }

            num /= successful.length;
            weights.push(num);
        }
        weightings.push(weights);
    }

    // Loop through the fields for the successful codes to get average of the importance for each field
    for(val = 0; val < weightings[0].length; val++) {
        num = 0;

        for(i = 0; i < weightings.length; i++) {
            num += weightings[i][val];
        }

        // Get final importance values for each field
        num /= weightings.length;
        importance.push(parseFloat((num == 1) ? num : num.toFixed(3)));
    }

    for(i = 0; i < importance.length; i++) {
        if(importance[i] == 1) {
            for(x = 0; x < weightings.length; x++) {
                if(weightings[x][i] == 1) {
                    code.push(successful[x][i]);
                    break;
                }
            }
        } else {
            code.push("X");
        }
    }
}

train();
learn();

// Show cracked algorithm syntax
console.log("Code: " + code.join(', '));

// Show importance of each field
console.log("Estimated Importance: " + importance.join(', '));