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
      text.replace("<p>", "")
      text.replace("</p>", "")
      text.trim()

      // numbers[0] will store current location,
      // numbers[1] will store where we want to get to
      let numbers = Number(text.split("/",2))
    }
    // hide tip and show text in sidebar
    tipElement.style.opacity = '0'
    widgetTextElement.value = text
  } else {

    // show tip and clear text in sidebar
    tipElement.style.opacity = '1'
    widgetTextElement.value = ''
  }
}