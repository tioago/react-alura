$(".phrase-actions-additional-button").on("click",function(){var a=$(this).parent().parent().find(".phrase-additional-text");Aria.expandingButton($(this)),a.hasClass("phrase-additional-text--active")?a.slideUp():a.slideDown(),a.toggleClass("phrase-additional-text--active")});