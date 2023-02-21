const airtable = $('#airtable')
const loader = $('#loader')

airtable.fadeOut('fast').on('load', function () {
  loader.fadeOut('slow')
  airtable.fadeIn('slow')
})
