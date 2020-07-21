miro.onReady(() => {
  // subscribe on user selected widgets
  miro.addListener(miro.enums.event.SELECTION_UPDATED, getWidget)
  getWidget()

  updateButton = document.getElementById('update') 
  updateButton.addEventListener('click', updateText)
  
  // Storing temporary data from what used to exist in the txt box
  textBox = document.getElementById('widget-text')
  textBox.Attributes.Add('onClick', )
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

    // show text in sidebar
    widgetTextElement.value = text
  } else {

    // clear text in sidebar
    widgetTextElement.value = ''
  }
}

async function updateText() {

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
    
    let i;
    for(i = 0; i < numbers.length; i++) {
      numbers[i] = Number(numbers[i]);
    }

  }


  // 2. the Math
  if(numbers.length < 3) {
    miro.showNotification('Make sure you have a max length field')
  } else {
    //Calculations of the new width and the new height
    var pctg = numbers[0] / numbers[1]
    var newWidth = pctg * numbers[2]
    var newHeight = pctg * numbers[2]

    //Calculations of the new x and y, since there is no anchor point
    var newX = (widget.x * pctg) / pctg2
    var newY = (widget.y * pctg) / pctg2

    //tracking the numbers in the console
    console.log('new width' + newWidth)
    console.log('new height' + newHeight)
  
    //importing the radio buttons
    let axisS = document.getElementsByName('axis')

    //await miro.board.widgets.deleteById(widget.id)
    let i;
    for(i = 0; i < axisS.length; i++) {
      if(axisS[i].checked) {
        if(axisS[i].value === "x") {
          await miro.board.widgets.update({
            id: widget.id,
            text: newText,
            width: newWidth,
            x: newX,
          })
          console.log('Updated x-axis widget')
        } else {
          await miro.board.widgets.update({
            id: widget.id,
            text: newText,
            height: newHeight,
            y: newY,
          })
          console.log('Created y-axis widget')
        }
      }    
    }
    miro.showNotification('Converted the Shape')
  }
}

function tempData() {
  var oldText = widgetTextElement.value

  if (typeof oldText === 'string') {
    if(oldText.includes('<p>')) {
      oldText = oldText.replace("<p>", "")
      oldText = oldText.replace("</p>", "")
      oldText = oldText.trim()
    }

    // numbers[0] will store current location,
    // numbers[1] will store where we want to get to
    // numbers[2] will store the max width or height

    var numbers = oldText.split("/",3)
    
    let i;
    for(i = 0; i < numbers.length; i++) {
      numbers[i] = Number(numbers[i]);
    }

    var pctg2 = numbers[0] / numbers[1]
    var oldWidth = pctg * numbers[2]
    var oldHeight = pctg * numbers[2]

  }


}