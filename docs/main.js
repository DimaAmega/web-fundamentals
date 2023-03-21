const airtable = $('#airtable')
const loader = $('#loader')

airtable.css('opacity', '0').on('load', () => {
  loader.fadeOut('slow')
  airtable.animate({ opacity: 1 }, 800)
})
