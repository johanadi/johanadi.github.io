miro.onReady(() => {
  // subscribe on user selected widgets
  miro.addListener(miro.enums.event.SELECTION_UPDATED, getWidget)
  getWidget()
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
    widgets[0].text = text
    // numbers[0] will store current location,
    // numbers[1] will store where we want to get to
    // numbers[2] will store the max width or height
    var numbers = Number(text.split("/",3))

    // we want to access to see if we are considering the x or the y axis
    // if x axis, then take the x of the widget and assign it to the "max"

    // if y axis, then take the y axis of the widget and assignt it to the "max"

    // the max should remain unchanged, numbers[0] and [1] will make a percentage to determine
    //    the current x/y of the bar

    // hide tip and show text in sidebar
    tipElement.style.opacity = '0'
    widgetTextElement.value = text
  } else {

    // show tip and clear text in sidebar
    tipElement.style.opacity = '1'
    widgetTextElement.value = ''
  }
}