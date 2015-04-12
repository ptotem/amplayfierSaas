var i;

/* =============================================================================================== */
/* Initialization Routine */
/* =============================================================================================== */

/* Initialize the Page */
function initPage() {

  /* Set the Title of the Platform */
  $('title').text(storyConfig.name + " Editor");

  /* Set the Story Nameplate */
  $('#story-nameplate').attr('src', storyConfig.imgsrc + "/" + storyConfig.nameplate.image);

  /* Set the Story Presenter */
  $('#story-presenter').attr('src', storyConfig.imgsrc + "/" + storyConfig.presenter.image);

  /* Set the Wrapper Design */
  setDesign();

  /* Show the screen */
  setTimeout(function() {
    // createLandscapeView();
    // drawNodes();
    $('#story-wrapper').fadeIn('slow');

  }, 100);


}

/* =============================================================================================== */
/* Node Display Routines */
/* =============================================================================================== */

/* Show the Node as per the State */
function showNode(nodeId) {
  var $thisNode = $('#story-node-' + nodeId);
  $thisNode.html('<img src="' + storyConfig.imgsrc + '/blank-node.png" data-drag="true" jqyoui-draggable ng-model="sss" class="editor-blanks"/><div class="nodenum">' + (parseInt(nodeId) + 1) + '</div>').show();
  //$thisNode.draggable();
}

/* Draw all the nodes with their current States and set the Active Node */
function drawNodes() {
  var activeMarked = false;
  for (i in platformData.nodes) {
    showNode(i);
  }
}

/* =============================================================================================== */
/* Page Display Routines */
/* =============================================================================================== */

/* Set the Layout as per the Orientation of Device */
function setDesign() {

  /* Set the Story Nameplate */
  $('#story-nameplate').css({
    left: storyConfig.nameplate.px + "%",
    top: storyConfig.nameplate.py + "%",
    width: storyConfig.nameplate.width + "%"
  }).draggable();

  /* Set the Story Presenter */
  $('#story-presenter').css({
    left: storyConfig.presenter.px + "%",
    top: storyConfig.presenter.py + "%",
    width: storyConfig.presenter.width + "%"
  }).draggable();

  $('#story-wrapper').css({
    'background-image': 'url(' + storyConfig.imgsrc + "/" + storyConfig.background + ')',
    height: $('#story-wrapper').width() * 9 / 16
  });

}

/* Add the Nodes in the Landscape View */
function createLandscapeView() {
  for (i in platformData.nodes) {
    var thisNodeData = platformData.nodes[i];
    var thisNodeConfig = getNodeConfig(thisNodeData.sequence);

    // $('#story-nodes').append('');

  }

  $('.story-node').on('click', function(e) {
    e.stopImmediatePropagation();
    openEditor(parseInt(getSequence($(this))) + 1);

  });

  $('.node-rep-block').on('click', function(e) {
    e.stopImmediatePropagation();
    openEditor($(this).html());

  });


}

function openEditor(nodeId) {
  $('.edit-intro').hide();
  $('.node-rep-block').removeClass('active-rep-block');
  $('.node-rep-block').eq(parseInt(nodeId) - 1).addClass('active-rep-block');
  $('.editdecklist').sortable();
  $('.edit-chapter').fadeOut(function() {
    $('#edit-chapter-' + nodeId).fadeIn(function() {
      $(this).find('.edit-closer').unbind('click').on('click', function() {
        $('.node-rep-block').removeClass('active-rep-block');
        $('.edit-chapter').hide();
        $('.edit-intro').fadeIn();
      })
    });
  })
}

function closeEditor() {
  $('#story-wrapper').animate({
    marginLeft: 0
  }, function() {
    $('#editor-panel').fadeOut();
    $('.story-node').css('pointer-events', 'auto');
  })
}

$(document).on('click', '#close-preview', function() {
  $('.image-preview').popover('hide');
  // Hover befor close the preview
  $('.image-preview').hover(
    function() {
      $('.image-preview').popover('show');
    },
    function() {
      $('.image-preview').popover('hide');
    }
  );
});

$(function() {
  // Create the close button
  var closebtn = $('<button/>', {
    type: "button",
    text: 'x',
    id: 'close-preview',
    style: 'font-size: initial;',
  });
  closebtn.attr("class", "close pull-right");

  // Clear event
  $('.image-preview-clear').click(function() {
    $('.image-preview').attr("data-content", "").popover('hide');
    $('.image-preview-filename').val("");
    $('.image-preview-clear').hide();
    $('.image-preview-input input:file').val("");
    $(".image-preview-input-title").text("Browse");
  });
  // Create the preview image
  $(".image-preview-input input:file").change(function() {
    var file = this.files[0];
    var reader = new FileReader();
    // Set preview image into the popover data-content
    reader.onload = function(e) {
      $(".image-preview-input-title").text("Change");
      $(".image-preview-clear").show();
      $(".image-preview-filename").val(file.name);
      img.attr('src', e.target.result);
      $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
    }
    reader.readAsDataURL(file);
  });
});


/* =============================================================================================== */
/* Modal Routines */
/* =============================================================================================== */

$(function() {
  //    $('#viewModal').on('show.bs.modal', function (event) {
  //        var button = $(event.relatedTarget) // Button that triggered the modal
  //        var itemid = button.data('itemid') // Extract info from data-* attributes
  //        var modal = $(this)
  //        modal.find('.modal-title').text('Presentation ' + itemid);
  //
  //    })

  $('.game-player').unbind('click').on('click', function() {
    var gameName = $(this).data('game');
    $('#' + gameName.toLowerCase() + '-window').append('<iframe width="98%" height="100%" src="../games/' + gameName + '/index.html"></iframe>');
    $(this).hide();
    $(this).next().fadeIn();
  });
  $('.game-closer').unbind('click').on('click', function() {
    $('.modal-game-window').empty();
    $(this).hide();
    $(this).prev().fadeIn();
  })
  $('.game-modal-control').on('click', function() {
    $('.modal-game-window').empty();
    $('.game-closer').hide();
    $('.game-player').fadeIn();
  })

})



/* =============================================================================================== */
/* Parser and Helper Routines */
/* =============================================================================================== */

/* Get Sequence Number of node where event happens */
function getSequence(obj) {
  return parseInt($(obj).attr("id").split("-")[2]);
}

/* Get Configuration for a given Node  */
function getNodeConfig(sequence) {
  return jQuery.grep(storyConfig.nodes, function(a) {
    return (a.sequence == sequence);
  })[0];
}

/* Get Author Customizations (description and decks) for a given Node  */
function getNodeData(sequence) {
  return jQuery.grep(platformData.nodes, function(a) {
    return (a.sequence == sequence);
  })[0];
}