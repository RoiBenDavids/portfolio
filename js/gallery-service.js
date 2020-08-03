'use strict'

var gProjects = [{
    id: 'pacman',
    name: 'pacman',
    title: 'The old & classic pacman',
    desc: 'The game was created before most of the world was born but it\'s still kicking',
    url: 'proj/pacman/index.html',
    publishedAt: 1593957600,
    labels: ['Matrixes', 'keyboard events'],
},
{
    id: 'minesweeper',
    name: 'minesweeper',
    title: 'Minesweeper 2020',
    desc: 'The great game with all knew functions as help and extra lives',
    url: 'proj/minesweeper/index.html',
    publishedAt: 1595666700,
    labels: ['Matrixes', 'keyboard events', 'recursion'],
},

]

// function getProjToRender(projId) {
//     var projToRender = gProjects.find(function (proj) {
//         return proj.id === projId
//     })
//     return projToRender
// }

function getProjsNAT(){
    var projNAT = gProjects.map(function(proj){
        var title = proj.title
        var name = proj.name
        return{
            name: name,
            title: title
        }
    })
    return projNAT;
}

function getProjByIdx(projIdx){
    return gProjects[projIdx];
}


