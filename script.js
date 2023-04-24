var characters = []
var emblems = []
var selected_characters = {}
var selected_emblems = {}

function preload() {
    loadJSON("./data.json", loadData)
}

let loadData = data => {
    characters = data.characters
    emblems = data.emblems
}

function setup() {
    console.log(characters)
    console.log(emblems)
    makeSelect(characters, addCharacter, "character-select")
    makeRandomButton(selected_characters, "character-random")
    makeSelect(emblems, addEmblem, "emblem-select")
    makeRandomButton(selected_emblems, "emblem-random")

}

function makeSelect(options, callback, parentID) {
    // find parent
    // let parent = select(parentID)
    // use list to fill select with options
    let sel = createSelect()
    sel.parent(parentID)
    sel.class("select-options")
    for (const op in options) 
        sel.option(options[op])
    // attach callback to onsubmit
    let butt = createButton("add")
    butt.class("select-button")
    butt.parent(parentID)
    butt.mousePressed(() => callback(sel.value()))
}

function addCharacter(name) {
    // let parent = select("character-list")
    // make selected element with name
    makeSelected(name, "character-list", selected_characters)
    // el.parent("character-list")
    // give it appropriate parent
    // selected_characters += el
    // add it to list
}

function addEmblem(name) {
    // let parent = select("character-list")
    // make selected element with name
    makeSelected(name, "emblem-list", selected_emblems)
    // el.parent("emblem-list")
    // give it appropriate parent
    // selected_characters += el
    // add it to list
}

function makeSelected(name, parentID, list) {
    if (name in list) return
    // div with flex row
    let selected = createDiv()
    selected.class("row-box item")
    // let parent = select(parentID)
    selected.parent(parentID)
    // text element
    let text = createP(name)
    text.parent(selected)
    text.class("selected-text")
    // button next to it to remove item
    let remover = createButton("-")
    remover.parent(selected)
    remover.class("selected-remove")
    list[name] = selected
    remover.mousePressed(() => { selected.remove(); delete list[name] })
}

var results = []

function makeRandomButton(list, parentID) {
    // find parent
    // let parent = select(parentID)
    // use list to fill select with options
    let sel = createSelect()
    sel.parent(parentID)
    sel.class("select-options")
    for (let i = 1; i < 30; i++)
        sel.option(i)
    // attach callback to onsubmit
    let butt = createButton("roll")
    butt.class("select-button")
    butt.parent(parentID)
    butt.mousePressed(() => randomRoll(list, sel.value()))
}

function randomRoll(list, n) {
    results.forEach(result => result.remove())
    results = []
    let choices = []
    for (const item in list) 
        choices.push(item)
    console.log(choices)
    if (n > choices.length) n = choices.length
    for (let i = 0; i < n; i++) {
        let choice = Math.floor(Math.random() * choices.length)
        results.push(createResult(choices[choice]))
        choices.splice(choice, 1)
    }
}

function createResult(name) {
    let result = createDiv()
    result.class("row-box item")
    result.parent("generator-results")
    let p = createP(name)
    p.class("result-text")
    p.parent(result)
    return result
}

function draw() {

}
