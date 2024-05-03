// vars
let gameSpace = document.getElementById("gameSpace");
const rows = 5;
const columns = 5;
const horizontalSpacing = 3;
const delay = 500;
const defaultFill = 0;
const wall = '#';
// vars for search alg
let r = 0;
let c = 0;

// init array
const maze = [];
for (i=0; i<rows; i++) {
    maze.push(Array(columns).fill(defaultFill));
}

// define start and finish
maze[0][0] = "<span class=start>S</span>";
maze[columns-1][rows-1] = "<span class=finish>F</span>";

// build walls
maze[0][1] = wall;
maze[1][1] = wall;
maze[2][1] = wall;
maze[3][3] = wall;
// run search
horizontalSearch();

// horizontal search
function horizontalSearch() {
    displayMaze();
    nodeContent = maze[r][c];
    // TODO if statement might break
    if(nodeContent == defaultFill) {
        // mark as searched
        maze[r][c] = "<span class=searched>" + nodeContent + "</span>";
        // if finish
        if (maze[r][c].includes("F")) {
            maze[r][c] = "Found";
            console.log("found");
            displayMaze();
            return 1;
        }
    }
    if(nodeContent == wall) {
        r++
        c = 0;
        setTimeout(horizontalSearch);
        return 1;
    }

    c++;
    if(c > columns) {
        c = 0;
        r++;
        if (r>rows) {
            return 1;
        }
    }
    setTimeout(horizontalSearch, delay);
}
// display maze
function displayMaze() {
    mazeText = "<p>";
    for (i=0; i<columns; i++) {
        for (j=0; j<rows; j++) {
            // create start and finish
            // if(maze[i][j] == "S") {
            //     mazeText+= "<span id=start>" + maze[i][j] + "</span>";
            // }
            // else {
            //     mazeText+=maze[i][j];
            // }
            mazeText+=maze[i][j];

            // horizontal spacing
            if (horizontalSpacing > 0) {
                for(h=0; h<horizontalSpacing; h++) {
                    mazeText+="&nbsp;";
                }
            }
        }
        mazeText+="<br>";
    }
    mazeText+="</p>"
    gameSpace.innerHTML = mazeText;
}

//mazeNode = document.createTextNode(mazeText)
console.log(maze);