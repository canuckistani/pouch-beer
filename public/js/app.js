var db = new PouchDB('beers');

function fetchBeerData(callback) {
  db.allDocs({include_docs: true}, function(err, resp) {
    if (err) throw err;
    callback(resp);
  });
}

function showBeers(docs) {
  var tpl = _.template('<tr><td><%= brewer %> ( <%= location %> )</td><td><%= beer %></td></tr>'),
    out = '';
  _.each(docs.rows, function(row) {
    out += tpl(row.doc);
  });
  $('#beer-table tbody').html(out);
  $('#brewer').focus();
}

$(function() {
  $('#beer-form').submit(function(ev) {
    ev.preventDefault();
    var brewer = $('#brewer').val();
    $('#brewer').val('');
    var beer = $('#beer').val();
    $('#beer').val('');
    var record = {
      brewer: brewer,
      beer: beer,
      location: 'Somewhere'
    };

    // console.log(record);
    db.post(record, function(err, response) {
      if (err) throw err;
      console.log(response);
      fetchBeerData(showBeers);
    });
  });


  // db.changes({
  //   onChange: function(change) {
  //     console.log(change);
  //   }
  // });

  fetchBeerData(showBeers);
});