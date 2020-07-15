miro.onReady(() => {
  // subscribe on user selected widgets
  miro.addListener(miro.enums.event.SELECTION_UPDATED, getSize)
  getSize()
})

const axis = document.getElementById('axis')
const widgetSizeElement = document.getElementById('widget-size')

async function getSize() {

	// based on the x - axis, therefore inspect the x var
	let widgets = await miro.board.selection.get()
	var text = "peanut"

	if(axis.value == "x-axis") {
		text = widgets[0].bounds.width
	} else {
		text = widgets[0].bounds.height
	}

	widgetSizeElement.value = text


}