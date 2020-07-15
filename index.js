miro.onReady(() => {
  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Sticker to shapes',
        svgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
        positionPriority: 1,
        onClick: async () => {

          // Launch the side view
          let questionMark = confirm('Enter the thing!')

          if(questionMark) {
            let objects = await miro.board.widgets.get()

            // Delete all board objects
            await miro.board.widgets.deleteById(objects.map(object => object.id))
          
          
          
          }

          // Show success message
          miro.showNotification('Clicked!')
        }
      }
    }
  })
})