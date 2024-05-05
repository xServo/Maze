// vars
let gameSpace = document.getElementById("gameSpace");
const size = 5;
const rows = size;
const columns = size;
const horizontalSpacing = 3;
const delay = 500;
const defaultFill = 0;
const wall = '#';
let searchTimeout = setTimeout(null, 0);
let maze = [];
let explored = [];
let stack = []; 
// vars for search alg
let r = 0;
let c = 0;
initMaze();
// build walls
maze[3][1] = wall;
maze[3][2] = wall;
maze[4][2] = wall;

// run
displayMaze();


// init array
function initMaze() {
    // clear any searches in prog
    clearTimeout(searchTimeout); 
    // init maze
    maze = [];
    for (i=0; i<rows; i++) {
        maze.push(Array(columns).fill(defaultFill));
    }
    // init explored maze
    stack = [];
    explored = [];
    for (i=0; i<rows; i++) {
        explored.push(Array(columns).fill(defaultFill));
    }

    // define start and finish
    maze[0][0] = "<span class=start>S</span>";
    maze[columns-1][rows-1] = "<span class=finish>F</span>";

    displayMaze();
    r = 0;
    c = 0;
    maze[r][c];
}
// depth-first-search 
function dfs() {
    displayMaze();

    // visit and explore
    // get rc
    // r, c = stack[stack.length-1][]
    // mark as searched
    maze[r][c] = "<span class=searched>" + maze[r][c] + "</span>";
    stack.pop();
    console.log("location: " + r, c);
    explored[r][c] = 1;
    // check if down exists and has not been explored
    if (r+1 < size && 
        r+1 >= 0 &&
        explored[r+1][c] == 0 &&
        maze[r+1][c] == defaultFill) 
    {
        // push the node onto the stack
        stack.push(r+1,c);
    }
    // check if up exists and has not been explored
    if (r-1 < size && 
        r-1 >= 0 &&
        explored[r-1][c] == 0 &&
        maze[r-1][c] == defaultFill) 
    {
        // push the node onto the stack
        stack.push(r-1,c);
    }
    // check if left exists and has not been explored
    if (c-1 < size && 
        c-1 >= 0 &&
        explored[r][c-1] == 0 &&
        maze[r][c-1] == defaultFill) 
    {
        // push the node onto the stack
        stack.push(r-1,c);
    }
    // check if left exists and has not been explored
    if (c+1 < size && 
        c+1 >= 0 &&
        explored[r][c+1] == 0 &&
        maze[r][c+1] == defaultFill) 
    {
        // push the node onto the stack
        stack.push(r-1,c);
    } else {
        console.log("stuck");
        stack.pop();
    }
    console.log(stack);
    displayMaze();
    searchTimeout = setTimeout(dfs, delay);

}
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
    searchTimeout = setTimeout(horizontalSearch, delay);
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