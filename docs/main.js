const airtable = $('#airtable')
const loader = $('#loader')

airtable.css('display', 'none').on('load', function () {
  loader.fadeOut('slow')
  airtable.fadeIn('slow')
})
