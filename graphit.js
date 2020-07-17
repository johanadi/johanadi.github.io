miro.onReady(() => {
  // subscribe on user selected widgets
  miro.addListener(miro.enums.event.SELECTION_UPDATED, getWidget)
  getWidget()

  updateButton = document.getElementById('update')
  
  updateButton.addEventListener('click', updateText)
  //updateText()

  //updateWidget()
})

// Get html elements for tip and text container
const tipElement = document.getElementById('tip')
const widgetTextElement = document.getElementById('widget-text')

async function getWidget() {
  // Get selected widgets
  let widgets = await miro.board.selection.get()

  // Get first widget from selected widgets
  let text = widgets[0].text

  // Check that widget has text field
  if (typeof text === 'string') {
    if(text.includes('<p>')) {
      text = text.replace("<p>", "")
      text = text.replace("</p>", "")
      text = text.trim()
    }

    // numbers[0] will store current location,
    // numbers[1] will store where we want to get to
    // numbers[2] will store the max width or height
    var numbers = text.split("/",3)

    var i;
    for(i = 0; i < numbers.length; i++) {
      numbers[i] = Number(numbers[i]);
    }

    // hide tip and show text in sidebar
    //tipElement.style.opacity = '0'
    widgetTextElement.value = text
  } else {

    // show tip and clear text in sidebar
    //tipElement.style.opacity = '1'
    widgetTextElement.value = ''
  }
}

async function updateText() {
  // Clicking update means 
  //  1. The text isnide of the widgetTextElement updates
  //      the text in the shape
  //  2. number[0] will be calculated with number[1]
  //      and make percentage of new height/width based
  //      off of number[2] -> We mut assure we consider
  //      x and y-axis, and which is checked.

  // 1.
  let widgets = await miro.board.selection.get()
  let newText = widgetTextElement.value
  let widget = widgets[0]

  if (typeof newText === 'string') {
    if(newText.includes('<p>')) {
      newText = newText.replace("<p>", "")
      newText = newText.replace("</p>", "")
      newText = newText.trim()
    }

    // numbers[0] will store current location,
    // numbers[1] will store where we want to get to
    // numbers[2] will store the max width or height
    var numbers = newText.split("/",3)

    var i;
    for(i = 0; i < numbers.length; i++) {
      numbers[i] = Number(numbers[i]);
    }

    // hide tip and show text in sidebar
    //tipElement.style.opacity = '0'
  }



  let object = widgets[0]
  // 2. the Math
  if(numbers.length < 3) {
    miro.showNotification('Make sure you have a max length field')
  } else {
    var pctg = numbers[0] / numbers[1]
    var newWidth = pctg * numbers [2]

    //update the information in widget
    console.log(newWidth)
  
    let axisS = document.getElementsByName('axis')

    //await miro.board.widgets.deleteById(widget.id)

    for(axis in axisS) {
      if(axis.checked) {
        if(axis.value === "x") {
          /*await miro.board.widgets.update(widget => ({
            text: newText,
            width: newWidth,
          }))*/

          await miro.board.widgets.update({
            id: widget.id,
            text: newText,
            width: newWidth,
          })
          console.log('Updated x-axis widget')
        } else {
          /*await miro.board.widgets.update(widget => ({
            text: newText,
            height: newHeight,
          }))*/
          await miro.board.widgets.create({
            type: 'shape',
            text: newText,
            x: widget.x,
            y: widget.y,
            width: widget.bounds.width,
            height: newHeight,
          })
          console.log('Created y-axis widget')
        }
      }    
    }
    miro.showNotification('Converted the Shape')
  }
}