miro.onReady(() => {
  // subscribe on user selected widgets
  miro.addListener(miro.enums.event.SELECTION_UPDATED, getWidget)
  getWidget()

  updateButton = document.getElementById('update') 
  updateButton.addEventListener('click', updateText)
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

  // 1. Intaking the value from the text field and
  //    transforming it into an array of numbers
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


  // 2. the Math and application; where it calculates the new
  //    Width, height, X and Y and applies it according to the
  //    Field in which we are trying to edit
  if(numbers.length < 3) {
    miro.showNotification('Make sure you have a max length field')
  } else {
    //Calculations of the new width and the new height
    var pctg = numbers[0] / numbers[1]
    if(pctg > 100)
      pctg = 100;

    var newWidth = pctg * numbers[2]
    var newHeight = pctg * numbers[2]

    //Due to miro board having a limit on the smallest size of a shape,
    // we need to limit the smallest size to 8 width (smallest available width)
    if(newWidth < 8) {
      newWidth = 8;
    } if (newHeight < 8) {
      newHeight = 9;
    }


    //Calculations of the new x and y, since there is no anchor point
    var newX = (widget.x + ( (newWidth - widget.width) / 2) )
    var newY = (widget.y + ( (newHeight - widget.height) / 2) ) 

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