const textarea = document.getElementById('text-area')
const tagsEl = document.getElementById('tags')

//1.
textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)  // event.target - to get element that triggered a specific event

    // 2. when enter is pressed -- using 'key' property
    if (e.key === 'Enter') {
        //setting a delay
        setTimeout(() => {
            e.target.value = '' //clearing input value
        }, 10)

        randomSelect()
    }
})

function createTags(input) {
    // console.log(input)
    const tags = input.split(',') //seperates each value as seperate string in the array if provided with a ","
                      .filter(tag => tag.trim() !== '') //creates a copy of the array by filtering elements that pass the test/condition
                      .map(tag => tag.trim()) //creates a new array using calling fn - called for every element

    tagsEl.innerHTML = ''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag  //making tags of whatever text/choices we seperate by commas
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    const times = 30 //no of times winner highlight is given

    //3. random tag with delay of 100ms
    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        //4. starting highligh and highlight after 100ms
        if (randomTag !== undefined) {
            highlightTag(randomTag)

            setTimeout(() => {
                unHighlightTag(randomTag)
            }, 100)
        }
    }, 100);

    //stoping highlight and unhighlight
    setTimeout(() => {
        clearInterval(interval)

        // stop @ 'winner'(highlight) tag
        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)

    }, times * 100)

}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag') //all tags will be put into 'node list' (similar to an array)
    return tags[Math.floor(Math.random() * tags.length)]
}

//4. add and remove winner tag
function highlightTag(tag) {
    tag.classList.add('winner')
}

function unHighlightTag(tag) {
    tag.classList.remove('winner')
}
